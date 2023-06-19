import { ErrorService } from './errorService';
import { UtilService } from "@/services/utilService";
import { ICrudExecOption, CrudService } from './crudService';
import { ScheduleService } from './scheduleService';
import { TeamService } from './crud/team.service'
import { DriverService } from './crud/driver.service';
import { ResultService } from './crud/result.service';
import { RacesService } from './crud/race.service';

const errorService = new ErrorService();
const utilService = new UtilService();
const scheduleService = new ScheduleService();
const teamService = new TeamService()
const driverService = new DriverService()
const resultService = new ResultService()
const racesService = new RacesService()

export {
  CrudService,
  ICrudExecOption,
  utilService,
  errorService,
  scheduleService,
  teamService,
  driverService,
  racesService,
  resultService
};
