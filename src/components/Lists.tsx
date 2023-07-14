import {ReactElement, useContext, useState} from "react";
import {StateContext} from "../App";
import List from "./List";
import {inputNameList, createNewList, outputNameList, selectList} from "../State";
import { Col, Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

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

    const handleSelectList = (listName: string) => {
        dispatch(selectList(listName))
    }    

    return (
        <Col sm="8" className="below-nav pb-6">
            <Accordion onSelect={(e) => {
                if (e && typeof e === 'string'){ 
                    handleSelectList(e);
                }
            }}>
                {
                    lists.length !== 0 &&
                        lists.map(
                            (list) => 
                                <Accordion.Item eventKey={list.listName}>
                                    <Accordion.Header>
                                        <h6 className="text-muted">{list.listName}</h6>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <List listName={list.listName}></List>
                                    </Accordion.Body>
                                </Accordion.Item>
                        )
                }
                {
                    creatingList && (
                    <Accordion.Item eventKey="new">
                        <Accordion.Header>
                        </Accordion.Header>
                        <Accordion.Body>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Nome Lista</InputGroup.Text>
                                <Form.Control aria-label="name" type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)}/>
                            </InputGroup>
                            <div className="d-flex justify-content-around">
                                <Button variant="outline-secondary" onClick={() => handleClose()}>Annulla</Button>
                                <Button variant="primary" type="submit" onClick={() => handleCreateNewList()}>Inserisci</Button>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion>
            {lists.length === 0 && !creatingList && <h4 className="text-center">Non sono presenti liste</h4>}
            {(!creatingList &&
                <Button
                    className="fixed-right-bottom"
                    onClick={handleCreateList}>
                    &#43;
                </Button>
            )}
        </Col>
    )
}

export default Lists