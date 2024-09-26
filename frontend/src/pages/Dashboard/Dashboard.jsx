import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation";
import ErrorContextProvider from "../../store/errorContext";
import ModalContextProvider from "../../store/modalContext";

export default function Dashboard() {
    return (
        <>
            <header>
                <Navigation />
            </header>
            <main className="main">
                <ErrorContextProvider>
                    <ModalContextProvider>
                        <Outlet />
                    </ModalContextProvider>
                </ErrorContextProvider>
            </main>
        </>
    );
}