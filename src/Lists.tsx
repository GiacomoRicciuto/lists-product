import React, {ReactElement, useContext, useState} from "react";
import {StateContext} from "./App";
import List from "./List";
import {inputNameList, createNewList, outputNameList} from "./State";


interface ListsProps {

}

function Lists(_: ListsProps): ReactElement {
    const [newListName, setNewListName] = useState("")
    const {state, dispatch} = useContext(StateContext)
    const {lists, creatingList} = state

    const handleCreateList = () => {
        dispatch(inputNameList())
    }

    const handleClose = () => {
        dispatch(outputNameList())
        setNewListName("")
    }

    const handleCreateNewList = () => {
        dispatch(createNewList(newListName))
        setNewListName("")
    }

    return (
        <div>
            {lists.length !== 0 &&
                <ul>
                    {lists.map(
                        (list) => <li key={list.listName}>
                            <List listName={list.listName}></List>
                        </li>
                    )}
                </ul>}
            {lists.length === 0 && <h3>Nessuna lista presente</h3>}
            {creatingList && (
                <div>
                    <input type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)}/>
                    <button type="submit" onClick={() => handleCreateNewList()}>Aggiungi lista</button>
                    <button onClick={() => handleClose()}>Annulla</button>
                </div>
            )}
            {(!creatingList &&
                <button onClick={handleCreateList}>Crea una nuova lista</button>
            )}

        </div>
    )
}

export default Lists