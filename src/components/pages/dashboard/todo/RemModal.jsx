import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

const RemModal = ({ isShow, closeModal, modalTitle }) => {

    useEffect(() => {
        
    }, [])

    return (
        <>

            <Modal
            show={isShow}
            onHide={closeModal}
            size='sm'
            fade={false}
            keyboard={false}
            centered
            className='custom-modal rem-modal'
            >

                <Modal.Body>

                    <div className="modal-box">

                        <div className="modal-sidebar"></div>
                        
                        <div className="modal-content-box">

                            <div className="modal-header-box">

                                <h2 className="mrgb0 omineshaft font-weight-medium fs-18">{ modalTitle }</h2>

                                <Link onClick={closeModal} className="ml-auto" style={{ position: 'relative', top: '3px' }}><span className="fe fe-x fs-14"></span></Link>

                            </div>

                            <div className="modal-content-area">

                                <div className="">

                                    <form onSubmit={(e) => e.preventDefault()}>

                                        <div className="form-group">

                                            <label htmlFor="title" className="fs-14">Due Date</label>
                                            <input type="date" className="form-control fs-15"/>

                                        </div>
                                        
                                        <div className="form-group">

                                            <label htmlFor="title" className="fs-14">Due Time</label>
                                            <input type="time" className="form-control fs-15" placeholder="Enter a title"/>

                                        </div>

                                        <div className="form-group">

                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="isEnabled" />
                                                <label htmlFor="" className="custom-control-label" htmlFor="isEnabled"><span>Enable Reminder</span></label>
                                            </div>

                                        </div>

                                        <div className="form-group">
                                            <Link className="btn btn-primary btn-block fs-14 onwhite">Add Reminder</Link>
                                        </div>

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </Modal.Body>

            </Modal>
            
        </>
    )
}

export default RemModal;