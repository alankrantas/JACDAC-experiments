import { WebUSB } from "usb";
import { createUSBBus, createNodeUSBOptions } from "jacdac-ts";
import { CONNECTION_STATE, DEVICE_ANNOUNCE, ERROR, REPORT_RECEIVE, EVENT } from "jacdac-ts";
import { SRV_ACCELEROMETER, AccelerometerReg, AccelerometerEvent } from "jacdac-ts";
import { SRV_DOT_MATRIX, DotMatrixReg } from "jacdac-ts";
import type { JDDevice, JDRegister, JDEvent } from "jacdac-ts";

const options = createNodeUSBOptions(WebUSB);
const bus = createUSBBus(options);

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

async function main(device: JDDevice) {

    device.identify();

    console.log(`Device: ${device.name}`);

    device.services().forEach(service => {
        console.log(`Service [${service.serviceIndex}]: ${service.name} (identifier: ${service.serviceClass})`);
    });

    await sleep(2000);

    const dotMatrix = bus.services({ serviceClass: SRV_DOT_MATRIX })[0];

    const dotMatrixBrightness = dotMatrix.register(DotMatrixReg.Brightness);
    const dotMatrixDots = dotMatrix.register(DotMatrixReg.Dots);
    await dotMatrixBrightness.sendSetAsync(new Uint8Array([255]));

    const accr = bus.services({ serviceClass: SRV_ACCELEROMETER })[0];
    const accrForces = accr.register(AccelerometerReg.Forces);

    accrForces.on(REPORT_RECEIVE, (reg: JDRegister) => {
        const [x, y, z] = reg.unpackedValue as [number, number, number];
        console.log(`X=${x} | Y=${y} | Z=${z}`);
    });

    const accrShakeEvent = accr.event(AccelerometerEvent.Shake);

    accrShakeEvent.on(EVENT, async (event: JDEvent) => {
        console.log(`===== Event: ${event.name} =====`);
        await dotMatrixDots.sendSetAsync(new Uint8Array(
            [
                0b00000,
                0b01010,
                0b00000,
                0b10001,
                0b01110,
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

async function sleep(ms: number = 0) {
    return new Promise(r => setTimeout(r, ms));
}