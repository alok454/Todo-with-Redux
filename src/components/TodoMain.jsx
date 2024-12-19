import React, { useRef, useState } from "react";
import {v7 as uuid} from 'uuid'
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import { add, removeAll, setInput, update } from "../redux/features/taskSlice";


const TodoMain = () => {

  const {tasks, isUpdate, input, edit} = useSelector((state)=>state.todo)
  const dispatch = useDispatch();

  const inputRef = useRef();

  if(edit!==null) {
    inputRef.current.focus();
  }


  const handleAdd = () => {
    if(input.trim()) {
      const newTask = {
        id: uuid(),
        completed: false,
        title: input,
      }
      dispatch(add(newTask))
    } else {
      alert("Enter the task")
    }
  }
  const handleUpdate = () => {
    if(input.trim()) {
      dispatch(update());
    } else {
      alert("Enter the task")
    }
  }

  return (
    <>
      <section className="min-h-full w-full sm:w-[600px] flex flex-col items-center gap-5 pt-4">
        <div className="w-full text-4xl font-extrabold sm:font-semibold sm:text-5xl text-center">
          <h1>Todo</h1>
        </div>

        <div className="w-[95%] flex flex-col sm:flex-row justify-around gap-x-2 gap-y-3">
          <input
            type="text"
            className="w-[98%] sm:w-[80%] h-[35px] rounded text-black pl-2 text-xl"
            ref={inputRef}
            value={input}
            onChange={(e)=>dispatch(setInput(e.target.value))}
            placeholder="Enter a task"
          />
          {
            isUpdate ? 
            (<button
              className="bg-[blue] hover:bg-[#2727a8] text-xl h-[35px] w-[98%] sm:w-[15%] px-0 sm:px-2 rounded "
              onClick={handleUpdate}
            >Update</button>) :
            (<button
              className="bg-[#1da31d] hover:bg-[#1f801f] text-xl h-[35px] w-[98%] sm:w-[15%] px-0 sm:px-5 rounded "
              onClick={handleAdd}
            >Add</button>)
          }
        </div>

        <div className="w-full text-3xl px-5 -mb-4">
          <h2>Tasks:</h2>
        </div>

        <TaskList inputRef={inputRef} />

        {
          tasks.length>0 && <div>
            <button className="bg-[red] rounded hover:bg-[#ba0202] py-2 px-4 mb-5" onClick={()=>dispatch(removeAll())}>Remove All</button>
          </div>
        }
      </section>
    </>
  );
};

export default TodoMain;
