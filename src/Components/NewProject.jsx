import {useRef} from 'react';

import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({onAdd, onCancel}) {
    const title= useRef();
    const description = useRef();
    const dueDate = useRef();
    const modal = useRef();

    function handleSave() {
        const enterTitle = title.current.value;
        const enterDescription = description.current.value;
        const enterDueDate = dueDate.current.value;

        if(
            enterTitle.trim() === "" ||
            enterDescription.trim() === "" ||
            enterDueDate.trim() === ""
        ) {
            modal.current.open();
            return;
        }
        
        //validation passed, call onAdd with the new project data

        onAdd({
            title: enterTitle,
            description: enterDescription,
            dueDate: enterDueDate,
        })
    }

    return (
    <>
        <Modal ref={modal} buttonCaption="Close">
            <h2 className="text-xl font-bold text-stone-900 mt-4 my-4" >Invalid Input</h2>
            <p className="text-lg text-stone-700 mb-4">Some fields are missing. Please fill in all fields</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 mb-4">
                <li>
                    <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
                        Cancel
                    </button>
                </li>
                <li>
                    <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-900"
                    onClick={handleSave}
                    >Save</button>
                </li>
            </menu>
            <div>
                <Input ref={title} type="text" label="Title" />
                <Input ref={description} type="text" label="Description" textarea />
                <Input ref={dueDate} type="date" label="Due Date" />
            </div>
        </div>
    </>     
    )
}