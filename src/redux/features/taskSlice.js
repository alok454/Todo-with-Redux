import { createSlice } from "@reduxjs/toolkit";

const getLocalItem = () => {
  const gettingData = localStorage.getItem('tasks');
  const parsedData = JSON.parse(gettingData);
  return parsedData===null ? [] : parsedData;
}

const saveToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

export const taskSlice = createSlice({
  name: 'todo',
  initialState: {
    tasks: getLocalItem(),
    isUpdate: false,
    edit: null,
    input: "",
  },

  reducers: {
    add: (state, action) => {
      const newTasks = [...state.tasks, action.payload];
      saveToLocalStorage(newTasks);
      return {...state, input: "", tasks: newTasks}
    }, 

    update: (state) => {
      const newTasks = state.tasks.map((task)=>(
        task.id===state.edit ? {...task, title: state.input} : task
      ));
      saveToLocalStorage(newTasks);
      return {input: "", tasks: newTasks, edit: null, isUpdate: false}
    },

    remove: (state, action) => {
      const newTasks = state.tasks.filter((item)=> (
        item.id !== action.payload
      ))
      saveToLocalStorage(newTasks);
      return {...state, tasks: newTasks};
    },

    edit: (state, action) => {
      console.log(action.payload)
      const id = action.payload;
      const foundTask = state.tasks.find((task)=>(
        task.id===id
      ));

      return {...state, isUpdate: true, edit: id, input: foundTask.title}
    },

    removeAll: (state) => {
      state.tasks.length = 0;
      saveToLocalStorage(state.tasks);
    },

    setInput: (state, action) => {
      return {...state, input: action.payload}
    },

    done: (state, action) => {
      const newTasks = state.tasks.map((task)=>{
        if(task.id===action.payload) {
          return task.completed ? {...task, completed: false} : {...task, completed: true}; 
        }
        return task
      });
      saveToLocalStorage(newTasks);
      return {...state, tasks: newTasks}
    }
  }
});


export const {add, remove, update, edit, removeAll, setInput, done} = taskSlice.actions;

export default taskSlice.reducer;