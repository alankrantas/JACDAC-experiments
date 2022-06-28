import { FunctionComponent } from "react";
import { useServices, useRegisterValue } from "react-jacdac";
import { SRV_TEMPERATURE, TemperatureReg, TemperatureVariant } from "jacdac-ts";

const Temperature: FunctionComponent = () => {
    
    const service = useServices({ serviceClass: SRV_TEMPERATURE })[0];

    const tempReg = service.register(TemperatureReg.Temperature);
    const [tempValue = 0] = useRegisterValue(tempReg) as number[];

    const tempErrReg = service.register(TemperatureReg.TemperatureError);
    const [tempErrValue = 0] = useRegisterValue(tempErrReg) as number[];

    const tempVarReg = service.register(TemperatureReg.Variant);
    const [tempVarValue = 0] = useRegisterValue(tempVarReg) as number[];

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