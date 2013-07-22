// Sample johnny five program to access the potentiometer
//
// Setup:
// 1) Set up arduino - upload Examples > Firmata > StandardFirmata
// 2) Set up potentiometers
// 3) Update port to relevant port name
// 4) Run this program

var five = require("johnny-five"),
  board = new five.Board({ port: "/dev/tty.usbserial-A800ep51" }),
  pot = {
    "val": 0,
    "prev": 0
  },
  pot2 = {
    "val": 0,
    "prev": 0
  },
  potHasChanged = function ( p ) {
    return ( p.val !== p.prev );
  },
  printPot = function () {
    console.log("{ sensor1: " + pot.val + ", sensor2: " + pot2.val + " }")
  };

board.on("ready", function() {

  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: "A0",
    freq: 250
  });

  potentiometer2 = new five.Sensor({
    pin: "A1",
    freq: 250
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: potentiometer
  });

  board.repl.inject({
    pot: potentiometer2
  });

  potentiometer.on("read", function( err, value ) {
    pot.val = value;

    if ( potHasChanged(pot) ) {
      printPot();
      pot.prev = pot.val;
    }
  });

  potentiometer2.on("read", function( err, value ) {
    pot2.val = value;

    if ( potHasChanged(pot2) ) {
      printPot();
      pot2.prev = pot2.val;
    }
  });
});