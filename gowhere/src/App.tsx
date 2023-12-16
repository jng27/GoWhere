import React from "react";
import "./App.css";
import { Col, Row } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import view from './views/view'
// require("dotenv").config();

function App() {
  return (
    <div className="App">
      <Router>
        <Container fluid={true}>
          <Row className="contentContainer">
            <Col>
              <Routes >
                <Route path="/" Component={view} />
                <Route Component={() => (<h2 style={{ height: "100vh" }}>Not Found</h2>)} />
              </Routes >
            </Col>
          </Row>
        </Container>
      </Router>
      </div>
  );
}
export default App;