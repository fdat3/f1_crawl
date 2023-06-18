import { AppExceptionType, HttpStatus } from "@/common/enum";

export interface ICrudOption {
    where: any
    limit?: number
    offset?: number
    scope?: string[]
    order?: any[]
    attributes?: any[]
    includes?: any[]
    distinct?: boolean
    paranoid?: boolean
    transaction?: any

    [key: string]: any
}
