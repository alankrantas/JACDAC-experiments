import { FunctionComponent } from "react";
import { useDeviceSpecification } from "react-jacdac";
import type { JDDevice, JDService } from "jacdac-ts";
import ServiceOperator from "./serviceOperator";

interface Props {
    device: JDDevice;
    serviceClass: number;
    setServiceClass: (serviceClass: number) => any;
}

const Device: FunctionComponent<Props> = (props) => {
    const spec = useDeviceSpecification(props.device);

    if (props.device) {
        return (
            <div>
                <div className="p-2 m-2 card">
                    <h5 className="p-2 m-2 card-title">
                        <b>{spec.name}</b> ({props.device.name})
                    </h5>
                    <blockquote className="p-2 m-2 blockquote text-muted">
                        {spec.description}
                    </blockquote >
                    <div>
                        <div className="p-2 m-2 fs-6 card-header">
                            Found services
                        </div>
                        <ul className="list-group list-group-flush">
                            {props.device.services().map((service: JDService) =>
                                <li
                                    key={service.serviceClass}
                                    className="list-group-item">
                                    <div>
                                        <span className="p-1 m-1 fs-6">
                                            <b>{service.name}</b> (identifier: {service.serviceClass})
                                        </span>
                                        <button
                                            type="button"
                                            className="p-1 m-1 btn btn-sm btn-secondary"
                                            onClick={() => props.setServiceClass(service.serviceClass)}
                                        >
                                            inspect
                                        </button>
                                    </div>
                                    {service.serviceClass === props.serviceClass
                                        &&
                                        <div>
                                            <ServiceOperator
                                                serviceClass={props.serviceClass}
                                                setServiceClass={props.setServiceClass} />
                                        </div>
                                    }
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
};

export default Device;