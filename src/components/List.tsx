import React, { useContext } from "react";
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

interface ListProps {
    listName: string;
}

function List({ listName }: ListProps) {
    const { state, dispatch } = useContext(StateContext);
    const {
        lists,
        selectedList,
        removeConfirmation,
        creatingProduct
    } = state;


    const handleSelectList = () => {
        dispatch(selectList(listName));
    };

    const handleRemoveList = () => {
        dispatch(askConfirmation());
    };

    return (
        <div>
            <button onClick={handleSelectList}>{listName}</button>
            {listName === selectedList && !creatingProduct && (
                <button onClick={() => handleRemoveList()}>x</button>
            )}
            {removeConfirmation && listName === selectedList && (
                <div>
                    <p>Elimina lista?</p>
                    <button onClick={() => dispatch(removeList(listName))}>Elimina</button>
                    <button onClick={() => dispatch(closeConfirmation())}>Annulla</button>
                </div>
            )}
            {listName === selectedList && (
                <div>
                    <Products listName={listName} />
                </div>
            )}
        </div>
    );
}

export default List;
