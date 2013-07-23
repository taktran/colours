// Sample johnny five program to access the potentiometer
//
// Setup:
// 1) Set up arduino - upload Examples > Firmata > StandardFirmata
// 2) Set up potentiometers
// 3) Update port to relevant port name
// 4) Run this program

"use strict";

var five = require("johnny-five"),
  board = new five.Board({ port: "/dev/tty.usbserial-A800ep51" }),
  pot, pot2,
  printPots = function () {
    console.log("{ sensor1: " + pot + ", sensor2: " + pot2 + " }");
  };

var Potentiometer = function(sensorPin) {
  var self = this;

  self.val = 0;
  self.prev = 0;

  self.sensor = new five.Sensor({
    pin: sensorPin,
    freq: 250
  });

  self.sensor.on("read", function( err, value ) {
    self.val = value;

    if ( self.hasChanged() ) {
      printPots();
      self.prev = self.val;
    }
  });
};

// Inject the `sensor` hardware into
// the Repl instance's context.
// Allows direct command line access
Potentiometer.prototype.injectIntoRepl = function(board) {
  board.repl.inject({
    pot: this.sensor
  });
};

Potentiometer.prototype.hasChanged = function() {
  return this.val !== this.prev;
};

Potentiometer.prototype.toString = function() {
  return this.val;
};

board.on("ready", function() {
  pot = new Potentiometer("A0");
  pot2 = new Potentiometer("A1");

  pot.injectIntoRepl(board);
  pot2.injectIntoRepl(board);
});