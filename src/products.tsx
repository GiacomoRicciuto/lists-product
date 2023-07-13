import React, { useContext } from "react";
import { StateContext } from "./App";
import Product from "./product";
import { inputNameProduct } from "./State";
import InputProduct from "./inputProduct";

interface productProps {
    listName: string;
}

function Products({ listName }: productProps) {
    const { state, dispatch } = useContext(StateContext);
    const { lists, creatingProduct, selectedProduct} = state;

    const handleCreateProduct = () => {
        dispatch(inputNameProduct());
    };

    const selectedListObj = lists.find((list) => list.listName === listName);

    /*const sortedProducts = selectedListObj?.products.sort((a, b) => {
        const groupA = a.group || "";
        const groupB = b.group || "";

        if (groupA === "" && groupB !== "") {
            return 1; // Sposta i prodotti senza gruppo alla fine
        }
        if (groupA !== "" && groupB === "") {
            return -1; // Sposta i prodotti senza gruppo alla fine
        }
        return groupA.localeCompare(groupB);
    });*/

    const groupedProducts: { [key: string]: any[] } = {};

    /*sortedProducts?.forEach((product) => {
        const group = product.group || "Senza Gruppo";
        if (!groupedProducts[group]) {
            groupedProducts[group] = [];
        }
        groupedProducts[group].push(product);
    });*/

    return (
        <div>
            <ul>
                {selectedListObj?.products.map(p => (
                    <li key={p.productName}>
                        <Product listName={listName} productName={p.productName} />
                    </li>
                ))}
            </ul>
            {selectedListObj?.products.length === 0 && <h3>Nessun prodotto presente</h3>}
            {creatingProduct && (
                <div>
                    <InputProduct listName={listName} productName={selectedProduct} />
                </div>
            )}
            {!creatingProduct && (
                <button onClick={handleCreateProduct}>Crea un nuovo prodotto</button>
            )}
        </div>
    );
}

export default Products;
