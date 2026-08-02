# iot-elements

Web Components for PComp, various electronic parts.

```js
import 'iot-elements';
```

## Local development

To prepare for local development, clone this repo, and then install
the dependencies:

```
npm install
```

Then start storybook:

```
npm run storybook
```

This will open a local dev server at http://localhost:6006, where you
can interact with the elements and see your changes live.

## Creating a new element

The easiest way to create a new element is to run the generator:

```
npm run new-element --name demo
```

This will generate a new element called `demo`. It will also
create a storybook file, so you will be able to see the new element
in storybook (see the "Local development" section above).

Note: updates the docstrings in the code will not be reflected
in Storybook's Docs tab unless you restart Storybook, or run the
following command manually and refresh the page:

```
npm run analyze-components
```

## Originally-drawn parts

The parts below have no open-source reference to fork or port -
each is an original element (own SVG art, real datasheet-accurate
`pinInfo`), not vendored from anywhere - same reasoning `iot-capacitor`
already set precedent for. All are visual/wireable only (no simulated
behavior); the four board-shaped ones (Nucleo x2, Blue Pill, Franzininho
WiFi) have no CPU adapter behind them either, unlike e.g. `iot-arduino-uno`.

Two shared helpers live under `src/utils/` and back most of these:
`dip-chip.ts` (generic 2.54mm-pitch DIP IC package) and `pcb-board.ts`
(generic PCB body + header-pin drawing); `nucleo32-layout.ts` holds the
header pinout the two Nucleo-32 boards share.

- `iot-74hc165` - 8-bit parallel-in/serial-out shift register (DIP-16)
- `iot-74hc595` - 8-bit serial-in/parallel-out shift register (DIP-16)
- `iot-nlsf595` - pin-compatible low-voltage clone of the 74HC595
- `iot-attiny85` - bare ATtiny85 chip (DIP-8, not the Franzininho board)
- `iot-a4988` - bipolar stepper motor driver breakout
- `iot-clock-generator` - configurable square-wave signal source
- `iot-ds18b20` - 1-Wire digital temperature sensor (TO-92)
- `iot-bmp180` - barometric pressure/temperature I2C breakout
- `iot-franzininho-wifi` - ESP8285-based Franzininho sibling board
- `iot-grove-oled-sh1107` - Grove-connector SH1107 OLED breakout
- `iot-led-matrix` - plain (non-MAX7219, non-addressable) 8x8 LED matrix
- `iot-led-strip` - simple common-anode RGB LED strip segment
- `iot-logic-analyzer` - 8-channel debug probe
- `iot-max7219-matrix` - MAX7219-driven 8x8 LED matrix breakout
- `iot-mfrc522` - 13.56MHz RFID reader/writer breakout (SPI)
- `iot-nokia-5110-screen` - PCD8544-driven 84x48 monochrome LCD
- `iot-nucleo-c031c6` - ST Nucleo-32 board (STM32C031C6)
- `iot-nucleo-l031k6` - ST Nucleo-32 board (STM32L031K6)
- `iot-relay-module` - mounted single-channel relay driver PCB
- `iot-stm32-bluepill` - STM32F103C8T6 "Blue Pill" dev board
- `iot-text` - plain canvas text/label annotation, not a real part
- `iot-tm1637-7segment` - TM1637-driven 4-digit 7-segment display
- `iot-tv` - composite-video display output
- `iot-wifi-ap` - diagram-only pseudo-part for a WiFi access point

## License

Released under the [MIT license](LICENSE).
