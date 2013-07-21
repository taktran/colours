require "arduino_firmata"

puts "start"
arduino = ArduinoFirmata.connect "/dev/tty.usbserial-A800ep51", :nonblock_io => true

puts "arduino start"
puts arduino.analog_read 0  # => 0 ~ 1023

arduino.on :analog_read do |pin, value| # analog_read event
  puts pin, value
  if pin == 0
    puts "analog pin #{pin} changed : #{value}"
  end
end