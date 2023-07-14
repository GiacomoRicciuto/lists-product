export interface productsProps {
    productName: string,
    quantity?: number,
    group?: string
}

export interface listsProps {
    listName: string,
    products: productsProps[]
}

export interface menuItem {
    name: string,
    code: string,
    link: string
}

export interface State {
    lists: listsProps[],
    groups: string[],
    selectedList?: string,
    selectedProduct?: string,
    creatingList: boolean,
    creatingProduct: boolean,
    creatingGroup: boolean,
    removeConfirmation: boolean,
    alertNameProduct: boolean,
    alertRemoveProduct: boolean,
    alertNameGroup: boolean,
    purchaseMode: boolean
    expandedMenu: boolean,
    menu: menuItem[],
    selectedMenuItem: menuItem
}

export const initialState: State = {
    lists: [{
        listName: "Spesa",
        products: [{
            productName: "Banana",
            quantity: 2,
            group: "Frutta"
        }, {
            productName: "Prosciutto",
            group: "Gastronomia"
        }]
    }, {
        listName: "Libreria",
        products: [{
            productName: "Il buio oltre la siepe",
            group: "Libri"
        }, {
            productName: "Compasso",
        }]
    }],
    groups: ["Frutta", "Gastronomia", "Libri"],
    creatingList: false,
    creatingProduct: false,
    removeConfirmation: false,
    alertNameProduct: false,
    alertRemoveProduct: false,
    expandedMenu: false,
    menu: [
        { name: "Liste", code: "lists", link: "/lists" },
        { name: "Gruppi", code: "groups", link: "/groups" }
    ],
    selectedMenuItem: { name: "Liste", code: "lists", link: "/lists" },
    creatingGroup: false,
    alertNameGroup: false,
    purchaseMode: false
}

export type Action =
    | {type: "inputNameList"}
    | {type: "outputNameList"}
    | {type: "inputNameProduct"}
    | {type: "outputNameProduct"}
    | {type: "inputQuantity"}
    | {type: "askConfirmation"}
    | {type: "closeConfirmation"}
    | {type: "showAlertNameProduct"}
    | {type: "closeAlertNameProduct"}
    | {type: "showAlertNameGroup"}
    | {type: "closeAlertNameGroup"}
    | {type: "showAlertRemoveProduct"}
    | {type: "closeAlertRemoveProduct"}
    | {type: "inputGroup"}
    | {type: "outputGroup"}
    | {type: "enterPurchaseMode"}
    | {type: "exitPurchaseMode"}
    | {type: "setQuantityUndefined", listName: string, productName: string}
    | {type: "createNewList", listName: string}
    | {type: "selectList", listName: string}
    | {type: "selectProduct", productName: string}
    | {type: "modifyQuantity", listName: string, productName: string, newQuantity: number}
    | {type: "modifyProductName", listName: string, productName: string, newProductName: string}
    | {type: "removeProduct", productName: string}
    | {type: "removeList", listName: string}
    | {type: "addProduct", productName: string}
    | {type: "addGroup", groupName: string}
    | {type: "changeGroupOrder", orderedList: string[]}
    | {type: "selectGroup", productName: string, nameGroup: string}
    | {type: "expandMenu"}
    | {type: "selectMenuItem", menuItem: menuItem}
    | {type: "unSelectGroup", productName: string}

