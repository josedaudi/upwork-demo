import React, {useState} from 'react'
import {Card, CardBody, Col, Container, Row, Table} from "reactstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import AddNewTaxForm from "./form";


const Taxes = props => {
    const {taxes} = props;
    const [openForm, setOpenForm] = useState(false)
    const [taxToEdit, setTaxToEdit] = useState(null)
    const [taxIndex, setTaxIndex] = useState(null)

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col lg={8} style={{margin: "auto"}}>
                        <Card>
                            <CardBody style={{padding: '5rem'}}>
                                <Row>
                                    <Col lg={9}>
                                        Taxes
                                    </Col>
                                    <Col lg={3}>
                                        <button
                                            type="submit"
                                            onClick={() => setOpenForm(true)}
                                            style={{
                                                backgroundColor: '#F16D36',
                                                color: '#f5f5f5',
                                                borderRadius: 5,
                                                border: '1px solid #F16D36',
                                                padding: '5px 15px',
                                                float: 'right',
                                                height: 45
                                            }}>
                                            <i className={'fa fa-plus-circle'}/>
                                            &nbsp;New Tax
                                        </button>
                                    </Col>
                                </Row>
                                <hr/>
                                {taxes.length > 0 ? (
                                    <Table striped>
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Rate</th>
                                            <th>Items</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {taxes.map((tax, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{tax.name}</td>
                                                <td>{tax.rate}</td>
                                                <td>{tax.applicable_items ? tax.applicable_items.length : 0}</td>
                                                <td>
                                                    <button
                                                        id={index}
                                                        onClick={() => {
                                                            setTaxIndex(index);
                                                            setTaxToEdit(tax);
                                                        }}
                                                        style={{
                                                        backgroundColor: '#F16D36',
                                                        color: '#f5f5f5',
                                                        borderRadius: 5,
                                                        border: '1px solid #F16D36',
                                                        padding: '3px 10px',
                                                        height: 35
                                                    }}>
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                ) : ( <h5 className={'text-center'}>No Taxes at the moment.</h5> )}

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {openForm && <AddNewTaxForm isOpen={openForm} handleOnClose={() => setOpenForm(false)}/> }
                {taxToEdit && <AddNewTaxForm taxToEdit={taxToEdit} taxIndex={taxIndex} isEdit={true} isOpen={true} handleOnClose={() => setTaxToEdit(null)}/>}
            </Container>
        </React.Fragment>
    )
}
Taxes.propTypes = {
    taxes: PropTypes.array,
}

const mapStateToProps = ({taxes: {taxes}}) => ({
    taxes: taxes
});

export default connect(
    mapStateToProps,
    null
)(Taxes)
