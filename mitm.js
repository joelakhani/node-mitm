#!/usr/bin/env node

var net = require('net');
var fs = require('fs');

if (process.argv.length < 4) {
    console.error('Usage: mitm listen_port target_host [target_port]')
    return 1;
}

var in_port = process.argv[2];
var out_host = process.argv[3];
var out_port = (process.argv[4] === undefined) ? in_port : process.argv[4];

var hexdump = function (buffer, side) {

    var offset = 0,
        length = buffer.length,
        row = "";
        side = side || "";

    for (var x = 0; x < length; x += 16) {
        row += side + " ";
        row += String("00000000" + offset.toString(16).toUpperCase()).slice(-8) + "  ";
        var n = Math.min(16, length - offset);
        var data = "";
        for (var y = 0; y < 16; ++y) {
            if (y < n) {
                var value = buffer.readUInt8(offset);
                data += value >= 32 ? String.fromCharCode(value) : ".";
                row += String("00" + value.toString(16)).slice(-2) + " ";
                offset++;
            } else {
                row += "   ";
                data += " ";
            }
        }

        row += " " + data + "\n";
    }
    return row;
};

try {
    process.on('SIGINT', function() {
        console.log();
        _s.close();
        process.exit();
    });

    var _s = net.createServer(function(_i) {
        var _o = net.createConnection({port: out_port, host: out_host});
        _o.setNoDelay(true);
        _o.on('error', function(e) {
            console.log('< Client ERROR: ' + e.message);
            _i.end();
            _o.end();
        });
        _o.on('end', function() {
            console.log('< END');
            _i.end();
            _o.end();
        });
        _o.on('timeout', function() {
            console.log('< TIMEOUT');
            _i.end();
            _o.end();
        });

        _i.on('data', function(data) {
            try {
                _o.write(data);
                console.log(hexdump(data, ">"));
            }
            catch(e) {
                if (e.code !== 'EPIPE') {
                    console.log("Unable to write input socket: " + e.message);
                }
            }
        });

        _o.on('data', function(data) {
            try {
                _i.write(data);
                console.log(hexdump(data, "<"));
            }
            catch(e) {
                if (e.code !== 'EPIPE') {
                    console.log("Unable to write output socket: " + e.message);
                }
            }
        });

        _i.on('close', function(data) {
            console.log('> CLOSED with: ' + data);
        });

        _i.on('error', function(e) {
            console.log('> Server ERROR: ' + e.message);
            _o.end();
            _i.end();
        });
        _i.on('end', function() {
            console.log('> END');
            _o.end();
            _i.end();
        });
        _i.on('timeout', function() {
            console.log('> TIMEOUT');
            _o.end();
            _i.end();
        });
    });

    _s.on('error', function(e) {
        console.error('Unable to listen on port: ' + in_port + ' | ' + e.message);
        setTimeout(function () {
            process.exit();
        }, 8);
    });

    _s.listen(in_port);

    console.log('Started. Listening on ' + in_port + ' mitm for ' + out_host + ':'+out_port);
    console.log('---------------');
    console.log('CTRL-C to exit.');
}
catch(e) {
    console.error('Unable to start mitm: ' + e.message);
    return 1;
}
