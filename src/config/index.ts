
import development from './development'
import production from './production'

function getConfig(environment: string) {
    if (environment === 'development') {
        return development
    } else if (environment === 'production') {
        return production
    } else {
        return development
    }
}
export const config = getConfig(process.env.NODE_ENV)