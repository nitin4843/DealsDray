import { Form, NavLink } from "react-router-dom";
import logo from '../assets/logo.png';
export default function Navigation() {
    const username = localStorage.getItem('username');
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <img src={logo} alt="Logo" width={100} />
                <div className="navbar-list-items">
                    <li><NavLink to='/dashboard' className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                    <li><NavLink to='/dashboard/employee' className={({ isActive }) => isActive ? 'active' : ''}>Employee List</NavLink></li>
                </div>
                <li><Form className="logout-form" action="/logout" method="POST">
                    {username && <li>{`${username}-`}</li>}
                    <button className="logout-btn">Logout</button>
                </Form>
                </li>
            </ul>
        </nav >
    );
}