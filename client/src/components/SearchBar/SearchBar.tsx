import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const SearchBar = () => {
  return (
    <Form>
      <Form.Group>
        <Form.Row>
          <Col>
            <Form.Control type="text" placeholder="Search your books..." />
          </Col>

          <Col>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col>
        </Form.Row>
      </Form.Group>
    </Form>
  )
}

export default SearchBar
