import React, {useContext} from "react";
import {StateContext} from "../App";
import {inputNameProduct, selectProduct} from "../State";

interface ProductProps {
    listName: string,
    productName: string
}

function Product({listName, productName}: ProductProps) {
    const { state, dispatch } = useContext(StateContext)
    const {lists} = state

    const selectedList = lists.find((list) => list.listName === listName);
    const selectedProductObj = selectedList?.products.find((product) => product.productName === productName)

    const handleClickProduct = () => {
        dispatch(selectProduct(productName))
        dispatch(inputNameProduct())
    }

    return (
        <div>
            <button onClick={() => handleClickProduct()}>{productName}</button>
            {selectedProductObj?.quantity !== undefined && <h4>{selectedProductObj?.quantity}</h4>
            }
            {/*{selectedProductObj?.group !== undefined && <h4>{selectedProductObj?.group}</h4>}*/}
        </div>
    )
}

export default Product