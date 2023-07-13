import {useContext} from "react";
import {StateContext} from "./App";

interface productProps {
    listName: string
}

function Product({listName}: productProps) {
    const { state, dispatch} = useContext(StateContext)
    const {lists, selectedList} = state

    return (
        <div>
            <ul>
                {selectedListObj.products.map((product) => (
                    <li key={product.productName}><Product/></li>
                ))}
            </ul>
        </div>
    )
}

export default Product