import React, { useContext } from "react";
import { StateContext } from "./App";
import Products from "./products";
import {
    askConfirmation,
    closeConfirmation,
    removeList,
    selectList,
    addGroup,
    changeGroupOrder
} from "./State";

interface ListProps {
    listName: string;
}

function List({ listName }: ListProps) {
    const { state, dispatch } = useContext(StateContext);
    const {
        lists,
        selectedList,
        removeConfirmation,
        creatingProduct,
        groups
    } = state;

    const handleSelectList = () => {
        dispatch(selectList(listName));
    };

    const handleRemoveList = () => {
        dispatch(askConfirmation());
    };

    const handleAddGroup = () => {
        const groupName = prompt("Inserisci il nome del nuovo gruppo");
        if (groupName) {
            dispatch(addGroup(groupName));
        }
    };

    const handleChangeGroupOrder = (newOrder: string[]) => {
        dispatch(changeGroupOrder(newOrder));
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
                    <div>
                        <h4>Gruppi:</h4>
                        <ul>
                            {groups.map((group) => (
                                <li key={group}>{group}</li>
                            ))}
                        </ul>
                        <button onClick={handleAddGroup}>Aggiungi gruppo</button>
                        <button onClick={() => handleChangeGroupOrder([...groups].reverse())}>
                            Inverti ordine gruppi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default List;
