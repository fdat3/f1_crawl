import { racesService } from '@/services'
import { CrudController } from '@/controllers'
import { IRaceCrawl, ITeamCrawl } from '@/interfaces'
import axios from 'axios';
import { IDriverCrawl } from '@/interfaces/driver.interface';
const cheerio = require('cheerio');


export class RaceController extends CrudController<typeof racesService> {
    constructor() {
        super(racesService)
    }

    // crawl result
    async crawlResult(year: Number) {
        console.log("getting data: ", year)
        const url = `https://www.formula1.com/en/results/jcr:content/resultsarchive.html/${year}/races.html`
        const html = await axios.get(url)
        const $ = cheerio.load(html.data, { xmlMode: true });
        const racesInYear: Array<IRaceCrawl> = $("tr").map((i: number, element: any) => ({
            grand_prix: $(element).find('td:nth-of-type(2)').text().trim(),
            date: $(element).find('td:nth-of-type(3)').text().trim()
        })).get()
        racesInYear.shift()
        return racesInYear
    }
    async getRangeOfYears() {
        const url = 'https://www.formula1.com/en/results/jcr:content/resultsarchive.html/2023/races.html'
        const html = await axios.get(url)
        const $ = cheerio.load(html.data, { xmlMode: true });
        const rangeYears: Array<Number> = [];
        $('[data-name="year"]').each((i: number, el: any) => {
            const year: Number = parseInt($(el).text().trim())
            rangeYears.push(year)
        });
        return rangeYears
    }
    // Craw driver
    async crawlDrivers(name: string) {
        const id: string = name.toLowerCase().replace(/ /g, "-")
        const url = `https://www.formula1.com/en/drivers/${id}.html`
        let html = null
        let driver: IDriverCrawl = null
        let path: string = null
        let pathDriver: string = null
        try {
            html = await axios.get(url)
            const $ = cheerio.load(html.data, { xmlMode: true });
            const dataCrawl: any = {}
            const numberOfimageInPage: number = $(".fom-adaptiveimage").length
            if (numberOfimageInPage > 0) {
                // get value from html structure on page
                $(".driver-details").each((i: number, element: any) => {
                    //get key like name, place-of-birth...
                    //trans data to json 
                    const value = $(element).find('.driver-name').text().trim()
                    dataCrawl['name'] = value
                })
                $(".driver-details").each((i: number, element: any) => {
                    //get key like name, place-of-birth...
                    //trans data to json 
                    const value = $(element).find('.driver-number').text().trim()
                    dataCrawl['driver_number'] = value
                })
                $(".biography").each((i: number, element: any) => {
                    //get key like name, place-of-birth...
                    //trans data to json 
                    const value = $(element).find('div').text().trim()
                    dataCrawl['bio'] = value
                })
                $(".profile").each((i: number, element: any) => {
                    //get key like name, place-of-birth...
                    //trans data to json 
                    const value = $(element).find('img').attr('src')
                    dataCrawl['avatar'] = value
                })
                $("tr").each((i: number, element: any) => {
                    const key = $(element).find('th:nth-of-type(1)').text().trim().toLowerCase().replace(/ /g, "_")
                    //get key like name, place-of-birth...
                    //trans data to json 
                    const value = $(element).find('td:nth-of-type(1)').text().trim()
                    //get value like name, place-of-birth...
                    dataCrawl[key] = value
                    /*
                        -output:
                        key: value
                    E.X:
                        name: lewis hamilton
                        world_champions: x
                    	
                        world champions is raw data on html, but when use text().trim().toLowerCase().replace(/ /g, "_")
                        ==> world_champions
                    */
                })
                driver = dataCrawl
                for (let index = 0; index < $(".selected-article").length; index++) {
                    const element = $(".selected-article")[index++];
                    const aliasHref = $(element).find('a').attr('href')
                    if (aliasHref.includes("en/teams")) {
                        path = aliasHref//path info team
                        break
                    }
                }
                for (let index = 0; index < $(".selected-article").length; index++) {
                    const element = $(".selected-article")[index + 1];
                    const aliasHrefDriver = $(element).find('a').attr('href')
                    if (aliasHrefDriver.includes("en/drivers")) {
                        pathDriver = aliasHrefDriver//path info team
                        break
                    }
                }
            }
        } catch (error) {
            path = null
            pathDriver = null
            return null
        }
        if (path || pathDriver) {
            const dataCrawlTeam: ITeamCrawl = await this.crawlPath(path)
            const dataCrawlTeamMate: any = await this.crawlPath(pathDriver)
            driver.team_data = dataCrawlTeam
            driver.team_mate_data = dataCrawlTeamMate
        }
        return driver
    }
    // Crawl team
    async crawlTeam(name: string) {
        const url = `https://www.formula1.com/en/teams/${name}.html`
        const html = await axios.get(url)
        const $ = cheerio.load(html.data, { xmlMode: true });
        let dataCrawl: any = {}
        let player_1: string = null
        let player_2: string = null
        const numberOfBrandLogo: number = $(".brand-logo").length
        if (numberOfBrandLogo > 0) {
            $("tr").each((i: number, element: any) => {
                const key = $(element).find('th:nth-of-type(1)').text().trim().toLowerCase().replace(/ /g, "_")
                const value = $(element).find('td:nth-of-type(1)').text().trim()
                dataCrawl[key] = value
            })
            $(".information").each((i: number, element: any) => {
                const value = $(element).find('div').text().trim()
                dataCrawl['bio'] = value
            })
            $(".brand-logo").each((i: number, element: any) => {
                const value = $(element).find('img').attr('src')
                dataCrawl['logo'] = value
            })
        }
        const team: ITeamCrawl = dataCrawl
        for (let index = 0; index < $(".selected-article").length; index++) {
            const element = $(".selected-article")[index++];
            const aliasHref = $(element).find('a').attr('href')
            if (aliasHref.includes("en/drivers")) {
                player_1 = aliasHref//path info team
                break
            }
        }
        for (let index = 0; index < $(".selected-article").length; index++) {
            const element = $(".selected-article")[index + 1];
            const aliasHrefDriver = $(element).find('a').attr('href')
            if (aliasHrefDriver.includes("en/drivers")) {
                player_2 = aliasHrefDriver//path info team
                break
            }
        }
        if (player_1 || player_2) {
            const dataCrawlPlayer_1: any = await this.crawlPath(player_1)
            const dataCrawlPlayer_2: any = await this.crawlPath(player_2)
            team.data_player_1 = dataCrawlPlayer_1
            team.data_player_2 = dataCrawlPlayer_2
        }
        return team
    }

    /*
        Crawl path, path is value behind / on the url, 
        you need that to crawl any data relate
    */
    async crawlPath(path: string) {
        const url = `https://www.formula1.com/${path}`
        const html = await axios.get(url)
        const $ = cheerio.load(html.data, { xmlMode: true });
        let dataCrawl: any = {}
        const numberOfBrandLogo: number = $(".brand-logo").length
        if (numberOfBrandLogo > 0) {
            $("tr").each((i: number, element: any) => {
                const key = $(element).find('th:nth-of-type(1)').text().trim().toLowerCase().replace(/ /g, "_")
                const value = $(element).find('td:nth-of-type(1)').text().trim()
                dataCrawl[key] = value
            })
        }
        const team: ITeamCrawl = dataCrawl
        return team
    }

}
