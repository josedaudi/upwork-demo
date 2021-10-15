import React, {useEffect, useState} from "react"
import {connect} from "react-redux";
import {addNewTaxAction, editTaxAction} from "../../../store/taxes/actions";
import PropTypes from 'prop-types'
import {Col, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import {FieldArray, Formik} from "formik";
import _ from "lodash";
import {items} from "../../dummy/data";


const AddNewTaxForm = (props) => {
    const {isOpen, handleOnClose, isEdit, taxToEdit, taxIndex, onAddNewTax, onEditTax} = props
    const groupedItems = _.groupBy(items, 'category.name')
    const itemsKeys = Object.keys(groupedItems)

    return (
        <Modal
            isOpen={isOpen}
            role="dialog"
            size="lg"
            autoFocus={true}
            toggle={handleOnClose}>
            <div className="modal-content">
                <ModalHeader toggle={handleOnClose} style={{paddingLeft: '3rem', paddingRight: '3rem'}}>
                    {isEdit ? `Edit` : 'Add'} Tax - {taxToEdit && taxToEdit.name}
                </ModalHeader>
                <ModalBody style={{padding: 20}}>
                    <Formik
                        initialValues={taxToEdit && isEdit ? {...taxToEdit} : {
                            name:'',
                            rate: 0,
                            search: '',
                            select_all: false,
                            applicable_items: [],
                            applied_to: ''

                        }}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                console.log('Values', values)
                                console.log(JSON.stringify(values, null, 2));
                                isEdit ? onEditTax(values, taxIndex) : onAddNewTax(values)
                                actions.setSubmitting(false);
                                handleOnClose()
                            }, 1000);
                        }}>

                        {props => (
                            <form onSubmit={props.handleSubmit} className={'form-tax'}>
                                <Row>
                                    <Col lg={7}>
                                        <input
                                            type="text"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.name}
                                            placeholder={'Name'}
                                            name="name"
                                        />
                                    </Col>
                                    <Col lg={4}>
                                        <input
                                            type="number"
                                            onChange={(e) => props.setFieldValue('rate', e.target.value / 100)}
                                            onBlur={props.handleBlur}
                                            value={props.values.rate}
                                            placeholder={'Rate'}
                                            name="rate"
                                        />
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 20}}>
                                    <Col lg={12} className={'round'}>
                                        <input
                                            type="checkbox"
                                            name="applied_to"
                                            id={'all'}
                                            onChange={(e) => {
                                                props.setFieldValue('applied_to', 'all');
                                                e.target.checked ? props.setFieldValue('applicable_items', items.map(item => item.id)) : props.setFieldValue('applicable_items', [])
                                            }}
                                            checked={props.values.applied_to === 'all'}/>
                                        <label htmlFor={'all'}/>
                                        <span>Apply to all items.</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} className={'round'}>
                                        <input
                                            type="checkbox"
                                            name="applied_to"
                                            id={'some'}
                                            onChange={(e) => {
                                                props.setFieldValue('applied_to', 'some')
                                                e.target.checked ? props.setFieldValue('applicable_items', items.map(item => item.id)) : props.setFieldValue('applicable_items', [])
                                            }}
                                            checked={props.values.applied_to === 'some'}/>
                                        <label htmlFor={'some'}/>
                                        <span>Apply to specific items.</span>
                                    </Col>
                                </Row>
                                <hr/>

                                <Row style={{marginBottom: 20}}>
                                    <Col lg={12} className={'input-icons'}>
                                        <i className="fa fa-search icon"/>
                                        <input type="text" name={'search'}
                                               style={{width: '40% !important'}}
                                               placeholder={'Search items'}
                                               className={'input-field'}
                                               defaultValue={props.values.search}/>
                                    </Col>
                                </Row>
                                {itemsKeys.map((key, index) => {
                                    props.initialValues[`${key}_${index}`] = false
                                    return (
                                        <Row>
                                            <label key={index}>
                                                <input
                                                    name={`${key}_${index}`}
                                                    type={'checkbox'}
                                                    value={`'${key}'`}
                                                    checked={props.values[`${key}_${index}`]}
                                                    onChange={e => {
                                                        props.setFieldValue(`${key}_${index}`, !props.values[`${key}_${index}`])
                                                        props.setFieldValue('applied_to', 'some')
                                                        e.target.checked ? props.setFieldValue('applicable_items', groupedItems[key].map(item => item.id)) : props.setFieldValue('applicable_items', [])
                                                        console.log(props.values)
                                                    }}/>
                                                &nbsp; <span>{key}</span>
                                            </label>

                                            <FieldArray
                                                name={'applicable_items'}
                                                render={arrayHelpers => (
                                                    <React.Fragment>
                                                        {groupedItems[key].map((item, _) => (
                                                            <label key={item.id} style={{marginLeft: 20}}>
                                                                <input
                                                                    name={'applicable_items'}
                                                                    type={'checkbox'}
                                                                    value={item.id}
                                                                    checked={props.values.applicable_items.includes(item.id)}
                                                                    onChange={e => {
                                                                        props.setFieldValue('applied_to', 'some')
                                                                        e.target.checked ? arrayHelpers.push(item.id) : arrayHelpers.remove(props.values.applicable_items.indexOf(item.id))
                                                                    }}/>
                                                                &nbsp; <span>{item.name}</span>
                                                            </label>
                                                        ))}
                                                    </React.Fragment>
                                                )}/>
                                        </Row>
                                    )
                                })}
                                {props.errors && Object.keys(props.errors).map((key, index) => (
                                    <div id="feedback" key={index}>
                                        {props.errors[key]}
                                    </div>
                                ))}
                                <Row style={{marginTop: 100}}>
                                    <Col lg={12}>
                                        <hr/>
                                        <button
                                            type="submit"
                                            style={{
                                                backgroundColor: '#F16D36',
                                                color: '#f5f5f5',
                                                borderRadius: 5,
                                                border: '1px solid #F16D36',
                                                padding: '5px 15px',
                                                float: 'right',
                                                height: 45
                                            }}>Apply tax to ({props.values.applicable_items.length}) item(s)
                                        </button>
                                    </Col>
                                </Row>
                            </form>
                        )}
                    </Formik>
                </ModalBody>
            </div>
        </Modal>
    )
}

AddNewTaxForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
    taxToEdit: PropTypes.any,
    handleOnClose: PropTypes.func.isRequired,
    onAddNewTax: PropTypes.func,
    onEditTax: PropTypes.func,
    taxIndex: PropTypes.number
}

const mapStateToProps = ({taxes: {tax}}) => ({
    tax: tax
});

const mapDispatchToProps = dispatch => ({
    onAddNewTax: (tax) => dispatch(addNewTaxAction(tax)),
    onEditTax: (tax) => dispatch(editTaxAction(tax)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewTaxForm)
