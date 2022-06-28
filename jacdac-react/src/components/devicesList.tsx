import { FunctionComponent } from "react";
import { useDevices } from "react-jacdac";
import type { JDDevice } from "jacdac-ts";

interface Props {
    setDevice: (device: JDDevice) => any;
}

const DevicesList: FunctionComponent<Props> = (props) => {
    const devices = useDevices({ ignoreInfrastructure: true });

    return (
        <div>
            <div>
                <span className="p-2 m-2 h6">
                    {devices.length > 0 ? "List of found devices" : ""}
                </span>
            </div>
            <div>
                <ul className="p-1 m-1 list-group">
                    {devices.map((device: JDDevice) => (
                        <li
                            key={device.id}
                            className="list-group-item">
                            <span className="p-1 m-1 fs-6">
                                <b>{device.name}</b> ({device.id})
                            </span>
                            <button
                                type="button"
                                className="p-1 m-1 btn btn-sm btn-primary"
                                onClick={() => props.setDevice(device)}
                            >
                                select
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DevicesList;