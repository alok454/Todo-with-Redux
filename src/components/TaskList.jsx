import { MdDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { done, edit, remove } from "../redux/features/taskSlice";

const TaskList = (props) => {
  const {tasks} = useSelector((state) => state.todo);
  const dispatch = useDispatch();


  return (
    <section className="w-full flex justify-center">
      <div className="w-[90%] flex flex-col gap-2 pt-1">
        {tasks.map((task) => (
          <div className="w-full flex justify-between items-center border-b-[1px] pb-[1px]" key={task.id}>
            <div className="flex gap-2 items-center">
              <MdDone
                className={`text-[30px] font-extrabold hover:text-[#4dfa4d] cursor-pointer ${task.completed ? "text-[#4dfa4d]" : "text-white"}`}
                onClick={() => dispatch(done(task.id))}
              />
              <p className={`text-[1.3rem] decoration-[red] ${task.completed && "line-through"}`}>{task.title}</p>
              { task.completed && <div><MdDone className="text-[30px] text-[#4dfa4d]"/></div>}
            </div>
            {
              task.completed || 
              (<div className="flex gap-3">
                <FaEdit
                  className="text-[25px] text-[aqua] hover:text-[#257979] cursor-pointer"
                  onClick={() => dispatch(edit(task.id))}
                />
                <MdDelete 
                  className="text-[25px] text-[red] hover:text-[#b33131] cursor-pointer" 
                  onClick={()=>dispatch(remove(task.id))}
                />
              </div>)
            }
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaskList;
