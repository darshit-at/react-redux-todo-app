import React, { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import {  todoAction } from '../store/index';
import './DisplayData.css';

const DisplayData = () => {
    const userInputData = useSelector((state) => state.data);
    const dispatch = useDispatch();

    const deleteTodoHandler = (e) => {
      dispatch(todoAction.deleteTodo(e.target.id))
    }
  
    const editTodoHandler = (e) => {
        dispatch(todoAction.editTodo(e.target.id))
    };

    const itemList = userInputData.map(({ id, firstName, lastName, address }, index) => {
        return (
        <tr key={`${index}`}>
  
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{address}</td>
                <td>
                    <button type='button' id={id} onClick ={deleteTodoHandler}>
                    Delete
                </button>
            </td><td>
                    <button type='button' id={id} onClick ={editTodoHandler}>Edit</button>
                </td>
            </tr>
        )
    })

    return (
        <div className="table-wrapper">
         <table className="fl-table">
            <thead>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Address</th>
                <th>Delete list</th>
                <th>Edit list</th>
            </tr>
            </thead>
            <tbody>
                {itemList.length===0 ? <tr><td>Nothing to show</td></tr> : itemList}
            </tbody>    
        </table>
    </div>



    )
}
export default DisplayData