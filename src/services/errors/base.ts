import { IBaseErrorOption } from "@/interfaces";


export class BaseError extends Error {
    constructor(options: IBaseErrorOption) {
        super()
        if (!options.message) {
            options.message = options.type
        }
        this.options = options

    }

    public options: IBaseErrorOption

    toJSON() {
        return this.options
    }
}
