import { ErrorService } from './errorService';
import { UtilService } from "@/services/utilService";
// Crud
import { ICrudExecOption, CrudService } from './crudService';
import { ScheduleService } from './scheduleService';

// SECTION

const errorService = new ErrorService();
const utilService = new UtilService();
const scheduleService = new ScheduleService();
// Crud


// SECTION

export {
  CrudService,
  ICrudExecOption,
  utilService,
  errorService,
  scheduleService,
};
