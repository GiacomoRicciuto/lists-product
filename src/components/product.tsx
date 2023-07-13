import React, {useContext, useState} from "react";
import {StateContext} from "../App";
import {inputNameProduct, selectProduct} from "../State";

interface ProductProps {
    listName: string,
    productName: string
}

function Product({listName, productName}: ProductProps) {
    const { state, dispatch } = useContext(StateContext)
    const {lists, purchaseMode} = state
    const [isChecked, setIsChecked] = useState(false)

    const selectedList = lists.find((list) => list.listName === listName);
    const selectedProductObj = selectedList?.products.find((product) => product.productName === productName)

    const handleClickProduct = () => {
        dispatch(selectProduct(productName))
        dispatch(inputNameProduct())
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    return (
        <div>
            {!purchaseMode && <button onClick={() => handleClickProduct()}>{productName}</button>}
            {purchaseMode && (<div>
                {!purchaseMode && (
                    <button onClick={() => handleClickProduct()}>{productName}</button>
                )}
                {purchaseMode && (
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange()}
                            />
                            <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
                                {productName}
          </span>
                        </label>
                    </div>
                )}
                {selectedProductObj?.quantity !== undefined && (
                    <h4>{selectedProductObj?.quantity}</h4>
                )}
            </div>)}
            {
                selectedProductObj?.quantity !== undefined && <h4>{selectedProductObj?.quantity}</h4>
            }
        </div>
    )
}

export default Product