import { useContext } from "react";
import { StateContext } from "../App";
import Products from "./products";
import {
    askConfirmation,
    closeConfirmation,
    removeList,
    selectList,
    addGroup,
    changeGroupOrder
} from "../State";
import { Button } from "react-bootstrap";
import * as Icons from 'react-bootstrap-icons';

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
            <div className="d-flex justify-content-end">
                <Button variant="outline-danger" onClick={() => handleRemoveList()}><Icons.Trash /></Button>
            </div>
            {removeConfirmation && (
                <div>
                    <p>Elimina lista?</p>
                    <button onClick={() => dispatch(removeList(listName))}>Elimina</button>
                    <button onClick={() => dispatch(closeConfirmation())}>Annulla</button>
                </div>
            )}
            <Products listName={listName} />
        </div>
    );
}

export default List;
