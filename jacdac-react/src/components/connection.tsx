import { FunctionComponent } from "react";
import type { JDBus } from "jacdac-ts";

interface Props {
    bus: JDBus
}

const Connection: FunctionComponent<Props> = (props) => {
    return (
        <div>
            {!props.bus.connected ?
                (
                    <div>
                        <button
                            type="button"
                            className="btn btn-lg btn-warning"
                            onClick={() => props.bus.connect()}
                        >
                            Connect USB
                        </button>
                    </div>
                ) :
                (
                    <div className="fs-5 alert alert-success" role="alert">
                        Bus connected
                    </div>
                )}
        </div>
    )
};

export default Connection;