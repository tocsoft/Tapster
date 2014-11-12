var Motor = require('./motor');

var Pumps = function () {
    
    this._specialNames = [];
    for (var n in this) {
        if (this.hasOwnProperty(n)) {
            this._specialNames.push(n);
        }
    }
};


Pumps.prototype = {
    _isSetup : true,
    _pumps : {},
    _pumpsArry: [],
    setup : function (opts) {
        opts = opts || {};
        
        if (this.isSetup) {
            this.dispose();
        }
        for (var n in opts) {
            if (opts.hasOwnProperty(n)) {
                var pump = new Motor(opts[n]);
                
                if (this._specialNames.indexOf(n) < 0) {
                    this[n] = pump;
                }
                this._pumps[n] = pump;
                this._pumpsArry.push(pump);
                pump.__pumpname__ = n;
            }
        }
    },
    dispose : function () {
        this._pumpsArry.forEach(function (pump) {
            
            pump.dispose();
            delete this._pumps[pump.__pumpname__];
            if (this._specialNames.indexOf(n) < 0) {
                delete this[pump.__pumpname__];
            }
        });
        this.isSetup = false;
    },
    _runAll : function (action, callback) {
        var that = this;
        var count = 0;
        var complete = function () {
            count++;
            if (count == that._pumpsArry.length) {
                if (callback) {
                    callback.call(that);
                }
            }
        }
        
        this._pumpsArry.forEach(function (pump) {
            pump[action](complete);
        });
    },
    stop : function (callback) {
        this._runAll('stop', callback);
    },
    forward : function (callback) {
        this._runAll('forward', callback);
    },
    reverse : function (callback) {
        this._runAll('reverse', callback);
    }
}

var pumps = module.exports = new Pumps();
