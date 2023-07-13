import React, {ReactElement, useContext, useState} from "react";
import {StateContext} from "../App";
import {addGroup, inputGroup, outputGroup, showAlertNameGroup, changeGroupOrder} from "../State";
import AlertGroup from "./AlertGroup";

interface groupsProps {

}

function Groups(_: groupsProps): ReactElement {
    const {state, dispatch} = useContext(StateContext)
    const {groups, creatingGroup} = state
    const [newGroupName, setNewGroupName] = useState("")


    const handleAddGroup = () => {
        if (groups.includes(newGroupName)) {
            dispatch(showAlertNameGroup())
            return
        }
        else {
            dispatch(addGroup(newGroupName))
        }
        setNewGroupName("")
    }

    const handleClose = () => {
        dispatch(outputGroup())
        setNewGroupName("")
    }

    const handleCreatingGroup = () => {
        dispatch(inputGroup())
    }


    const handleMoveGroupUp = (index: number) => {
        if (index > 0) {
            const updatedOrder = [...groups];
            [updatedOrder[index - 1], updatedOrder[index]] = [updatedOrder[index], updatedOrder[index - 1]];
            dispatch(changeGroupOrder(updatedOrder))
        }
    };

    const handleMoveGroupDown = (index: number) => {
        if (index < groups.length - 1) {
            const updatedOrder = [...groups];
            [updatedOrder[index], updatedOrder[index + 1]] = [updatedOrder[index + 1], updatedOrder[index]];
            dispatch(changeGroupOrder(updatedOrder))
        }
    };


    return (
        <div>
            <h3>Gruppi</h3>
            <ul>
                {groups.map((group, index) => (
                    <li key={group}>
                        {(
                            <>
                                {index > 0 && (
                                    <button onClick={() => handleMoveGroupUp(index)}>&#x2191;</button>
                                )}
                                {index < groups.length - 1 && (
                                    <button onClick={() => handleMoveGroupDown(index)}>&#x2193;</button>
                                )}
                            </>
                        )}
                        {group}
                    </li>
                ))}
            </ul>
            {!creatingGroup && (
                <div>
                    <button onClick={() => handleCreatingGroup()}>Aggiungi gruppo</button>

                </div>
            )}
            {creatingGroup &&
                <div>
                    <input type="text" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)}/>
                    <button type="submit" onClick={() => handleAddGroup()}>Aggiungi gruppo</button>
                    <button onClick={() => handleClose()}>Annulla</button>
                    <AlertGroup/>
                </div>
            }
        </div>
    )
}

export default Groups