import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import UserContext from '../../../../context/user/userContext';
import TodoContext from '../../../../context/todo/todoContext';
import TopBar from '../../../layouts/partials/TopBar';

import DescModal from './DescModal';
import RemModal from './RemModal';
import DecisionModal from './DecisionModal';

import storage from '../../../helpers/storage'

const Details = (props) => {

    const userContext = useContext(UserContext);
    const todoContext = useContext(TodoContext);
    const [empty, setEmpty] = useState(false);
    const [show, setShow] = useState(false)
    const [showRem, setShowRem] = useState(false);
    const [decide, setDecide] = useState({
        show: false,
        modalTitle: '',
        actionText: '',
        actionType: '',
        data: null,
        dataType: ''
    })

    useEffect(() => {

        todoContext.getUserTodos(storage.getUserID(), 9999);
        configEmpty();
        
    }, [])

    const barLinks = () => {

        return(
            <>
                <div className="ui-group-button">

                    <Link className="btn btn-sm btn-primary onwhite fs-15">Back</Link>

                    <Link to="/dashboard/todo-lists/add-todo" className="btn btn-sm btn-primary onwhite fs-15">Add Todo List</Link>

                </div>
            </>
        )

    }

    const configEmpty = () => {

        setTimeout(() => {
            setEmpty(true)
        }, 3500)

    }

    const toggleShow = (e) => {

        if(e) e.preventDefault();

        setShow(!show);

    }

    const toggleRem = (e) => {

        if(e) e.preventDefault();
        setShowRem(!showRem);

    }

    const toggleDecision = (e, t, data) => {

        if(e) e.preventDefault();

        if(t === 'mark'){

            setDecide({ 

                ...decide,
                show: true,
                modalTitle: 'Mark completed',
                actionText: "mark item completed",
                actionType: 'success',
                data: data,
                dataType: t

            })

        }else if(t === 'delete'){

            setDecide({ 

                ...decide,
                show: true,
                modalTitle: 'Delete item',
                actionText: "delete item",
                actionType: 'delete',
                data: data,
                dataType: t

            })

        }else{
            setDecide({ 

                ...decide,
                show: false,

            })
        }

    }

    return(
        <>
            <TopBar pageTitle="Todo Details" linkComps={barLinks} />

            <section>

                <div className="ui-dashboard-card">

                    <div className="ui-card-header">

                        <h3 className="mrgb0 onmineshaft ui-card-title">Details</h3>

                        <div className="ui-card-header-options">

                            <div className="ui-group-button">

                                <Link className="btn btn-sm onwhite btn-info">Edit Todo</Link>
                                <Link className="btn btn-sm onwhite btn-danger">Delete</Link>
                                
                            </div>

                        </div>
                        
                    </div>


                    <div className="ui-card-body">

                        <div className="mrgt2 mrgb3">

                            <h2 className="fs-18 font-weight-bold">My Todo Title</h2>
                            <div>

                                <span className="fs-16 font-weight-medium">Due Date: </span>
                                <span className="fs-16 ">18/08/21 &nbsp; &nbsp; </span>

                                <span className="fs-16 font-weight-medium">Due Time: </span>
                                <span className="fs-16 ">01:30:00</span>

                            </div>

                        </div>


                        <table className="table custom-table">

                                <thead>

                                    <tr>
                                        <th>Description</th>
                                        <th>Items</th>
                                        <th>Due Date</th>
                                        <th>Due Time</th>
                                        <th>Reminder</th>
                                        <th>Action</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    <tr>
                                        <td className="fs-14"><Link onClick={(e) => toggleShow(e)} className="onblue">Meet Uriel for BTF meeting @3PM on Thursday</Link></td>
                                        <td className="fs-14">3</td>
                                        <td className="fs-14">18/08/21</td>
                                        <td className="fs-14">03:56:00 PM</td>
                                        <td className="fs-14">
                                            <span className="fs-14 onapple">Enabled</span>
                                        </td>
                                        <td>
                                            <div className="ui-group-button">

                                                <Link to='/dashboard/todo-list/edit/076543467898765678' className="onblue"><span className="fe fe-edit fs-16"></span></Link>
                                                <Link onClick={(e) => toggleDecision(e, 'delete', null)} className="onaliz"><span className="fe fe-trash fs-16"></span></Link>
                                                <Link onClick={(e) => toggleDecision(e, 'mark', null)} className="onapple"><span className="fe fe-check-square fs-16"></span></Link>

                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="fs-14"><Link onClick={(e) => toggleShow(e)} className="onblue">Meet Uriel for BTF meeting @3PM on Thursday</Link></td>
                                        <td className="fs-14">8</td>
                                        <td className="fs-14">18/08/21</td>
                                        <td className="fs-14">03:56:00 PM</td>
                                        <td className="fs-14">
                                            <Link onClick={(e) => toggleRem(e)} className="onflamingo">Add Reminder</Link>
                                        </td>
                                        <td>
                                            <div className="ui-group-button">

                                                <Link to='/dashboard/todo-list/edit/09876567899876567' className="onblue"><span className="fe fe-edit fs-16"></span></Link>
                                                <Link onClick={(e) => toggleDecision(e, 'delete', null)} className="onaliz"><span className="fe fe-trash fs-16"></span></Link>
                                                <a style={{opacity: '0.5'}}><span className="fe fe-check-square fs-16 text-muted"></span></a>

                                            </div>
                                        </td>
                                    </tr>

                                </tbody>

                            </table>

                        
                    </div>

                </div>

            </section>

            <DescModal isShow={show} closeModal={toggleShow} modalTitle="Item Description" />
            <RemModal isShow={showRem} closeModal={toggleRem} modalTitle="Add Reminder" />
            <DecisionModal 
            isShow={decide.show} 
            closeModal={toggleDecision} 
            modalTitle={decide.modalTitle} 
            actionType={decide.actionType}
            actionText={decide.actionText}
            data={decide.data}
            dataType={decide.dataType}/>
        </>
    )

}

export default Details;