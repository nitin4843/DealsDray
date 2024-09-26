import { Form, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import AddButton from "../../components/UI/AddButton";
import Heading from "../../components/UI/Heading";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../store/modalContext";
import TableRow from "../../components/UI/TableRow";
import { getAuthToken } from "../../util/auth";
import { ErrorContext } from "../../store/errorContext";

let editId;

export default function Employee() {
    const { modal, setModal, profile, setProfile } = useContext(ModalContext);
    const [searchQuery, setSearchQuery] = useState('');
    const { error, setError } = useContext(ErrorContext);
    const [image, setImage] = useState('');
    const { employees } = useLoaderData();
    const data = useActionData();
    const navigate = useNavigate();

    function handleActionData() {
        if (data && !data.error) {
            setError(data.message);
        }
        if (data && data.error) {
            setError(data.message);
        }
    }

    useEffect(() => {
        handleActionData();
    }, [data]);

    const handleChange = (event) => {
        const { target } = event;
        setProfile((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setImage(base64);
    };

    function handleEdit(employee) {
        editId = employee._id;
        setModal({ isOpen: true, type: 'edit' });
        setProfile({ name: employee.name, email: employee.email, mobileNo: employee.mobileNo });
        setError('');
    }

    async function handleDelete(employeeId) {
        const confirmText = confirm('Are you sure you want to delete?');
        const token = getAuthToken();
        if (confirmText) {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'employee/' + employeeId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

            const resData = await response.json();

            if (!resData.error) {
                setModal({ isOpen: false });
                navigate('/dashboard/employee');
                return resData;
            }

            if (resData.error) {
                return resData.error;
            }
        }
    }

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const handleSearch = async (event) => {
        if (event.key === 'Enter') {
            try {
                const token = getAuthToken();
                const response = await fetch(
                    "http://localhost:8000/search?query=" + searchQuery,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    }
                );

                const resData = await response.json();



            } catch (error) {
                console.log(error);
            }

        }
    }


    return (
        <>
            {!modal.isOpen && <>
                <Heading text="Employee List" />
                <div className="count">
                    <p>Total Count: {employees.length}</p>
                    <AddButton text="Create Employee" />
                </div>
                <div className="search">
                    <p>Search </p>
                    <input type="text" name="search" placeholder="Enter search keyword" onKeyDown={handleSearch} value={searchQuery} onChange={handleSearchChange} />
                </div>
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Unique Id</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Create Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow employees={employees} handleEdit={handleEdit} handleDelete={handleDelete} />
                    </tbody>
                </table>
            </>}
            {modal.isOpen && <>
                <Heading text={`${modal.type === 'edit' ? 'Edit Employee' : 'Create Employee'}`} />
                <Modal>
                    {error &&
                        <p className="user-message user-message-error">{error}</p>
                    }
                    <Form className="modal-form" method={`${modal.type === 'edit' ? 'PUT' : 'POST'}`}>
                        <Input type="text" title='Name:' name="name" value={profile.name || ""} onChange={handleChange} />
                        <Input type="email" title='Email:' name="email" value={profile.email || ""} onChange={handleChange} />
                        <Input type="text" title='Mobile No:' name="mobileNo" value={profile.mobileNo || ""} onChange={handleChange} />
                        <div className="form-control">
                            <label htmlFor="designation">Designation:</label>
                            <select name="designation" id="designation">
                                <option value="hr">HR</option>
                                <option value="manager">Manager</option>
                                <option value="sales">Sales</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <p>Gender:</p>
                            <div className="gender-radio-btn">
                                <Input type="radio" title='Male:' name="gender" value='male' />
                                <Input type="radio" title='Female:' name="gender" value='female' />
                            </div>
                        </div>
                        <div className="form-control">
                            <p>Course:</p>
                            <div className="gender-radio-btn">
                                <Input type="checkbox" title='MCA:' name="course" value='MCA' />
                                <Input type="checkbox" title='BCA:' name="course" value='BCA' />
                                <Input type="checkbox" title='BSC:' name="course" value='BSC' />
                            </div>
                        </div>
                        <Input type="file" title="Image Upload:" name="image" accept="image/png, image/jpeg" onChange={(e) => handleFileUpload(e)} />
                        <input type="hidden" name="imageData" value={image} />
                        {editId && <input type="hidden" name="_id" value={editId} />}
                        <Button text={`${modal.type === 'edit' ? 'Update' : 'Submit'}`} />
                    </Form>
                </Modal>
            </>}
        </>
    );
}


export async function action({ request }) {
    const method = request.method;
    const fd = await request.formData();

    const employeeData = {
        image: fd.get('imageData'),
        name: fd.get('name'),
        email: fd.get('email'),
        mobileNo: fd.get('mobileNo'),
        designation: fd.get('designation'),
        gender: fd.get('gender'),
        course: fd.get('course'),
    };

    const token = getAuthToken();

    if (method === 'POST') {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(employeeData),
        });

        const resData = await response.json();

        return resData;
    }

    else if (method === 'PUT') {
        const employeeId = fd.get('_id');
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'employee/' + employeeId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(employeeData),
        });

        const resData = await response.json();

        return resData;
    }

}

export async function loader() {

    const token = getAuthToken();
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'employee', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    const resData = await response.json();

    return resData;

}