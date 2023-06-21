import { CrudController } from './crudController';
import { TeamController } from './crud/team.controller'
import { DriverController } from './crud/driver.controller';
import { RaceController } from './crud/race.controller';
import { ResultController } from './crud/result.controller';

const teamController = new TeamController()
const driverController = new DriverController()
const raceController = new RaceController()
const resultController = new ResultController()

export {
  CrudController,
  teamController,
  driverController,
  raceController,
  resultController
};
