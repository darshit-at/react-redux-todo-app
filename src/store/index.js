import React from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const intialState = {
    counter: 0,
    showToggle: true,
    showUpdateBtn: false,
    data: [],
    userSeleteEditList: [],
    seleteListId :''
}

const todoSlice = createSlice(
    {
        name: 'todo',
        initialState: intialState,
        reducers: {
        
            AddTodo(state, action) {
                const user_input = {
                    data: action.payload
                }
                state.data = state.data.concat(user_input.data)

            },
            deleteTodo(state, action) {
                state.data = state.data.filter(({ id }) => {
                    return id !== parseInt(action.payload)
                })
            },
            editTodo(state, action) {
                state.showUpdateBtn = true
                state.seleteListId =parseInt(action.payload) 
                state.userSeleteEditList = state.data.find(({ id }) => {
                    return id === parseInt(action.payload)
                });
            },
            updateListValue(state ,action) {
                state.showUpdateBtn = false
              state.data =state.data.map((ele) => {
                if(ele.id===state.seleteListId) {
                    ele.firstName = action.payload.firstName
                    ele.lastName = action.payload.lastName
                    ele.address= action.payload.address
                }
                return ele
              })
            }
        }
    }
)


const store = configureStore({
    reducer: todoSlice.reducer
});

export const todoAction = todoSlice.actions;
export default store