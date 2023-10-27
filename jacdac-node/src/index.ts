import { WebUSB } from "usb";
import { createUSBBus, createNodeUSBOptions } from "jacdac-ts";
import type { JDBus, JDDevice, JDRegister, JDEvent } from "jacdac-ts";
import { CONNECTION_STATE, DEVICE_ANNOUNCE, ERROR, REPORT_RECEIVE, EVENT } from "jacdac-ts";
import { SRV_ACCELEROMETER, AccelerometerReg, AccelerometerEvent } from "jacdac-ts";
import { SRV_DOT_MATRIX, DotMatrixReg } from "jacdac-ts";

let bus: JDBus;

try {
    // connect micro:bit via WebUSB
    bus = createUSBBus(createNodeUSBOptions(WebUSB));

    bus.on(CONNECTION_STATE, () => {
        console.log(`Bus ${bus.connected ? "connected" : "disconnected"}`);
    });

    bus.on(DEVICE_ANNOUNCE, (device: JDDevice) => {
        main(device);
    });

    bus.on(ERROR, (context, exception) => {
        console.error(`Bus error: ${context}`, exception);
    });

    bus.autoConnect = true;
    bus.connect(true);

} catch (e) {
    console.error(e);
}

// main function

const main = async (device: JDDevice) => {

    // identify the device
    device.identify();
    console.log(`Device: ${device.name}`);

    // list services
    device.services().forEach(service => {
        console.log(`Service [${service.serviceIndex}]: ${service.name} (identifier: ${service.serviceClass})`);
    });

    // wait 2 secs
    await sleep(2000);

    // access the led screen service

    const dotMatrix = bus.services({ serviceClass: SRV_DOT_MATRIX })?.[0];
    if (!dotMatrix) {
        console.error("unable to get led screen service");
        return;
    }

    const dotMatrixBrightness = dotMatrix.register(DotMatrixReg.Brightness);
    await dotMatrixBrightness.sendSetAsync(new Uint8Array([255]));  // set LED brightness
    const dotMatrixDots = dotMatrix.register(DotMatrixReg.Dots);

    // access the accelerometer service

    const accr = bus.services({ serviceClass: SRV_ACCELEROMETER })?.[0];
    if (!accr) {
        console.error("unable to get accelerometer service");
        return;
    }

    const accrForces = accr.register(AccelerometerReg.Forces);

    // print out accelerometer forces on x, y and z axis

    accrForces.on(REPORT_RECEIVE, (reg: JDRegister) => {
        const [x, y, z] = reg.unpackedValue as [number, number, number];
        console.log(`X=${x} | Y=${y} | Z=${z}`);
    });

    // when the accelerometer detects "shake", use the event to display a smile face then clean it

    const accrShakeEvent = accr.event(AccelerometerEvent.Shake);
    accrShakeEvent.on(EVENT, async (event: JDEvent) => {
        console.log(`\n===== Event: ${event.name} =====\n`);
        await dotMatrixDots.sendSetAsync(new Uint8Array(
            [
                0b01000,
                0b10010,
                0b10000,
                0b10010,
                0b01000,
            ]
        ));
        await sleep(1000);
        await dotMatrixDots.sendSetAsync(new Uint8Array(
            [
                0b00000,
                0b00000,
                0b00000,
                0b00000,
                0b00000,
            ]
        ));
    });
}

const sleep = async (ms: number = 0) => {
    return new Promise(r => setTimeout(r, ms));
}