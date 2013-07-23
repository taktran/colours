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
  Potentiometer = require("../lib/Potentiometer").Potentiometer,
  pot, pot2,
  printPots = function () {
    console.log("{ sensor1: " + pot + ", sensor2: " + pot2 + " }");
  };

board.on("ready", function() {
  pot = new Potentiometer("A0");
  pot2 = new Potentiometer("A1");

  pot.on("read", printPots);
  pot2.on("read", printPots);

  pot.injectIntoRepl(board);
  pot2.injectIntoRepl(board);
});