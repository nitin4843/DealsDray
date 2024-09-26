export default function Input({ title, name, type, ...props }) {
    return (
        <div className="form-control">
            <label htmlFor={name}>{title}</label>
            <input
                type={type} name={name} id={name} {...props}
            />
        </div>
    );
}