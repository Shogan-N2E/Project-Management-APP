import { useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom"

import Button from "./Button";

export default function Modal({children, ref, buttonCaption}) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open(){
                dialog.current.showModal();
                }
            }
        });
    
    return createPortal(
    <dialog ref={dialog} className="backdrop:bg-stone-900 backdrop:bg-opacity-50 rounded-md p-6">
        {children}
        <form method="dialog" className="mt-4 text-right ">
            <Button>{buttonCaption}</Button>
        </form>
    </dialog>, document.getElementById("modal-root"));
}