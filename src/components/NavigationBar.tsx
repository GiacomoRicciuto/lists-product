import { 
    Navbar, 
} from 'react-bootstrap';
import React, {ReactElement, useContext} from "react";
import {StateContext} from "../App";
import {expandMenu} from "../State";

interface NavigationBarProps {
}

function NavigationBar(props: NavigationBarProps): ReactElement {
    const {state, dispatch} = useContext(StateContext);

    return (
        <Navbar bg="dark" expand="sm" variant="dark" fixed="top">
            <Navbar.Toggle className="btn btn-dark" onClick={() => dispatch(expandMenu())}/>
            <Navbar.Brand className='m-auto'>
                Gestore {state.selectedMenuItem.name}
            </Navbar.Brand>
        </Navbar>
    );
}

export default NavigationBar;