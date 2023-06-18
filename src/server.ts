import * as cluster from 'cluster'
import * as os from 'os'
import { scheduleService } from './services'

const cpuCount = os.cpus().length
const webWorkers: any[] = []
const jobWorkers: any[] = []
if (cluster.isMaster) {
    // Create a worker for each CPU
    for (let i = 0; i < cpuCount; i += 1) {
        if (i === 0) {
            scheduleService.scheduleAll();
        }
        // addJobWorker();
        addWebWorker();
    }

    cluster.on('exit', (worker, code, signal) => {
        // if (jobWorkers.indexOf(worker.id) != -1) {
        //     console.log('job worker ' + worker.process.pid + ' died. Trying to respawn...');
        //     removeJobWorker(worker.id);
        //     addJobWorker();
        // }
        if (webWorkers.indexOf(worker.id) != -1) {
            console.log('http worker ' + worker.process.pid + ' died. Trying to respawn...');
            removeWebWorker(worker.id.toString());
            addWebWorker();
        }
    });

} else {
    // if (process.env.job) {
    //     console.log('start job server: ' + cluster.worker.id);
    //     require('./worker');//initialize the agenda here
    // }
    if (process.env.web) {
        console.log('start http server: ' + cluster.worker.id);
        require('./index'); // initialize the http server here
    }
}

function addWebWorker() {
    webWorkers.push(cluster.fork({ web: 1 }).id);
}

function addJobWorker() {
    jobWorkers.push(cluster.fork({ job: 1 }).id);
}

function removeWebWorker(id: string) {
    webWorkers.splice(webWorkers.indexOf(id), 1);
}

function removeJobWorker(id: string) {
    jobWorkers.splice(jobWorkers.indexOf(id), 1);
}