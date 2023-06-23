
export interface ITeamCrawl {
    data_player_1: any
    data_player_2: any
    fullname_team: string,
    logo: string,
    base: string,
    team_chief: string,
    technical_chief: string,
    chassis: string,
    power_unit: string,
    first_team_entry: number,
    world_championships: number,
    highest_race_finish: number,
    pole_positions: number,
    fastest_laps: number,
    bio: Text,
    images: string,
}
export interface ITeam {
    id?: string,
    fullname_team: string,
    logo: string,
    base: string,
    team_chief: string,
    technical_chief: string,
    chassis: string,
    power_unit: string,
    first_team_entry: number,
    world_championships: number,
    highest_race_finish: number,
    pole_positions: number,
    fastest_laps: number,
    bio: Text,
    images: string,
}
