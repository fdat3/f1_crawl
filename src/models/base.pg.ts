import { config } from '@/config'
import { Sequelize } from 'sequelize'
import { operatorsAliases } from "@/common/constant";

let option = undefined
if (process.env.NODE_ENV === "production") {
    option = {
        host: config.database.sql['host'],
        dialect: config.database.sql['dialect'],
        // default setting
        pool: {
            max: 10,
            min: 0,
            idle: 200000,
            acquire: 1000000,
        },
        logging: false,
        timezone: "+07:00",
        dialectOptions: {
            "ssl": {
                "require": false,
                "rejectUnauthorized": false,
            }
        }
    }
} else {
    option = {
        host: config.database.sql['host'],
        dialect: config.database.sql['dialect'],
        // default setting
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        },
        logging: false,
        timezone: "+07:00",
        dialectOptions: {
            "ssl": {
                "require": false,
                "rejectUnauthorized": false
            }
        }
    }
}
if (config.database.sql['host'] === "localhost" || config.database.sql['host'] === "127.0.0.1") {
    delete option.dialectOptions
}
const sequelize = new Sequelize(
    config.database.sql['database'],
    config.database.sql['username'],
    config.database.sql['password'],
    {
        ...option,
        operatorsAliases

    }
)

export {
    Sequelize,
    sequelize
}