export const inputNameList = (): Action => ({type: "inputNameList"})
export const outputNameList = (): Action => ({type: "outputNameList"})
export const inputNameProduct = (): Action => ({type: "inputNameProduct"})
export const outputNameProduct = (): Action => ({type: "outputNameProduct"})
export const inputQuantity = (): Action => ({type: "inputQuantity"})
export const askConfirmation = (): Action => ({type: "askConfirmation"})
export const closeConfirmation = (): Action => ({type: "closeConfirmation"})
export const showAlertNameProduct = (): Action => ({type: "showAlertNameProduct"})
export const closeAlertNameProduct = (): Action => ({type: "closeAlertNameProduct"})
export const showAlertRemoveProduct = (): Action => ({type: "showAlertRemoveProduct"})
export const closeAlertRemoveProduct = (): Action => ({type: "closeAlertRemoveProduct"})
export const showAlertNameGroup = (): Action => ({type: "showAlertNameGroup"})
export const closeAlertNameGroup = (): Action => ({type: "closeAlertNameGroup"})
export const inputGroup = (): Action => ({type: "inputGroup"})
export const outputGroup = (): Action => ({type: "outputGroup"})
export const enterPurchaseMode = (): Action => ({type: "enterPurchaseMode"})
export const exitPurchaseMode = (): Action => ({type: "exitPurchaseMode"})
export const createNewList = (listName: string): Action => ({type: "createNewList", listName})
export const removeList = (listName: string): Action => ({type: "removeList", listName})
export const selectList = (listName: string): Action => ({type: "selectList", listName})
export const selectProduct = (productName: string): Action => ({type: "selectProduct", productName})
export const modifyQuantity = (listName: string, productName: string, newQuantity: number): Action => ({type: "modifyQuantity", listName, productName, newQuantity})
export const modifyProductName = (listName: string, productName: string, newProductName: string): Action => ({type: "modifyProductName", listName, productName, newProductName})
export const setQuantityUndefined = (listName: string, productName: string): Action => ({type: "setQuantityUndefined", listName, productName})
export const removeProduct = (productName: string): Action => ({type: "removeProduct", productName})
export const addProduct = (productName: string): Action => ({type: "addProduct", productName})
export const addGroup = (groupName: string): Action => ({type: "addGroup", groupName})
export const changeGroupOrder = (orderedList: string[]): Action => ({type: "changeGroupOrder", orderedList})
export const selectGroup = (productName: string, nameGroup: string): Action => ({type: "selectGroup", productName, nameGroup})
export const expandMenu = (): Action => ({type: "expandMenu"})
export const selectMenuItem = (menuItem: menuItem): Action => ({type: "selectMenuItem", menuItem})
export const unSelectGroup = (productName: string): Action => ({type: "unSelectGroup", productName})

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "inputNameList":
            return {...state,
                creatingList: true,
                creatingProduct: false,
                selectedProduct: undefined,
                selectedList: undefined
            }
        case "outputNameList":
            return {...state,
                creatingList: false,
            }
        case "inputNameProduct":
            return {...state,
                creatingProduct: true,
                creatingList: false
            }
        case "outputNameProduct":
            return {...state,
                creatingProduct: false,
                selectedProduct: undefined
            }
        case "inputQuantity":
            return {...state,
                creatingList: false,
                creatingProduct: false
            }
        case "askConfirmation":
            return {...state,
                removeConfirmation: true
            }
        case "closeConfirmation":
            return {...state,
                removeConfirmation: false
            }
        case "showAlertNameProduct":
            return {...state,
                alertNameProduct: true
            }
        case "closeAlertNameProduct":
            return {...state,
                alertNameProduct: false
            }
        case "showAlertRemoveProduct":
            return {...state,
                alertRemoveProduct: true
            }
        case "closeAlertRemoveProduct":
            return {...state,
                alertRemoveProduct: false
            }
        case "showAlertNameGroup":
            return {...state,
                alertNameGroup: true
            }
        case "closeAlertNameGroup":
            return {...state,
                alertNameGroup: false
            }
        case "inputGroup":
            return {...state,
                creatingGroup: true
            }
        case "outputGroup":
            return {...state,
                creatingGroup: false
            }
        case "enterPurchaseMode":
            return {...state,
                purchaseMode: true
            }
        case "exitPurchaseMode":
            return {...state,
                purchaseMode: false
            }
        case "createNewList":
            if (action.listName.length !== 0) {
                return {...state,
                    lists: [...state.lists, {listName: action.listName, products: []}],
                    creatingList: false,
                    selectedList: action.listName
                }
            } else {return state}
        case "removeList":
            return {...state,
                lists: state.lists.filter((list) => list.listName!==action.listName),
                creatingList: false,
                selectedList: undefined,
                removeConfirmation: false
            }
        case "setQuantityUndefined":
            return {...state,
                lists: state.lists.map((list) => {
                    if (list.listName === action.listName) {
                        const updatedProducts = list.products.map((product) => {
                            if (product.productName === action.productName) {
                                return {
                                    ...product,
                                    quantity: undefined,
                                };
                            }
                            return product;
                        });

                        return {
                            ...list,
                            products: updatedProducts,
                        };
                    }
                    return list;
                })
            }
        case "selectList":
            return {...state,
                selectedList: action.listName === state.selectedList ? undefined : action.listName,
                creatingProduct: false,
                creatingList: false,
                selectedProduct: undefined
            }
        case "selectProduct":
            return {...state,
                selectedProduct: action.productName,
                creatingProduct: false,
                creatingList: false,
            }
        case "modifyQuantity":
            return {
            ...state,
            lists: state.lists.map((list) => {
                if (list.listName === action.listName) {
                    const updatedProducts = list.products.map((product) => {
                        if (product.productName === action.productName) {
                            return {
                                ...product,
                                quantity: action.newQuantity,
                            };
                        }
                        return product;
                    });

                    return {
                        ...list,
                        products: updatedProducts,
                    };
                }
                return list;
            }),
                creatingProduct: false,
            }
        case "modifyProductName":
            return {
            ...state,
            lists: state.lists.map((list) => {
                if (list.listName === action.listName) {
                    const updatedProducts = list.products.map((product) => {
                        if (product.productName === action.productName) {
                            return {
                                ...product,
                                productName: action.newProductName,
                            };
                        }
                        return product;
                    });

                    return {
                        ...list,
                        products: updatedProducts,
                    };
                }
                return list;
            }),
                creatingProduct: false
            }
        case "removeProduct":
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.listName === state.selectedList) {
                        const updatedProducts = list.products.filter(
                            (product) => product.productName !== action.productName
                        );


                        return {
                            ...list,
                            products: updatedProducts,
                        };
                    }
                    return list;
                }),
                creatingProduct: false,
                selectedProduct: undefined
            };
        case "addProduct":
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.listName === state.selectedList) {
                        const updatedProducts = [...list.products, { productName: action.productName }];

                        return {
                            ...list,
                            products: updatedProducts,
                        };
                    }
                    return list;
                }),
                creatingProduct: false,
            };
        case "addGroup":
            return {...state,
                groups: [...state.groups, action.groupName],
                creatingGroup: false
            }
        case "changeGroupOrder":
            return {...state,
                groups: action.orderedList
            }
        case "selectGroup":
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.listName === state.selectedList) {
                        const productNames = list.products.map(p => p.productName)
                        const index = productNames.indexOf(action.productName)
                        let updatedProducts = list.products;
                        const product = updatedProducts.splice(index, 1)[0]
                        updatedProducts.push({
                            ...product,
                            group: action.nameGroup,
                        })

                        return {
                            ...list,
                            products: updatedProducts,
                        };
                    }
                    return list;
                }),
            };
        case "expandMenu":
            return {
                ...state,
                expandedMenu: !state.expandedMenu
            }
        case "selectMenuItem":
            return {
                ...state,
                selectedMenuItem: action.menuItem
            }
        case "unSelectGroup":
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.listName === state.selectedList) {
                        const productNames = list.products.map(p => p.productName)
                        const index = productNames.indexOf(action.productName)
                        let updatedProducts = list.products;
                        const product = updatedProducts.splice(index, 1)[0]
                        updatedProducts.push({
                            ...product,
                            group: undefined,
                        })

                        return {
                            ...list,
                            products: updatedProducts,
                        };
                    }
                    return list;
                }),
            };
    }
}