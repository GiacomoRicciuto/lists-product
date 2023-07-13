import {ReactElement} from "react";
import Lists from "./Lists";
import Menu from "./Menu";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Container, Row } from "react-bootstrap";



interface MainContentProps {
}

function MainContent(props: MainContentProps): ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/lists" element={
                    <Container fluid>
                        <Row>
                            <Menu/>
                            <Lists/>
                        </Row>
                    </Container>
                } />
                {/* <Route path="/groups" element={<Groups />} /> */}
                <Route path="/*" element={<Navigate to="/lists" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default MainContent;