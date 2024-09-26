import { useContext } from "react";
import { ModalContext } from "../../store/modalContext";
import { ErrorContext } from "../../store/errorContext";

export default function Modal({ children }) {
    const { modal, setModal, setProfile } = useContext(ModalContext);
    const { setError } = useContext(ErrorContext);


    function handleCloseModal() {
        setProfile({ name: "", email: "", mobileNo: "" })

        setModal({ isOpen: false });
        setError('');
    }
    return (
        <dialog className="modal" open>
            <button className="close-btn" onClick={handleCloseModal}>X</button>
            {children}
        </dialog>
    );
}