/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { SevenSegmentElement } from './7segment-element';
import { ArduinoUnoElement } from './arduino-uno-element';
import { BuzzerElement } from './buzzer-element';
import { LCD1602Element } from './lcd1602-element';
import { LEDElement } from './led-element';
import { MembraneKeypadElement } from './membrane-keypad-element';
import { NeoPixelElement } from './neopixel-element';
import { NeopixelMatrixElement } from './neopixel-matrix-element';
import { PotentiometerElement } from './potentiometer-element';
import { PushbuttonElement } from './pushbutton-element';
import { Pushbutton6mmElement } from './pushbutton-6mm-element';
import { ResistorElement } from './resistor-element';
import { RotaryDialerElement } from './rotary-dialer-element';
import { SSD1306Element } from './ssd1306-element';
import { ServoElement } from './servo-element';
import { DHT22Element } from './dht22-element';
import { ArduinoMegaElement } from './arduino-mega-element';
import { ArduinoNanoElement } from './arduino-nano-element';
import { Ds1307Element } from './ds1307-element';
import { LEDRingElement } from './led-ring-element';
import { SlideSwitchElement } from './slide-switch-element';
import { HCSR04Element } from './hc-sr04-element';
import { LCD2004Element } from './lcd2004-element';
import { AnalogJoystickElement } from './analog-joystick-element';
import { SlidePotentiometerElement } from './slide-potentiometer-element';
import { IRReceiverElement } from './ir-receiver-element';
import { IRRemoteElement } from './ir-remote-element';
import { PIRMotionSensorElement } from './pir-motion-sensor-element';
import { NTCTemperatureSensorElement } from './ntc-temperature-sensor-element';
import { HeartBeatSensorElement } from './heart-beat-sensor-element';
import { TiltSwitchElement } from './tilt-switch-element';
import { FlameSensorElement } from './flame-sensor-element';
import { GasSensorElement } from './gas-sensor-element';
import { FranzininhoElement } from './franzininho-element';
import { NanoRP2040ConnectElement } from './nano-rp2040-connect-element';
import { SmallSoundSensorElement } from './small-sound-sensor-element';
import { BigSoundSensorElement } from './big-sound-sensor-element';
import { MPU6050Element } from './mpu6050-element';
import { ESP32DevkitV1Element } from './esp32-devkit-v1-element';
import { KY040Element } from './ky-040-element';
import { PhotoresistorSensorElement } from './photoresistor-sensor-element';
import { RGBLedElement } from './rgb-led-element';
import { ILI9341Element } from './ili9341-element';
import { LedBarGraphElement } from './led-bar-graph-element';
import { MicrosdCardElement } from './microsd-card-element';
import { DipSwitch8Element } from './dip-switch-8-element';
import { StepperMotorElement } from './stepper-motor-element';
import { HX711Element } from './hx711-element';
import { KS2EMDC5Element } from './ks2e-m-dc5-element';
import { BiaxialStepperElement } from './biaxial-stepper-element';
import type React from 'react';

type IotElement<T> = Partial<T> & React.ClassAttributes<T>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iot-7segment': IotElement<SevenSegmentElement>;
      'iot-arduino-uno': IotElement<ArduinoUnoElement>;
      'iot-lcd1602': IotElement<LCD1602Element>;
      'iot-led': IotElement<LEDElement>;
      'iot-neopixel': IotElement<NeoPixelElement>;
      'iot-pushbutton': IotElement<PushbuttonElement>;
      'iot-pushbutton-6mm': IotElement<Pushbutton6mmElement>;
      'iot-resistor': IotElement<ResistorElement>;
      'iot-membrane-keypad': IotElement<MembraneKeypadElement>;
      'iot-potentiometer': IotElement<PotentiometerElement>;
      'iot-neopixel-matrix': IotElement<NeopixelMatrixElement>;
      'iot-ssd1306': IotElement<SSD1306Element>;
      'iot-buzzer': IotElement<BuzzerElement>;
      'iot-rotary-dialer': IotElement<RotaryDialerElement>;
      'iot-servo': IotElement<ServoElement>;
      'iot-dht22': IotElement<DHT22Element>;
      'iot-arduino-mega': IotElement<ArduinoMegaElement>;
      'iot-arduino-nano': IotElement<ArduinoNanoElement>;
      'iot-ds1307': IotElement<Ds1307Element>;
      'iot-neopixel-ring': IotElement<LEDRingElement>;
      'iot-slide-switch': IotElement<SlideSwitchElement>;
      'iot-hc-sr04': IotElement<HCSR04Element>;
      'iot-lcd2004': IotElement<LCD2004Element>;
      'iot-analog-joystick': IotElement<AnalogJoystickElement>;
      'iot-slide-potentiometer': IotElement<SlidePotentiometerElement>;
      'iot-ir-receiver': IotElement<IRReceiverElement>;
      'iot-ir-remote': IotElement<IRRemoteElement>;
      'iot-pir-motion-sensor': IotElement<PIRMotionSensorElement>;
      'iot-ntc-temperature-sensor': IotElement<NTCTemperatureSensorElement>;
      'iot-heart-beat-sensor': IotElement<HeartBeatSensorElement>;
      'iot-tilt-switch': IotElement<TiltSwitchElement>;
      'iot-flame-sensor': IotElement<FlameSensorElement>;
      'iot-gas-sensor': IotElement<GasSensorElement>;
      'iot-franzininho': IotElement<FranzininhoElement>;
      'iot-nano-rp2040-connect': IotElement<NanoRP2040ConnectElement>;
      'iot-small-sound-sensor': IotElement<SmallSoundSensorElement>;
      'iot-big-sound-sensor': IotElement<BigSoundSensorElement>;
      'iot-mpu6050': IotElement<MPU6050Element>;
      'iot-esp32-devkit-v1': IotElement<ESP32DevkitV1Element>;
      'iot-ky-040': IotElement<KY040Element>;
      'iot-photoresistor-sensor': IotElement<PhotoresistorSensorElement>;
      'iot-rgb-led': IotElement<RGBLedElement>;
      'iot-ili9341': IotElement<ILI9341Element>;
      'iot-led-bar-graph': IotElement<LedBarGraphElement>;
      'iot-microsd-card': IotElement<MicrosdCardElement>;
      'iot-dip-switch-8': IotElement<DipSwitch8Element>;
      'iot-stepper-motor': IotElement<StepperMotorElement>;
      'iot-hx711': IotElement<HX711Element>;
      'iot-ks2e-m-dc5': IotElement<KS2EMDC5Element>;
      'iot-biaxial-stepper': IotElement<BiaxialStepperElement>;
    }
  }
}
