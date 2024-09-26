import { useContext } from 'react';
import { ModalContext } from '../../store/modalContext';
import { ErrorContext } from '../../store/errorContext';

export default function AddButton({ text }) {
    const { setModal } = useContext(ModalContext);
    const { setError } = useContext(ErrorContext);

    function handleShowModal() {
        setModal({ isOpen: true, type: 'add' })
        setError("");
    }
    return (
        <>
            <button onClick={handleShowModal} className="add-btn">{text}</button>
        </>
    );
}