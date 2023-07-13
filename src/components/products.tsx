import React, {useContext} from "react";
import {StateContext} from "../App";
import Product from "./product";
import {enterPurchaseMode, exitPurchaseMode, inputNameProduct} from "../State";
import InputProduct from "./inputProduct";
import PurchaseMode from "./PurchaseMode";

interface productProps {
    listName: string;
}

function Products({listName}: productProps) {
    const {state, dispatch} = useContext(StateContext);
    const {lists, creatingProduct, selectedProduct, groups, purchaseMode} = state;

    const handleCreateProduct = () => {
        dispatch(inputNameProduct());
    };

    const selectedListObj = lists.find((list) => list.listName === listName);
    const selectedListGroups = selectedListObj?.products.map(p => p.group)

    let newListGroups: (string | undefined)[] = [...groups];
    for (let j = 0; j < groups.length; j++) {
        if (!selectedListGroups) {

        }
        if (!selectedListGroups?.includes(groups[j])) {
            newListGroups = newListGroups.filter(g => g !== groups[j])
        }
    }
    newListGroups.push(undefined)

    return (
        <div>
            {!purchaseMode && <div>
                <ul>
                    {newListGroups.map(g =>
                        (selectedListGroups?.filter(group => group === g).length !== 0 &&
                            <li key={g}>
                                {g && <h3>{g}</h3>}
                                {!g && <h3>Altro</h3>}
                                <ul>
                                    {selectedListObj?.products.filter(p => p.group === g).map(p =>
                                        <li key={p.productName}>
                                            <Product listName={listName} productName={p.productName}/>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        )
                    )}
                </ul>
                {selectedListObj?.products.length === 0 && <h3>Nessun prodotto presente</h3>}
                {creatingProduct && (
                    <div>
                        <InputProduct listName={listName} productName={selectedProduct}/>
                    </div>
                )}
                {!creatingProduct && (
                    <button onClick={handleCreateProduct}>Crea un nuovo prodotto</button>
                )}
                <button onClick={() => dispatch(enterPurchaseMode())}>Inizia acquisto</button>
            </div>}

            {purchaseMode &&
                <div>
                    <PurchaseMode listName={listName} groups={newListGroups}/>
                    <button onClick={() => dispatch(exitPurchaseMode())}>Fine acquisto</button>
                </div>
            }

        </div>
    );
}

export default Products;
