#simplest ruby program to read from arduino serial,
#using the SerialPort gem
#(http://rubygems.org/gems/serialport)

require "serialport"

#params for serial port
port_str = "/dev/tty.usbserial-A800ep51"  #may be different for you
baud_rate = 9600
data_bits = 8
stop_bits = 1
parity = SerialPort::NONE

sp = SerialPort.new(port_str, baud_rate, data_bits, stop_bits, parity)

#just read forever
while true do
  while (i = sp.gets) do       # see note 2
    puts i unless i.empty?
  end
end

sp.close                       #see note 1