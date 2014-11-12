var pumps = require('../hardware/pumps');

pumps.setup(
    {
    "pump1" : { pinForward : 3, pinBackward : 2, pinEnable : 10 },
    "pump2" : { pinForward : 23, pinBackward : 18, pinEnable : 10 },
    "pump3" : { pinForward : 17, pinBackward : 27, pinEnable : 10 },
    "pump4" : { pinForward : 8, pinBackward : 22, pinEnable : 10 },
    "pump5" : { pinForward : 11, pinBackward : 9, pinEnable : 10 },
    "pump6" : { pinForward : 7, pinBackward : 25, pinEnable : 10 },
} //motor setups
);


module.exports = pumps;



function exit() {
    pumps.dispose();
    process.exit();
}

process.on('SIGINT', exit);