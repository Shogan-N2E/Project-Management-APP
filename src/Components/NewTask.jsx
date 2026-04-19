import { useState } from "react";
import Modal from "./Modal";
import { useRef } from "react";

export default function NewTask({onAdd}){
    const modal = useRef();
    const[enteredTask, setEnteredTask] = useState('');

    function handleChange(event){
        setEnteredTask(event.target.value);
    }

    function handleClick(){
        if(enteredTask.trim() === ""){
            modal.current.open();
            return;
        }
        onAdd(enteredTask);
        setEnteredTask("");
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Close">
                <h2 className="text-xl font-bold text-stone-900 mt-4 my-4" >Invalid Input</h2>
                <p className="text-stone-500">Please enter a valid task name.</p>
            </Modal>
            <div className="flex items-center gap-4">
                <input 
                    type="text" 
                    className="w-64 px-2 py-1 rounded-sm bg-stone-200" 
                    placeholder="New task..."
                    value={enteredTask}
                    onChange={handleChange}
                />
                <button className="text-stone-400 hover:text-stone-900" onClick={handleClick}>Add Task</button>
            </div>
        </>
    );
}