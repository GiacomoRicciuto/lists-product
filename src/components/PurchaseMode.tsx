import {ReactElement, useContext} from "react";
import {StateContext} from "../App";
import Product from "./Product";
import {exitPurchaseMode} from "../State";
import { Col, Button, ListGroup } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';

interface purchaseModeProps {
}

function PurchaseMode(_: purchaseModeProps): ReactElement {
    const { state, dispatch} = useContext(StateContext);
    const {lists, selectedList, groups, purchaseMode} = state

    const selectedListObj = lists.find((list) => list.listName === selectedList);
    const selectedListGroups = selectedListObj?.products.map(p => p.group)
    
    let newListGroups: (string | undefined)[] = [...groups];
    for (let j = 0; j < groups.length; j++) {
        if (!selectedListGroups?.includes(groups[j])) {
            newListGroups = newListGroups.filter(g => g !== groups[j])
        }
    }
    newListGroups.push(undefined)

    return (
        <>
            {purchaseMode && <div>
                <div className="d-flex justify-content-center">
                <Col xs="12" md="8" className="below-nav pb-6">
                    <ListGroup variant="primary">
                        {newListGroups.map(g =>
                            (selectedListGroups?.filter(group => group === g).length !== 0 &&
                                <ListGroup.Item key={g} variant="primary">
                                    <div className="my-2 text-center">
                                        {g && <h6 className="text-muted">{g}</h6>}
                                        {!g && <h6 className="text-muted">Altro</h6>}
                                    </div>
                                    <ListGroup>
                                        {selectedListObj?.products.filter(p => p.group === g).map(p =>
                                            <Product product={p}/>
                                        )}
                                    </ListGroup>
                                </ListGroup.Item>
                            )
                        )}
                    </ListGroup>
                </Col>
                </div>
                <div className="d-flex justify-content-center">
                    <Link to={{ pathname: "/" }} style={{ textDecoration: 'none' }}>
                        <Button variant="outline-success" onClick={() => dispatch(exitPurchaseMode())}>Fine acquisto</Button>
                    </Link>
                </div>
            </div>}
            {!purchaseMode && <Navigate to={{ pathname: "/" }} />}
        </>
    )
}

export default PurchaseMode