import { FunctionComponent, useState } from "react";
import { useBus, useChange } from "react-jacdac";
import type { JDDevice } from "jacdac-ts";
import Connection from "./components/connection";
import DevicesList from "./components/devicesList";
import Device from "./components/device";

const App: FunctionComponent = () => {

    const bus = useBus();
    const connected = useChange(bus, _ => _.connected);

    const [device, setDevice] = useState<JDDevice>();
    const [serviceClass, setServiceClass] = useState<number>(-1);

    return (
        <div className="container-sm">
            <div className="p-2 m-2 display-6">JACDAC services demo w/ React</div>
            <div>
                <Connection bus={bus} />
            </div>
            {connected
                &&
                <div className="p-2 m-2">

                    <div>
                        <DevicesList setDevice={setDevice} />
                    </div>
                    <div>
                        <Device device={device!}
                            serviceClass={serviceClass}
                            setServiceClass={setServiceClass} />
                    </div>
                </div>
            }
        </div>
    );
};

export default App;
