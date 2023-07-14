import { ReactElement, useContext, useState } from "react";
import {
    addProduct,
    closeAlertRemoveProduct,
    modifyProductName,
    modifyQuantity,
    outputNameProduct,
    removeProduct, selectGroup,
    setQuantityUndefined,
    showAlertNameProduct,
    showAlertRemoveProduct, 
    unSelectGroup,
} from "../State";
import { StateContext } from "../App";
import Alert from "./Alert";
import Select from "react-select";
import { Button, ButtonGroup } from "react-bootstrap";
import * as Icons from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

interface inputProductProps {
    listName: string;
    productName?: string;
}

function InputProduct({ listName, productName }: inputProductProps): ReactElement {
    const { state, dispatch } = useContext(StateContext);
    const [newProductName, setNewProductName] = useState(productName || "");
    const { lists, alertRemoveProduct, groups } = state;
    const selectedList = lists.find((list) => list.listName === listName);
    const selectedProductObj = selectedList?.products.find(
        (product) => product.productName === productName
    );
    const [counter, setCounter] = useState(selectedProductObj?.quantity || 0);

    const [isChecked, setIsChecked] = useState(selectedProductObj?.quantity !== undefined);
    const [selectedGroup, setSelectedGroup] = useState<string | undefined>(selectedProductObj?.group);

    const handleGroupSelect = (selectedOption: { value: string; label: string } | null) => {
        setSelectedGroup(selectedOption?.value);
    };

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    const handleAddProduct = () => {
        if (newProductName !== "") {
            dispatch(addProduct(newProductName));
            if (isChecked) {
                dispatch(modifyQuantity(listName, newProductName, counter));
            } else {
                dispatch(setQuantityUndefined(listName, newProductName));
            }
            if (selectedGroup !== undefined) {
                dispatch(selectGroup(newProductName, selectedGroup))
            }
            else {
                dispatch(unSelectGroup(newProductName))
            }
            setNewProductName("");
            setSelectedGroup(undefined); // Reset selected group

        } else {
            dispatch(showAlertNameProduct());
        }
    };

    const handleModifyProduct = () => {
        if (newProductName !== "") {
            dispatch(modifyProductName(listName, productName || "", newProductName));
            if (isChecked) {
                dispatch(modifyQuantity(listName, newProductName, counter));
            } else {
                dispatch(setQuantityUndefined(listName, newProductName));
            }
            if (selectedGroup !== undefined) {
                dispatch(selectGroup(newProductName, selectedGroup))
            }
            else {
                dispatch(unSelectGroup(newProductName))
            }
        } else {
            dispatch(showAlertNameProduct());
        }
    };

    const handleClose = () => {
        dispatch(outputNameProduct());
    };

    const handleRemoveProduct = () => {
        dispatch(showAlertRemoveProduct());
    };

    return (
        <div>
            <div>
                <div className="d-flex justify-content-between">
                    <div>
                    </div>
                    <div>
                        {alertRemoveProduct && productName && (
                            <div>
                                <p>Vuoi eliminare definitivamente {productName}?</p>
                                <div className="d-flex justify-content-between">
                                    <Button variant="outline-secondary" onClick={() => dispatch(closeAlertRemoveProduct())}>Annulla</Button>
                                    <Button variant="danger" onClick={() => {
                                            dispatch(removeProduct(productName));
                                            dispatch(closeAlertRemoveProduct());
                                    }}>Elimina</Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        { productName && <Button variant="danger" onClick={() => handleRemoveProduct()}><Icons.Trash /></Button> }
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <InputGroup className="mb-3">
                    <InputGroup.Text>Nome prodotto</InputGroup.Text>
                    <Form.Control aria-label="name" type="text" value={newProductName} onChange={(e) => setNewProductName(e.target.value)}/>
                </InputGroup>
                <div className="d-flex justify-content-between">
                    <Form.Check
                        type="checkbox"
                        label={productName ? "Modifica quantità": "Aggiungi quantità"}
                        onChange={handleOnChange}
                        checked={isChecked}
                    />
                    {isChecked && (
                        <ButtonGroup size="sm" aria-label="small outlined button group">
                            <Button size="sm" variant="secondary" onClick={() => setCounter(counter - 1)} disabled={counter <= 0}><Icons.Dash /></Button>
                            <Button size="sm" variant="outline-dark" disabled><small>{counter}</small></Button>
                            <Button size="sm" variant="secondary" onClick={() => setCounter(counter + 1)}><Icons.Plus /></Button>
                        </ButtonGroup>
                    )}
                </div>
            </div>
            <div className="mt-2">
                {productName && 'Modifica gruppo:'}
                {!productName && 'Aggiungi a gruppo:'}
                <Select
                    options={groups.map((group) => ({ value: group, label: group }))}
                    value={selectedGroup ? { value: selectedGroup, label: selectedGroup } : null}
                    onChange={handleGroupSelect}
                    isClearable
                    isSearchable
                />
            </div>
            <div className="d-flex justify-content-around mt-3">
                {!productName && <Button variant="outline-secondary" onClick={() => handleClose()}>Annulla</Button> }
                <Button variant="outline-success" type="submit" onClick={() => productName? handleModifyProduct(): handleAddProduct()}>Salva</Button>
            </div>
            <Alert />
        </div>
    );
}

export default InputProduct;
