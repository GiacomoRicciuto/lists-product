import React, { ReactElement, useContext, useEffect } from "react";
import { StateContext } from "../App";
import {closeAlertNameGroup } from "../State";

interface AlertProps {}

function AlertGroup(_: AlertProps): ReactElement {
    const { state, dispatch } = useContext(StateContext);
    const { alertNameGroup } = state;

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;

        if (alertNameGroup) {
            timeoutId = setTimeout(() => {
                dispatch(closeAlertNameGroup());
            }, 5000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [alertNameGroup, dispatch]);

    return (
        <div>
            {alertNameGroup && <p>Gruppo già presente</p>}
        </div>
    );
}

export default AlertGroup;