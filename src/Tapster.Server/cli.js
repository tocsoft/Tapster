var pumps = require('./configs/pumps');

var readline = require('readline');


rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('TAPSTER> ');
rl.prompt();

var prevPump;
rl.on('line', function (line) {
    
    var command = line.trim();
    command
    
    parts = command.split(" ");
    var p = pumps;
    
    if (parts.length == 1) {
        command = parts[0];
    } else {
        command = parts[1];
        p = pumps._pumps["pump" + parts[0]];
        if (parts[0] == 'all') {
            p = pumps;
        }
    }
    
    switch (line.trim()) {
        case 'quit':
        case 'exit':
            pumps.dispose();
            process.exit(0);
            break;
        default:
            if (p) {
                switch (command) {
                    case 'stop':
                        p.stop();
                        break;
                    case 'reverse':
                        p.reverse();
                        break;
                    case 'forward':
                        p.forward();
                        break;
                    
                    default:
                        console.log('unknown command');
                        break;
                }
                
            } else {
                console.log('unknown command');
            }
            break;
    }
    rl.prompt();
}).on('close', function () {
    console.log('Have a great day!');
    pumps.dispose();
    process.exit(0);
});

