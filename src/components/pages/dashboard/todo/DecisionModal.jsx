import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Modal } from 'react-bootstrap';

const DecisionModal =  ({ isShow, closeModal, modalTitle, actionText, actionType, data, dataType }) => {

    useEffect(() => {

    }, [])

    return(
        <>

            <Modal
                show={isShow}
                onHide={closeModal}
                size='sm'
                fade={false}
                keyboard={false}
                centered
                className="custom-modal rem-modal"
            >

                <Modal.Body>

                    <div className="modal-box">

                        <div className="modal-sidebar"></div>

                        <div className="modal-content-box">

                            <div className="modal-header-box">

                                <h2 className="mrgb0 onmineshaft font-weight-medium fs-18">{ modalTitle }</h2>

                                <Link onClick={closeModal} className="ml-auto" style={{ position: 'relative', top: '3px' }}><span className="fe fe-x fs-14"></span></Link>

                            </div>

                            <div className="modal-content-area">

                                <p className="fs-15 font-weight-bold ui-text-center mrgt1">
                                    Are you sure you want to { actionText }?
                                </p>

                                <div className="form-group mrgt2">

                                    <div className="row">

                                        <div className="col-md-6">
                                            <Link className="btn bg-silver btn-block fs-14 onmineshaft">Cancel</Link>
                                        </div>

                                        <div className="col-md-6">
                                            <Link className={`btn btn-block fs-14 onwhite ${actionType === 'success' ? 'bg-apple' : 'btn-danger'}`}>Yes</Link>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </Modal.Body>

            </Modal>

        </>
    )


}

export default DecisionModal