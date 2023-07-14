import { useContext } from "react";
import { StateContext } from "../App";
import Products from "./Products";
import {
    askConfirmation,
    closeConfirmation,
    removeList,
    enterPurchaseMode
} from "../State";
import { Button } from "react-bootstrap";
import * as Icons from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

interface ListProps {
    listName: string;
}

function List({ listName }: ListProps) {
    const { state, dispatch } = useContext(StateContext);
    const {
        removeConfirmation,
    } = state;

    const handleRemoveList = () => {
        dispatch(askConfirmation());
    };

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div>
                    <Link to={{ pathname: "/purchase" }} style={{ textDecoration: 'none' }}>
                        <Button variant="success" onClick={() => dispatch(enterPurchaseMode())}>Inizia acquisto</Button>
                    </Link>
                </div>
                <div>
                    {removeConfirmation && (
                        <div>
                            <p>Vuoi eliminare definitivamente la lista?</p>
                            <div className="d-flex justify-content-between">
                                <Button variant="outline-secondary" onClick={() => dispatch(closeConfirmation())}>Annulla</Button>
                                <Button variant="danger" onClick={() => dispatch(removeList(listName))}>Elimina</Button>
                            </div>
                      </div>
                    )}
                </div>
                <div>
                    <Button variant="danger" onClick={() => handleRemoveList()}><Icons.Trash /></Button>
                </div>
            </div>
            <Products listName={listName} />
        </div>
    );
}

export default List;
