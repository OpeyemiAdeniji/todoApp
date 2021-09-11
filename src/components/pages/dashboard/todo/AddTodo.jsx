import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'


import TopBar from '../../../layouts/partials/TopBar'
import RemModal from "./RemModal";
import Alert from "../../../layouts/partials/Alert";
import Axios from "axios";
import storage from "../../../helpers/storage";

const AddTodo = () => {

    const [showAdd, setShowAdd] = useState(false);
    const [showRem, setshowRem] = useState(false);
    const [duplicate, setDuplicate] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const [todoData, setTodoData] = useState({
        title: '',
        dueDate: '',
        duetime: ''
    });


    const [itemsArray, setItems] = useState([])

    const [reminder, setReminder] = useState({
        dueDate: '',
        dueTime: ''
    })

    const [alertData, setAlertData] = useState({
        show: false,
        type: '',
        message: ''
    })


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

    const showRemModal = (e) => {
        if(e) e.preventDefault();
        setshowRem(!showRem);
    }
    
    const duplicateItem = (e) => {
        if (e) e.preventDefault();

        setDuplicate(duplicate.concat([count + 1]));
        setCount(count + 1);
    }

    const submit = async (e) => {
        if(e) e.preventDefault();

        if(!todoData.title && !todoData.dueDate && !todoData.duetime){
            setAlertData({ ...alertData, show:true, type: 'danger', message: 'All fields are required'});
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);
        }else if(!todoData.title){
            setAlertData({ ...alertData, show:true, type: 'danger', message: 'Enter a title for todo list'});
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);
        }else if(!todoData.dueDate){
            setAlertData({ ...alertData, show:true, type: 'danger', message: 'Choose a due date for todo list'});
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);
        }else if(!todoData.dueTime){
            setAlertData({ ...alertData, show:true, type: 'danger', message: 'Choose a due time for todo list'});
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);
        }else{
            if(duplicate.length <= 0 ){
                setAlertData({ ...alertData, show:true, type: 'danger', message: 'You must have at least an item for this todo list'});
                setTimeout(() => {
                    setAlertData({ ...alertData, show: false })
                }, 5000);
            }else{

                // save the items
                await pushItems();

                const check = await checkItems();

                if(check === true){
                    setLoading(true);

                    await Axios.post(`${process.env.REACT_APP_TODO_URL}/todos`, { ...todoData }, storage.getConfigWithBearer())
                    .then(async (resp) => {
                        if(resp.data.status === 200 && resp.data.error === false){
                            await createItems(resp.data.data._id);
                        }
                    })
                }

            }
        }
    }

    const pushItems = () => {

        for(let i = 0; i < duplicate.length; i++){

            const tItem = document.getElementById(`item-title-${i}`).value;
            const tDesc = document.getElementById(`item-desc-${i}`).value;
            const tDate = document.getElementById(`item-date-${i}`).value;
            const tTime = document.getElementById(`item-time-${i}`).value;

            const data = [
                {
                    title: tItem,
                    description: tDesc,
                    dueDate: tDate,
                    dueTime: tTime
                }
            ]

            setItems(itemsArray.concat(data));
            console.log(data)

        }
    }

    const checkItems = () => {
        for(let j = 0; j < itemsArray.length; j++){

            if(!itemsArray[j].title && !itemsArray[j].description && !itemsArray[j].dueDate && !itemsArray[j].dueTime){
                const alertBox = document.getElementById(`item-alert-${j}`);
                alertBox.innerHTML = 'All Item fields are required';
                return false;

            }else if(!itemsArray[j].title){
                const alertBox = document.getElementById(`item-alert-${j}`);
                alertBox.innerHTML = 'Enter item title';
                return false;

            }else if(!itemsArray[j].description){
                const alertBox = document.getElementById(`item-alert-${j}`);
                alertBox.innerHTML = 'Enter item description';
                return false;

            }else if(!itemsArray[j].dueDate){
                const alertBox = document.getElementById(`item-alert-${j}`);
                alertBox.innerHTML = 'Enter item due date';
                return false;

            }else if(!itemsArray[j].dueTime){
                const alertBox = document.getElementById(`item-alert-${j}`);
                alertBox.innerHTML = 'Enter item due time';
                return false;

            }else{
                return true;
            }
        }
    }

    const createItems = async (todoId) => {

        for(let j = 0; j < itemsArray.length; j++){

    
        }
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
                                    
                                    <Alert show={alertData.show} type={alertData.type} message={alertData.message} />

                                    <form onSubmit={e => e.preventDefault()}>

                                        <div className="form-group">
                                            <label htmlFor="title" className="fs-14">List Title</label>
                                            <input 
                                            defaultValue={(e) => setTodoData({ ...todoData, title: e.target.value})}
                                            onChange={(e) => setTodoData({ ...todoData, title: e.target.value})}
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
                                                    defaultValue={(e) => setTodoData({ ...todoData, dueDate: e.target.value})}
                                                    onChange={(e) => setTodoData({ ...todoData, dueDate: e.target.value})}
                                                    type="date" 
                                                    className="form-control fs-15"
                                                    />
                                                </div>

                                            </div>

                                            <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="title" className="fs-14">Due Time</label>
                                                    <input 
                                                    defaultValue={(e) => setTodoData({ ...todoData, dueTime: e.target.value})}
                                                    onChange={(e) => setTodoData({ ...todoData, dueTime: e.target.value})}
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

                                                                    <div id={`item-alert-${i}`} className="onaliz"></div>

                                                                    <div className="row">

                                                                        <div className="col-md-6">

                                                                            <div className="form-group">
                                                                            <label htmlFor="title" className="fs-14">Item title</label>
                                                                                <input
                                                                                id={`item-title-${i}`}  
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
                                                                                id={`item-desc-${i}`}
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
                                                                                id={`item-date-${i}`}
                                                                                type="date" 
                                                                                className="form-control fs-15"
                                                                                />
                                                                            </div>

                                                                        </div>

                                                                        <div className="col-md-6">

                                                                            <div className="form-group">
                                                                                <label htmlFor="title" className="fs-14">Item due time</label>
                                                                                <input 
                                                                                id={`item-time-${i}`}
                                                                                type="time" 
                                                                                className="form-control fs-15"
                                                                                placeholder="Enter a title"
                                                                                />
                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                    <div className="d-flex align-item-center">
                                                                        <Link onClick={e => toggleRem(e,i)} className="onaliz fs-13">Remove</Link>&nbsp;&nbsp;
                                                                        <Link onClick={e => showRemModal(e)} className="onapple fs-13">Add Reminder</Link>
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

                                        <div className="form-group mrgt3">
                                            <Link onClick={(e) => submit(e)} className="btn btn-primary btn-lg onwhite mrgb3">Save Details</Link>
                                        </div>

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <RemModal isShow={showRem} closeModal={showRemModal} modalTitle="Add Reminder" />
            
        </>
    )
}

export default AddTodo
