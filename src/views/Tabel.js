import React from 'react';
import { Row, Col, Table, CardBody, CardHeader, Card } from 'reactstrap';
const Tabel = () => {
    return (
        <div className="animated fadeIn">
            <Row>
                <Col>
                    <Card>
                        <CardHeader>Card Header</CardHeader>
                        <CardBody>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>A1</th>
                                        <th>A2</th>
                                        <th>A3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>B1</th>
                                        <th>B2</th>
                                        <th>B3</th>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Tabel;