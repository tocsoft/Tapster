
var Gpio = require('onoff').Gpio;
//opts = { pinForward : 1, pinBackward : 2};
var motor = function (opts) {
    
    this.pinForward = new Gpio(opts.pinForward, 'out');
    this.pinBackward = new Gpio(opts.pinBackward, 'out');
    this.pinEnable = new Gpio(opts.pinEnable, 'out');
    
    //set pin high to enable the motors
    this.pinEnable.write(1);
    this.stop(); //ensure its stoped by default
};

motor.prototype = {
    pinForward : null,
    pinBackward : null,
    pinEnable : null,
    dispose  : function () {
        this.stop();
        this.pinEnable.write(0);//if the enable pin is being shared acros motors then all motors with a comon pin will stop at once
        this.pinForward.unexport();
        this.pinBackward.unexport();
        try {
            this.pinEnable.unexport();
        } catch (ex) {
            //we swallow exceptions unexporting the enable pin as this is likely to be shared across motors
        }
    },
    forward : function (callback) {
        this._setPinValues(1, 0, callback);
    },
    reverse : function (callback) {
        this._setPinValues(0, 1, callback);
    },
    run: function (direction, callback) {
        direction = direction || this.direction;
        this[direction](callback);
    },
    _setPinValues : function (forwardPin, backwardPin, callback) {
        var compCount = 0;
        var errorSent = false;
        var motor = this;
        function isComplete() {
            compCount++;
            if (compCount == 2) {
                
                if (forwardPin || backwardPin) {
                    motor.status = 'running';
                    if (forwardPin) {
                        motor.direction = 'forward';
                    } else { 
                        motor.direction = 'reverse';
                    }
                } else {
                    motor.status = 'stopped';
                }

                if (callback) {
                    callback.call(motor);
                }
            }
        }
        this.pinForward.write(forwardPin, function (err, val) {
            
            if (err) {
                if (!errorSent) {
                    errorSent = true;
                    if (callback) {
                        callback.call(motor,err);
                    } else {
                        throw err;
                    }
                }
            } else {
                isComplete();
            }
        });
        
        this.pinBackward.write(backwardPin, function (err, val) {
            if (err) {
                if (!errorSent) {
                    errorSent = true;
                    if (callback) {
                        callback.call(motor,err);
                    } else {
                        throw err;
                    }
                }
            } else {
                isComplete();
            }
            
        });
    },
    stop : function (callback) {
        this._setPinValues(0, 0, callback);
    },
    status : null,
    direction : null
};

module.exports = motor;