import React, {createContext, useReducer} from 'react';
import './App.css';
import {State, Action, initialState, reducer} from "./State";
import Lists from "./Lists";

type AppContext = {
    state: State,
    dispatch: (_:Action)=>void
}

export const StateContext = createContext<AppContext>(
    {
        state: initialState,
        dispatch: ()=>{}
    }
)

function App() {
    const [state,dispatch] = useReducer(reducer, initialState)
    return (
        <StateContext.Provider value={{state,dispatch}}>
            <h1>Gestore liste</h1>
            <Lists/>
        </StateContext.Provider>
    );
}

export default App;
