import { useEffect, useState } from "react";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Heading from "../../components/UI/Heading";

export default function Login() {
    const data = useActionData();
    const [error, setError] = useState('');
    useEffect(() => {
        if (data && data.error) {
            setError(data.message);
        }
    }, [data]);

    return (
        <Form className="login-form" method="POST">
            {error &&
                <p className="user-message user-message-error">{error}</p>
            }
            <Heading text="Login" />
            <Input type="text" title='Username:' name="username" />
            <Input type="password" title='Password:' name="password" />
            <Button text='Login' />
            <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
        </Form>
    );

}

export async function action({ request }) {
    const fd = await request.formData();
    const loginData = {
        username: fd.get('username'),
        password: fd.get('password')
    };
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData),
    });

    const resData = await response.json();

    if (!resData.error) {
        localStorage.setItem('token', resData.token);
        localStorage.setItem('username', resData.user.username);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem('expiration', expiration.toISOString());
        return redirect('/dashboard');
    }

    return resData;

}