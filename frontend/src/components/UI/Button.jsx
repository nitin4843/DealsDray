export default function Button({ text, ...props }) {
    return (
        <button className="btn" {...props}>{text}</button>
    );
}