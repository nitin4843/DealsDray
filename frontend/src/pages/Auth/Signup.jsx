import { useEffect, useState } from "react";
import { Form, Link, json, redirect, useActionData } from "react-router-dom";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Heading from "../../components/UI/Heading";

export default function Signup() {
    const data = useActionData();
    const [error, setError] = useState('');

    useEffect(() => {
        if (data && data.error) {
            setError(data.message);
        }
    }, [data]);

    return (
        <>

            <Form className="login-form" method="POST">
                <Heading text="Signup" />
                <Input type="text" title='Username:' name="username" />
                <Input type="password" title='Password:' name="password" />
                {error &&
                    <p className="user-message user-message-error">{error}</p>
                }
                <Button text='Signup' />
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </Form>
        </>
    );
}

export async function action({ request }) {
    const fd = await request.formData();

    const signupData = {
        username: fd.get('username'),
        password: fd.get('password'),
    }

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
    });

    const resData = await response.json();

    if (!resData.error) {
        return redirect('/login');
    }

    return resData;
}