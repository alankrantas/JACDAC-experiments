import { FunctionComponent, useState, useEffect } from "react";
import { useServices, useRegisterValue, useEventReceived } from "react-jacdac";
import { SRV_ACCELEROMETER, AccelerometerReg, AccelerometerEvent } from "jacdac-ts";
import type { JDEvent } from "jacdac-ts";

const Accelerometer: FunctionComponent = () => {

    const [pitch, setPitch] = useState<number>();
    const [roll, setRoll] = useState<number>();
    const [event, setEvent] = useState<String>("");

    const service = useServices({ serviceClass: SRV_ACCELEROMETER })[0];

    const accelReg = service.register(AccelerometerReg.Forces);
    const [x = 0, y = 0, z = 0] = useRegisterValue(accelReg) as [number, number, number];

    useEffect(() => {
        setPitch(Math.atan2(y, Math.sqrt(x ** 2 + z ** 2)) * (180 / Math.PI));
        setRoll(Math.atan2(x, Math.sqrt(y ** 2 + z ** 2)) * (180 / Math.PI));
    }, [x, y, z]);

    useEventReceived(service.event(AccelerometerEvent.Shake), (e: JDEvent) => {
        setEvent(e.name);
    });

    useEventReceived(service.event(AccelerometerEvent.Freefall), (e: JDEvent) => {
        setEvent(e.name);
    });

    useEventReceived(service.event(AccelerometerEvent.FaceUp), (e: JDEvent) => {
        setEvent(e.name);
    });

    useEventReceived(service.event(AccelerometerEvent.FaceDown), (e: JDEvent) => {
        setEvent(e.name);
    });

    useEventReceived(service.event(AccelerometerEvent.TiltDown), (e: JDEvent) => {
        setEvent(e.name);
    });

    useEventReceived(service.event(AccelerometerEvent.TiltLeft), (e: JDEvent) => {
        setEvent(e.name);
    });

    useEventReceived(service.event(AccelerometerEvent.TiltRight), (e: JDEvent) => {
        setEvent(e.name);
    });

    useEventReceived(service.event(AccelerometerEvent.TiltUp), (e: JDEvent) => {
        setEvent(e.name);
    });

    useEffect(() => {
        const timer = setTimeout(() => setEvent(""), 3000);
        return () => clearTimeout(timer);
    }, [event]);

    return (
        <div>
            <div>
                {
                    event !== ""
                    &&
                    <div className="p-3 m-3 fs-6 alert alert-success d-flex justify-content-between">
                        {event}
                        <span className="text-end">
                            <button
                                type="button"
                                className="btn btn-sm btn-close"
                                onClick={() => setEvent("")}
                            />
                        </span>
                    </div>
                }
            </div>
            <div className="p-1 m-1 lead">
                <progress value={(pitch ?? 0) + 90} max="180" /> Pitch
            </div>
            <div className="p-1 m-1 lead">
                <progress value={(roll ?? 0) + 90} max="180" /> Roll
            </div>
        </div>
    )
}

export default Accelerometer;
