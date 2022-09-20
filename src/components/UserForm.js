import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  todoAction } from '../store/index';
import './Userform.css'
let id = 1
const UserForm = () => {
    const showUpdateBtn = useSelector((state) => state.showUpdateBtn);
    const userSeleteEditList = useSelector((state) => state.userSeleteEditList);

    const userFirstName = useRef('');
    const userLastName = useRef('');
    const userAddress = useRef('');
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(userSeleteEditList)

        if(Object.keys(userSeleteEditList).length > 0) {
          
            userFirstName.current.value = userSeleteEditList.firstName;
            userLastName.current.value = userSeleteEditList.lastName;
            userAddress.current.value =  userSeleteEditList.address;
        }
    }, [userSeleteEditList]);

    const updateCurrentValue = () => {
      
        const userUpdateData = {
            firstName: userFirstName.current.value,
            lastName: userLastName.current.value,
            address: userAddress.current.value,
        }
        dispatch(todoAction.updateListValue(userUpdateData));
        userFirstName.current.value = '';
        userLastName.current.value = '';
        userAddress.current.value = '';
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(
            isNaN(userFirstName.current.value) && 
            isNaN(userLastName.current.value) && 
            isNaN( userAddress.current.value)) 
        {
            const userData = {
                id: id++,
                firstName: userFirstName.current.value,
                lastName: userLastName.current.value,
                address: userAddress.current.value,
            }
            dispatch(todoAction.AddTodo(userData))
            userFirstName.current.value = '';
            userLastName.current.value = '';
            userAddress.current.value = '';
      }
      else {
        alert('input must be string')
      }
};

    return (
   
         

            <div className='form-control'>
              <h2>Fill your details</h2>
              <form onSubmit={handleSubmit}>
             <div>
                <input
                    type='text'
                    name='firstName'
                    defaultValue={userFirstName.current.value}
                    placeholder='first Name'
                    required
                    ref={userFirstName} />
            </div>

            <div>
                <input
                    type='text'
                    name='lastName'
                    defaultValue={userLastName.current.value}
                    placeholder='last Name'
                    required
                    ref={userLastName} />
            </div>

            <div>
                <input
                    type='text'
                    name='useraddress'
                    defaultValue={userAddress.current.value}
                    placeholder='address'
                    required
                    ref={userAddress} />
            </div>

            <div>
                {!showUpdateBtn && <button type='submit' >Add</button>}
                {showUpdateBtn && <button type='button' value='update' onClick={updateCurrentValue}>update</button>}

            </div>  
        </form>
            </div>
         

     
      
    )
};

export default UserForm;