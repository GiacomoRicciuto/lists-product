import React, {useContext} from "react";
import {StateContext} from "./App";
import Product from "./product";
import {inputNameProduct} from "./State";
import InputProduct from "./inputProduct";

interface productProps {
    listName: string;
}

function Products({listName}: productProps) {
    const {state, dispatch} = useContext(StateContext);
    const {lists, creatingProduct, selectedProduct, groups} = state;

    const handleCreateProduct = () => {
        dispatch(inputNameProduct());
    };

    const selectedListObj = lists.find((list) => list.listName === listName);
    const selectedListGroups = selectedListObj?.products.map(p => p.group)

    let newListGroups: (string | undefined)[] = [...groups]; // Definisci il tipo di elemento come Union tra stringa e undefined
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
        </div>
    );
}

export default Products;
