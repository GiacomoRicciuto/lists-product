import {useContext} from "react";
import {StateContext} from "../App";
import {inputNameProduct, selectProduct} from "../State";
import InputProduct from "./InputProduct";
import { Accordion, ListGroup, Button } from "react-bootstrap";

interface productProps {
    listName: string;
}

function Products({listName}: productProps) {
    const {state, dispatch} = useContext(StateContext);
    const {lists, creatingProduct, groups, purchaseMode} = state;

    const handleCreateProduct = () => {
        dispatch(inputNameProduct());
    };

    const handleClickProduct = (productName: string) => {
        dispatch(selectProduct(productName))
    }

    const selectedListObj = lists.find((list) => list.listName === listName);
    const selectedListGroups = selectedListObj?.products.map(p => p.group)

    let newListGroups: (string | undefined)[] = [...groups];
    for (let j = 0; j < groups.length; j++) {
        if (!selectedListGroups?.includes(groups[j])) {
            newListGroups = newListGroups.filter(g => g !== groups[j])
        }
    }
    newListGroups.push(undefined)

    return (
        <div className="mt-3">
            {!purchaseMode && <div>
                <ListGroup>
                    {newListGroups.map(g =>
                        (selectedListGroups?.filter(group => group === g).length !== 0 &&
                            <ListGroup.Item key={g}>
                                <div className="my-2 text-center">
                                    {g && <h6 className="text-muted">{g}</h6>}
                                    {!g && <h6 className="text-muted">Altro</h6>}
                                </div>
                                <Accordion onSelect={(e) => {
                                        if (e && typeof e === 'string'){ 
                                            handleClickProduct(e);
                                        }
                                    }}>
                                    {selectedListObj?.products.filter(p => p.group === g).map(p =>
                                        <Accordion.Item eventKey={p.productName}>
                                            <Accordion.Header>
                                                {!p?.quantity && <span>{p.productName}</span>}
                                                {p?.quantity && 
                                                    <span>
                                                        <span>{p.productName}</span>{' '}
                                                        <Button disabled variant="outline-primary">{'Quantità: ' + p?.quantity}</Button>
                                                    </span>
                                                }
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <InputProduct listName={listName} productName={p.productName}/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )}
                                </Accordion>
                            </ListGroup.Item>
                        )
                    )}
                </ListGroup>
                {selectedListObj?.products.length === 0 && <h5 className="text-center">Non sono presenti prodotti</h5>}
                {creatingProduct && (
                    <div className="mt-5">
                        <h5 className="text-center">Nuovo prodotto</h5>
                        <InputProduct listName={listName} productName={""}/>
                    </div>
                )}
                {!creatingProduct && (
                    <div className="d-flex justify-content-around mt-3">
                        <Button variant="outline-primary" onClick={handleCreateProduct}>Nuovo prodotto</Button>
                    </div>
                )}
            </div>}

        </div>
    );
}

export default Products;
