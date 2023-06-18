import { ITeamCraw } from "./team.interface";

export interface IDriverCraw {
    team_id: string,
    driver_number: number,
    name: string,
    bio: Text,
    country: string,
    podiums: number,
    points: Float32Array,
    grands_prix_entered: number,
    world_championships: number,
    highest_race_finish: number,
    highest_grid_position: number,
    date_of_birth: Date,
    place_of_birth: string,
    images: string
    team_data?: ITeamCraw
}
export interface IDriver {
    id?: string,
    team_id: string,
    driver_number: number,
    name: string,
    bio: Text,
    country: string,
    podiums: number,
    points: Float32Array,
    grands_prix_entered: number,
    world_championships: number,
    highest_race_finish: number,
    highest_grid_position: number,
    date_of_birth: Date,
    place_of_birth: string,
    images: string
}