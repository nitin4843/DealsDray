import { redirect } from "react-router-dom";

export async function action() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    return redirect('/login');
}