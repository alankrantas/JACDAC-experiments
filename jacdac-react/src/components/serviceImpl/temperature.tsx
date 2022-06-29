import { FunctionComponent } from "react";
import { useServices, useRegisterValue } from "react-jacdac";
import { SRV_TEMPERATURE, TemperatureReg, TemperatureVariant } from "jacdac-ts";

const Temperature: FunctionComponent = () => {

    const service = useServices({ serviceClass: SRV_TEMPERATURE })[0];

    const [tempValue = 0] = useRegisterValue(
        service.register(TemperatureReg.Temperature)) as number[];

    const [tempErrValue = 0] = useRegisterValue(
        service.register(TemperatureReg.TemperatureError)) as number[];

    const [tempVarValue = 0] = useRegisterValue(
        service.register(TemperatureReg.Variant)) as number[];

    return (
        <div>
            <div className="p-1 m-1 fs-2">
                <span className="badge bg-info rounded-pill">{tempValue} ± {tempErrValue} °C</span>
            </div>
            <div className="p-1 m-1 lead">
                Type: {TemperatureVariant[tempVarValue]}
            </div>
        </div>
    )
}

export default Temperature;
