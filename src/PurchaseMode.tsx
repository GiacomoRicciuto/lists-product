import React, {ReactElement, useContext} from "react";
import {StateContext} from "./App";
import Product from "./product";

interface purchaseModeProps {
    listName: string,
    groups: any[]
}

function PurchaseMode({listName, groups}: purchaseModeProps): ReactElement {
    const { state} = useContext(StateContext);
    const {lists} = state

    const selectedListObj = lists.find((list) => list.listName === listName);
    const selectedListGroups = selectedListObj?.products.map(p => p.group)

    return (
        <div>
            <ul>
                {groups.map(g =>
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
        </div>
    )
}

export default PurchaseMode