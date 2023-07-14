import {ReactElement, useContext, useState} from "react";
import {StateContext} from "../App";
import {addGroup, inputGroup, outputGroup, showAlertNameGroup, changeGroupOrder} from "../State";
import AlertGroup from "./AlertGroup";
import { Col, Button, ListGroup } from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

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
        <Col sm="8" className="below-nav pb-6">
            <ListGroup>
                {groups.map((group, index) => (
                    <ListGroup.Item key={group} className="d-flex justify-content-between">
                        {group}
                        {(
                            <div>
                                {index > 0 && (
                                    <Button variant="outline-secondary" size="sm" onClick={() => handleMoveGroupUp(index)}>
                                        <Icons.ArrowUp />
                                    </Button>
                                )}
                                {index < groups.length - 1 && (
                                    <Button variant="outline-secondary" size="sm" onClick={() => handleMoveGroupDown(index)}>
                                        <Icons.ArrowDown />
                                    </Button>
                                )}
                            </div>
                        )}
                    </ListGroup.Item>
                ))}
                {creatingGroup &&
                    <ListGroup.Item >
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Nome Gruppo</InputGroup.Text>
                            <Form.Control aria-label="name" type="text" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)}/>
                        </InputGroup>
                        <div className="d-flex justify-content-around">
                            <Button variant="outline-secondary" onClick={() => handleClose()}>Annulla</Button>
                            <Button variant="primary" type="submit" onClick={() => handleAddGroup()}>Inserisci</Button>
                        </div>
                        <AlertGroup/>
                    </ListGroup.Item>
                }
            </ListGroup>
            {(!creatingGroup &&
                <Button
                    className="fixed-right-bottom"
                    onClick={handleCreatingGroup}>
                    &#43;
                </Button>
            )}
        </Col>
    )
}

export default Groups;