import logger from "./lib/logger/logger.js";

const log = logger.getLogger('./handler.js')

function add(a,b) {
    log.info("First operrand " + a)
    log.info("Second operrand"  + b);
    return a + b;
}

export {add}
