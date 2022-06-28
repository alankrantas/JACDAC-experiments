import { FunctionComponent, ChangeEvent } from "react";
import { useServices } from "react-jacdac";
import { SRV_DOT_MATRIX, DotMatrixReg } from "jacdac-ts";

const DotMatrix: FunctionComponent = () => {

    const service = useServices({ serviceClass: SRV_DOT_MATRIX })[0];

    const dotMatrixDotsReg = service.register(DotMatrixReg.Dots);
    dotMatrixDotsReg.sendSetAsync(new Uint8Array(
        [
            0b11111,
            0b11111,
            0b11111,
            0b11111,
            0b11111,
        ]
    ));

    const dotMatrixBrightnessReg = service.register(DotMatrixReg.Brightness);
    dotMatrixBrightnessReg.sendSetAsync(new Uint8Array([128]));

    const setBrightness = async (e: ChangeEvent<HTMLInputElement>) => {
        await dotMatrixBrightnessReg.sendSetAsync(new Uint8Array([Number(e.target.value)]));
    };

    return (
        <div>
            <div className="p-1 m-1 lead">
                Brightness
            </div>
            <div>
                <input type="range" className="p-1 m-1 form-range"
                    min="0" max="255" defaultValue={128}
                    onChange={setBrightness} />
            </div>
        </div>
    )
}

export default DotMatrix;