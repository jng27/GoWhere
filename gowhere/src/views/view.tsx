import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

function View() {
    return (
        <Container>
            <Row>
                <Col>
                    <span
                        style={{
                            display: 'flex',
                            alignSelf: 'flex-start',
                            fontSize: '24px',
                            fontWeight: 700,
                        }}
                    >
                        GoWhere
                    </span>
                </Col>
            </Row>
        </Container>
    )
}

export default View
