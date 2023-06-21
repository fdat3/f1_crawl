import {
    Teams,
    Drivers,
    Results,
    Races
} from '@/models/tables';

console.log('Loading Associate Model.....');

// DriversOfRace
Results.belongsTo(Races, {
    foreignKey: 'id',
    as: 'race',
})
Races.hasMany(Results, {
    foreignKey: 'race_id',
    as: 'results',
})
// RacesOfDriver
Results.belongsTo(Drivers, {
    foreignKey: 'driver_id',
    as: 'driver',
})
Drivers.hasMany(Results, {
    foreignKey: 'driver_id',
    as: 'results',
})
// Drivers
Drivers.belongsTo(Teams, {
    foreignKey: 'team_id',
    as: 'team',
})
Teams.hasMany(Drivers, {
    foreignKey: 'team_id',
    as: 'drivers',
})