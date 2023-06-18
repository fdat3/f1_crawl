import { BlockMiddleware } from "./blockMiddleware";
import { QueryMiddleware } from "./queryMiddleware";


const blockMiddleware = new BlockMiddleware();
const queryMiddleware = new QueryMiddleware();

export {
    blockMiddleware,
    queryMiddleware,
};
