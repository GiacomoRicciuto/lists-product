import {createContext, useReducer} from 'react';
import './App.css';
import {State, Action, initialState, reducer} from "./State";
import NavigationBar from './components/NavigationBar';
import MainContent from './components/MainContent';

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
            <NavigationBar />
            <MainContent />
        </StateContext.Provider>
    );
}

export default App;
