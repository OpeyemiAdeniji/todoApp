import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

const RemModal = ({ isShow, closeModal }) => {

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
            className='custom-modal'
            >

                <Modal.Body>

                    

                </Modal.Body>

            </Modal>
            
        </>
    )
}

export default RemModal;