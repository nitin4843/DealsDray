import { createContext, useState, } from "react";

export const ErrorContext = createContext({
    error: '',
    setError: '',
});

export default function ErrorContextProvider({ children }) {
    const [error, setError] = useState('');

    const ctxValue = {
        error,
        setError
    }

    return (
        <ErrorContext.Provider value={ctxValue}>{children}</ErrorContext.Provider>
    );
}