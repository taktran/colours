/*
  Potentiometer input

  Based on code from: http://arduino.cc/en/Tutorial/AnalogInput
 */

int sensorPin = A0;
int sensorPin2 = A1;

int prevSensorValue = 0;
int sensorValue = 0;
int prevSensor2Value = 0;
int sensorValue2 = 0;

int ledPin = 13;

#include <stdarg.h>
void p(char *fmt, ... ){
  char tmp[128]; // resulting string limited to 128 chars
  va_list args;
  va_start (args, fmt );
  vsnprintf(tmp, 128, fmt, args);
  va_end (args);
  Serial.print(tmp);
}

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // read the value from the sensor:
  sensorValue = analogRead(sensorPin);
  sensorValue2 = analogRead(sensorPin2);

  bool sensorHasChanged = (prevSensorValue != sensorValue);
  bool sensor2HasChanged = (prevSensor2Value != sensorValue2);
  if (sensorHasChanged || sensor2HasChanged) {
    p("{'sensor1': %i, 'sensor2': %i}\n", sensorValue, sensorValue2);
  }

  if (sensorHasChanged) {
    prevSensorValue = sensorValue;
  }

  if (sensor2HasChanged) {
    prevSensor2Value = sensorValue2;
  }

  // Flash light for effect
  digitalWrite(ledPin, HIGH);
  delay(50);
  digitalWrite(ledPin, LOW);
  delay(50);

}
