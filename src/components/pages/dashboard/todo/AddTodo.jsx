import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import TopBar from '../../../layouts/partials/TopBar'

const AddTodo = () => {

    const [showAdd, setShowAdd] = useState(false);
    const [showRem, setshowRem] = useState(false);
    const [duplicate, setDuplicate] = useState([]);
    const [count, setCount] = useState(0)

    useEffect(() => {
        
    }, [])

    const history = useHistory();

    const goBack = (e) => {

        if (e) e.preventDefault();
        history.goBack();

    }

    const barLinks = () => {
        return(
            <>
                <div className="ui-group-button">
                    <Link
                    onClick={e => goBack()} 
                    className="btn btn-sm btn-primary onwhite fs-15">
                        Back
                    </Link>
                </div>
            </>
        )
    }

    const toggleAdd = (e) => {
        if (e) e.preventDefault();
        
        setShowAdd(true);
        setDuplicate(duplicate.concat([count + 1]));
        setCount(count + 1);
    }
    
    const toggleRem = (e, index) => {
        if (e) e.preventDefault();
        
        const currItems = duplicate;
        currItems.splice(index, 1);
        setDuplicate(currItems);
        setCount(count - 1);

        if (currItems.length === 0) {
            setShowAdd(false);
            setCount(0);
            setDuplicate([]);
        }
    }
    
    const duplicateItem = (e) => {
        if (e) e.preventDefault();

        setDuplicate(duplicate.concat([count + 1]));
        setCount(count + 1);
    }

    return (
        <>

            <TopBar pageTitle='Add Todos' linkComps={barLinks} />

            <section>

                <div className="ui-dashboard-card ui-wrapper-small">

                    <div className="ui-card-body">

                        <div className="row">

                            <div className="col-md-6 mx-auto">

                                <div className="ui-form-box">

                                    <form onSubmit={e => e.preventDefault()}>

                                        <div className="form-group">
                                            <label htmlFor="title" className="fs-14">List Title</label>
                                            <input 
                                            type="text" 
                                            className="form-control fs-15"
                                            placeholder="Enter a title"
                                            />
                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="title" className="fs-14">Due Date</label>
                                                    <input 
                                                    type="date" 
                                                    className="form-control fs-15"
                                                    />
                                                </div>

                                            </div>

                                            <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="title" className="fs-14">Due Time</label>
                                                    <input 
                                                    type="time" 
                                                    className="form-control fs-15"
                                                    placeholder="Enter a title"
                                                    />
                                                </div>

                                            </div>

                                        </div>

                                        <div className="ui-line bg-silverlight"></div>


                                        <div className="d-flex align-item-center">
                                            <h3 className="fs-14">Todo Items ({count})</h3>
                                            {
                                                !showAdd &&
                                                <Link onClick={e => {toggleAdd(e)}} className="ml-auto onblue fs-15">Add Item</Link>
                                            }
                                        </div>

                                        {
                                            showAdd &&
                                            <>

                                                <div className="todo-items">

                                                    {
                                                        duplicate.map((item, i) => 

                                                            <>

                                                                <div className="td-item">

                                                                    <div className="row">

                                                                        <div className="col-md-6">

                                                                            <div className="form-group">
                                                                            <label htmlFor="title" className="fs-14">Item title</label>
                                                                                <input 
                                                                                type="text" 
                                                                                className="form-control fs-15"
                                                                                placeholder="Enter a title"
                                                                                />
                                                                            </div>

                                                                        </div>
                                                                        
                                                                        <div className="col-md-6">

                                                                            <div className="form-group">
                                                                                <label htmlFor="title" className="fs-14">Item description</label>
                                                                                <input 
                                                                                type="text" 
                                                                                className="form-control fs-15"
                                                                                placeholder="Enter a description"
                                                                                />
                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                    <div className="row">

                                                                        <div className="col-md-6">

                                                                            <div className="form-group">
                                                                                <label htmlFor="title" className="fs-14">Item due date</label>
                                                                                <input 
                                                                                type="date" 
                                                                                className="form-control fs-15"
                                                                                />
                                                                            </div>

                                                                        </div>

                                                                        <div className="col-md-6">

                                                                            <div className="form-group">
                                                                                <label htmlFor="title" className="fs-14">Item due time</label>
                                                                                <input 
                                                                                type="time" 
                                                                                className="form-control fs-15"
                                                                                placeholder="Enter a title"
                                                                                />
                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                    <div className="d-flex align-item-center">
                                                                        <Link onClick={e => toggleRem(e,i)} className="onaliz fs-13">Remove</Link>&nbsp;&nbsp;
                                                                        <Link className="onapple fs-13">Add Reminder</Link>
                                                                    </div>

                                                                </div>
                                                            
                                                            </>
                                                        )
                                                    }


                                                    <div className="d-flex align-item-center">

                                                        <div className="ml-auto">
                                                            
                                                            <Link onClick={e => duplicateItem(e)} className="onblue fs-15">Add Item</Link>
                                                            
                                                        </div>

                                                    </div>

                                                </div>

                                            </>
                                        }

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
            
        </>
    )
}

export default AddTodo
