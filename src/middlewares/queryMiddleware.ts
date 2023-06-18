import { BaseMiddleware } from "./base";
import * as express from "express";
import { config } from "@/config";
import { Request, Response } from "@/routers/base";
import * as _ from "lodash";

export class QueryMiddleware extends BaseMiddleware {
    async use(req: any, res: Response, next: express.NextFunction) {
        const where = this._parseWhere(req);
        const order = this._parseOrder(req);
        const page = parseInt(req.query["page"] || 1);
        const limit = parseInt(
            req.query["limit"] || config.database.defaultPageSize,
        );
        const offset = parseInt(req.query["offset"]) || (page - 1) * limit;
        const fields = this._parseFields(req);

        if (fields.attributes != undefined) {
            fields.attributes = _.union(["id", "updated_at"], fields.attributes);
        }

        req.queryInfo = _.merge(
            {
                where,
                limit,
                page,
                offset,
                order,
            },
            fields,
        );
        next();
    }

    /**
     * Filter param only accept <and> query. <or> will be supported later
     * Format: [[key, operator, value], [key, operator, value]]
     */
    _parseWhere(req: any): any {
        let where = req.query["where"];
        try {
            where = JSON.parse(where);
        } catch (ignore) {
            where = undefined;
        }
        return where || {};
    }

    /**
     * Format: [[key, order], [key, order]]
     */

    _parseOrder(req: any): any {
        let order = req.query["order"];
        try {
            order = JSON.parse(order);
        } catch (ignore) {
            order = undefined;
        }
        return order || [["created_at", "desc"]];
    }

    _parseFields(req: any): any {
        let fields = req.query["fields"];
        try {
            fields = JSON.parse(fields);
        } catch (ignore) {
            fields = [];
        }
        try {
            return this._parseAttribute(fields);
        } catch (err) {
            return null;
        }
    }

    _parseAttribute(attrs: any) {
        const attributes: any[] = [];
        const includes: any[] = [];
        let isGetAll = false;
        let isSetParanoid = false;
        let where: any = undefined;
        _.forEach(attrs, function(f) {
            if (typeof f === "string") {
                switch (f) {
                    case "$all":
                        isGetAll = true;
                        break;
                    case "$paranoid":
                        isSetParanoid = true;
                        break;
                    default:
                        attributes.push(f);
                }
            } else if (typeof f === "object" && !Array.isArray(f)) {
                _.forEach(
                    f,
                    ((value: any, name: string) => {
                        switch (name) {
                            case "$filter":
                                where = _.merge({}, where, value);
                                break;
                            default:
                                includes.push({
                                    [name]: value,
                                });
                        }
                    }).bind(this),
                );
            }
        });
        const include = this._parseInclude(includes);
        const result: any = {
            include: include,
            distinct: includes ? true : false,
        };
        if (where) result.where = where;
        if (!isGetAll) {
            result.attributes = attributes;
        }
        if (isSetParanoid) {
            result.paranoid = false;
        }
        return result;
    }

    _parseInclude(includes: any) {
        if (includes.length === 0) return includes;

        const associates: any[] = [];
        _.forEach(
            includes,
            ((i: any) => {
                _.forEach(
                    i,
                    ((attrs: any, name: string) => {
                        const associate = Object.assign(
                            {
                                association: name,
                            },
                            this._parseAttribute(attrs),
                        );
                        associates.push(associate);
                    }).bind(this),
                );
            }).bind(this),
        );
        return associates;
    }
}
