import { createContext, useRef, useState, } from "react";

export const ModalContext = createContext({
    modal: '',
    setModal: '',
    profile: '',
    setProfile: '',
});

export default function ModalContextProvider({ children }) {
    const [modal, setModal] = useState({
        isOpen: false,
        type: 'add'
    });

    const initialState = { name: "", email: "", mobileNo: "" };

    const [profile, setProfile] = useState(initialState);

    const ctxValue = {
        modal,
        setModal,
        profile,
        setProfile
    }

    return (
        <ModalContext.Provider value={ctxValue}>{children}</ModalContext.Provider>
    );
}