// import React, {useEffect, useState, useContext} from 'react';
// import { Link, useHistory, useParams } from 'react-router-dom';

// import UserContext from '../../../../context/user/userContext';
// import TodoContext from '../../../../context/todo/todoContext';
// import TopBar from '../../../layouts/partials/TopBar';

// import storage from '../../../helpers/storage';

// const Todo = (props) => {

//     const userContext = useContext(UserContext)
//     const todoContext = useContext(TodoContext)

//     useEffect(() => {

//         todoContext.getUserTodos(storage.getUserID(), 9999);
        
//     }, [])

//     const barLinks = () => {
//         return(
//             <>
//                 <div className="ui-group-button">
//                     <Link className="btn btn-sm btn-primary onwhite fs-15">Back</Link>
//                     <Link className="btn btn-sm btn-primary onwhite fs-15">Add Todo List</Link>                
//                 </div>
//             </>
//         )
//     }

//     return(
//         <>
//             <TopBar pageTitle="Todo List" linkComps={barLinks} />

//             <section>

//                 <div className="ui-dashboard-card">

//                     <div className="ui-card-header">

//                         <h3 className="mrgb0 omineshaft ui-card-title">Todo Lists</h3>

//                     </div>

//                     <div className="ui-card-body">

//                         {
//                             !todoContext.loading && todoContext.todos.length <= 0 &&

//                             <>
//                                 <div className="empty-state">

//                                     <div className="fs-14 omineshaft mrgb1">
//                                         You have no todo lists. Add a todo with the button below
//                                     </div>

//                                     <Link className="btn btn-sm btn-primary onwhite fs-15">Add Todo List</Link>

//                                 </div>
//                             </>
//                         }

//                         {
//                             !todoContext.loading && todoContext.todos.length > 0 &&
//                             <>
                                  
//                             <table className="table table-striped">

//                                 <thead>

//                                     <tr>         
//                                         <th>Created On</th>
//                                         <th>Title</th>
//                                         <th>Status</th>
//                                         <th>Due Date</th>
//                                         <th>Due Time</th>
//                                         <th>Items</th>
                                        

//                                     </tr>

//                                 </thead>

//                                 <tbody>



//                                 </tbody>

//                                 </table>

//                             </>
//                         }

//                     </div>

//                 </div>

//             </section>
//         </>
//     )

// }

// export default Todo;


import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import UserContext from '../../../../context/user/userContext'
import TodoContext from '../../../../context/todo/todoContext'

import storage from '../../../helpers/storage'

import TopBar from '../../../layouts/partials/TopBar'

const Todo = (props) => {
    const userContext = useContext(UserContext);
    const todoContext = useContext(TodoContext);

    const [empty, setEmpty] = useState(false);

    useEffect(() => {

        todoContext.getUserTodos(storage.getUserID(), 9999);
        cofigEmpty();

    }, []);

    const barLinks = () => {
        return(
            <>
            <div className="ui-group-button">
                <Link className="btn btn-sm btn-primary onwhite fs-15">
                    Back
                </Link>
                <Link to="/dashboard/todo-list/add-todo" className="btn btn-sm btn-primary onwhite fs-15">
                   Add todo lists
                </Link>
            </div>
            </>
        )
    }

    const cofigEmpty = () => {
        setTimeout(() => {
            setEmpty(true)
        }, 3050);
    }

    return (
        <>

            <TopBar pageTitle='Todo lists' linkComps={barLinks} />

            <section>

                <div className="ui-dashboard-card">

                    <div className="ui-card-header">

                        <h3 className="mrgb0 onmineshaft ui-card-title">Todo list</h3>

                    </div>

                    <div className="ui-card-body">

                        {
                            todoContext.loading  &&
                            <>

                                {
                                    empty &&
                                    <>

                                        <div className="empty-state">

                                            <div className="fs-14 onmineshaft mrgb2">
                                                You have no todo list. Add todo list with the button below
                                            </div>

                                            <Link to="/dashboard/todo-list/add-todo" className="btn btn-sm btn-primary onwhite fs-15">
                                                Add todo lists
                                            </Link>

                                        </div>

                                    </>
                                }
                                {
                                    !empty &&
                                    <>

                                        <div className="empty-state">
                                            <img src="../../../images/assets/spinner2.svg" alt="spinner-loading" width="35px" />
                                        </div>

                                    </>
                                }
                                
                            </>
                        }

                        {
                            !todoContext.loading  && todoContext.todos.length <= 0 &&
                            <>

                                <div className="empty-state">

                                    <div className="fs-14 onmineshaft mrgb2">
                                        You have no todo list. Add todo list with the button below
                                    </div>

                                    <Link to="/dashboard/todo-list/add-todo" className="btn btn-sm btn-primary onwhite fs-15">
                                        Add todo lists
                                    </Link>

                                </div>
                                
                            </>
                        }

                        {
                            !todoContext.loading && todoContext.todos.length > 0 &&
                            <>

                                <table className="table table-stripe">

                                    <thead>
                                        <tr>
                                            <th>Created On</th>
                                            <th>Title</th>
                                            <th>Status</th>
                                            <th>Due Date</th>
                                            <th>Due Time</th>
                                            <th>Items</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                    </tbody>

                                </table>

                            </>
                        }

                        

                    </div>

                </div>

            </section>
            
        </>
    )
}

export default Todo

