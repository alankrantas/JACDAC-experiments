import { FunctionComponent, useState } from "react";
import { useServices, useRegisterValue } from "react-jacdac";
import { SRV_SOUND_LEVEL, SoundLevelReg } from "jacdac-ts";

const SoundLevel: FunctionComponent = () => {
    
    const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

    const service = useServices({ serviceClass: SRV_SOUND_LEVEL })[0];

    const [soundLevelValue = 0] = useRegisterValue(service.register(SoundLevelReg.SoundLevel));

    const soundEnableReg = service.register(SoundLevelReg.Enabled);
    
    const toggle = async () => {
        await soundEnableReg.sendSetBoolAsync(!soundEnabled);
        setSoundEnabled(!soundEnabled);
    };

    return (
        <div>
            <div className="fs-5 form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch"
                    defaultValue="false" onClick={toggle} /> Toggle
            </div>
            <div>
                {soundEnabled
                    &&
                    <div className="p-1 m-1 lead">
                        <br />
                        <progress id="pitch" value={soundLevelValue ?? 0} max="1" /> Sound level
                    </div>
                }
            </div>
        </div>
    )
}

export default SoundLevel;
