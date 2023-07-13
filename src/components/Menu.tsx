import { ReactElement, useContext, useState } from 'react';
import { Collapse, Col } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import {StateContext} from "../App";

interface MenuProps {
}

interface MenuItemsProps {
    className?: string
}

function Menu(props: MenuProps): ReactElement {
    const {state, dispatch} = useContext(StateContext)

    return (
        <>
            <Collapse in={state.expandedMenu}>
                <Col sm="4" className="bg-dark d-sm-none pb-3">
                    <MenuItemList
                        className="below-nav"
                    />
                </Col>
            </Collapse>

            <Col sm="4" className="d-none d-sm-block below-nav vheight-100 bg-light">
                <MenuItemList/>
            </Col>
        </>
    );
}

function MenuItemList(props: MenuItemsProps): ReactElement {
    const {state, dispatch} = useContext(StateContext)

    return (
        <ListGroup
            activeKey={state.selectedMenuItem.code}
            className={props.className || ''}
        >
            {
                state.menu.map(m =>
                    <Link to={{ pathname: m.link }} key={m.code} style={{ textDecoration: 'none' }}>
                        <ListGroup.Item
                            key={m.code}
                            action
                            eventKey={m.code} 
                            className="d-flex justify-content-around">
                            {m.name}
                        </ListGroup.Item>
                    </Link>
                )
            }
        </ListGroup>
    );
}


export default Menu;