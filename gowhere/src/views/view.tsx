import React from 'react';
// import { withRouter } from "react-router-dom";
import { Row, Container, Col } from 'react-bootstrap'

function View() {
    return (
        <Container>
            <Row>
                <Col>
                    <span style={{display : "flex", alignSelf :"flex-start", fontSize:"24px", fontWeight:700}}>GoWhere</span>
                </Col>
            </Row>
        </Container>
    )
}


export default View;