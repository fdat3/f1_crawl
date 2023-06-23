import { IDriverCrawl } from "./driver.interface";

export interface IRaceCrawl {
    grand_prix: string,
    date: string,
    href: string,
    drivers?: Array<IResultCrawl>,
}
export interface IRace {
    id?: string,
    grand_prix: string,
    date: Date,
    year: number,
}
export interface IResultCrawl {
    pos: number,
    no: string,
    driver_name: string,
    car: string,
    laps: number,
    time: string,
    pts: number,
    driver_info?: IDriverCrawl
}
export interface IResult {
    race_id: string,
    driver_id: string,
    pos: number,
    no: string,
    car: string,
    laps: number,
    time: string,
    pts: number,
}
export interface IYearCrawl {
    year: Number,
    races: Array<IRaceCrawl>,
}
