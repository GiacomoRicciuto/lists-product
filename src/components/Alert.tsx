import React, { ReactElement, useContext, useEffect } from "react";
import { StateContext } from "../App";
import { showAlertNameProduct, closeAlertNameProduct } from "../State";

interface AlertProps {}

function Alert(_: AlertProps): ReactElement {
    const { state, dispatch } = useContext(StateContext);
    const { alertNameProduct } = state;

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;

        if (alertNameProduct) {
            timeoutId = setTimeout(() => {
                dispatch(closeAlertNameProduct());
            }, 5000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [alertNameProduct, dispatch]);

    return (
        <div>
            {alertNameProduct && <p>Inserire un nome valido per il prodotto</p>}
        </div>
    );
}

export default Alert;