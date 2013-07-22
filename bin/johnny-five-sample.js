// Sample johnny five program
//
// Setup:
// 1) Set up arduino - upload Examples > Firmata > StandardFirmata
// 2) Put LED positive end (longer end) in pin 13, and the short end in ground
// 3) Update port to relevant port name
// 4) Run this program - the LED should be flashing

var five = require("johnny-five"),
    board = new five.Board({ port: "/dev/tty.usbserial-A800ep51" });

board.on("ready", function() {
  (new five.Led(13)).strobe();
});