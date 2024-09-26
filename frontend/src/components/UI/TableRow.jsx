import Button from "./Button";

export default function TableRow({ employees, handleEdit, handleDelete }) {
    return (
        <>
            {employees.map((item, index) => (
                <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td><img src={item.image} width={50} alt="image" /></td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.mobileNo}</td>
                    <td>{item.designation}</td>
                    <td>{item.gender}</td>
                    <td>{item.course}</td>
                    <td>{new Date(item.createDate).toLocaleDateString()}</td>
                    <td>
                        <div className="editDeleteBtns">
                            <Button text='Edit' onClick={() => handleEdit(item)} />
                            <Button text='Delete' onClick={() => handleDelete(item._id)} />
                        </div>
                    </td>
                </tr>
            ))}
        </>

    );
}