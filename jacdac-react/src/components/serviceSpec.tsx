import { FunctionComponent } from "react";
import { useServiceSpecificationFromServiceClass } from "react-jacdac";

interface Props {
    serviceClass: number;
}

const ServiceSpec: FunctionComponent<Props> = (props) => {
    const spec = useServiceSpecificationFromServiceClass(props.serviceClass);

    const kindMap = new Map();
    kindMap.set("report", "report");
    kindMap.set("const", "register (constant)");
    kindMap.set("ro", "register (read only)");
    kindMap.set("rw", "register (read/write)");
    kindMap.set("event", "event");

    return (
        <div>
            {
                props.serviceClass !== -1
                &&
                <div>
                    <table className="table table-sm table-striped-columns">
                        <thead>
                            <tr>
                                <th colSpan={5}>
                                    [<b>{spec.name}</b>] specification (registers and events)
                                </th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            <tr>
                                <td>Identifier</td>
                                <td>Name</td>
                                <td>Kind</td>
                                <td>Desciption</td>
                                <td>Fields</td>
                            </tr>
                            {spec.packets.map((packet) => (
                                <tr>
                                    <td>{packet.identifier}</td>
                                    <td>{packet.name}</td>
                                    <td>{kindMap.get(String(packet.kind))}</td>
                                    <td>
                                        <div className="text-muted">
                                            {packet.description}
                                        </div>
                                    </td>
                                    <td>
                                        <ul>
                                            {packet.fields.map((field) =>
                                                <li key={field.name}>
                                                    {field.name !== "_" ? field.name : "(none)"}  (type: {field.type}, unit: {field.unit})
                                                </li>
                                            )}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div >
    );
}

export default ServiceSpec;