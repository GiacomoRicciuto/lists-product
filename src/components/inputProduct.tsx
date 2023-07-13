import React, { ReactElement, useContext, useState } from "react";
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

interface inputProductProps {
    listName: string;
    productName?: string;
}

function InputProduct({ listName, productName }: inputProductProps): ReactElement {
    const { state, dispatch } = useContext(StateContext);
    const [newProductName, setNewProductName] = useState(productName || "");
    const { lists, selectedProduct, alertRemoveProduct, groups } = state;
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
            setNewProductName("");
            setSelectedGroup(undefined); // Reset selected group
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
                {productName && productName === selectedProduct && (
                    <button onClick={() => handleRemoveProduct()}>x</button>
                )}
                {alertRemoveProduct && productName === selectedProduct && (
                    <div>
                        <p>Elimina {productName}?</p>
                        <button
                            onClick={() => {
                                dispatch(removeProduct(newProductName));
                                dispatch(closeAlertRemoveProduct());
                            }}
                        >
                            Elimina
                        </button>
                        <button onClick={() => dispatch(closeAlertRemoveProduct())}>Annulla</button>
                    </div>
                )}
                <p>Nome prodotto</p>
                <input
                    type="text"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                />
            </div>
            <div>
                Modifica quantità
                <input type="checkbox" checked={isChecked} onChange={handleOnChange} />
                {isChecked && (
                    <div>
                        <button
                            onClick={() => {
                                if (counter > 0) {
                                    setCounter(counter - 1);
                                }
                            }}
                        >
                            -
                        </button>
                        <h4>{counter}</h4>
                        <button onClick={() => setCounter(counter + 1)}>+</button>
                    </div>
                )}
            </div>
            <div>
                Aggiungi a gruppo:
                <Select
                    options={groups.map((group) => ({ value: group, label: group }))}
                    value={selectedGroup ? { value: selectedGroup, label: selectedGroup } : null}
                    onChange={handleGroupSelect}
                    isClearable
                    isSearchable
                />
            </div>
            {productName && (
                <button type="submit" onClick={() => handleModifyProduct()}>
                    Salva modifiche
                </button>
            )}
            {!productName && (
                <button type="submit" onClick={() => handleAddProduct()}>
                    Salva modifiche
                </button>
            )}
            <Alert />
            <button onClick={() => handleClose()}>Annulla</button>
        </div>
    );
}

export default InputProduct;
