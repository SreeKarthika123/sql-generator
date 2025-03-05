const Button = ({ text, onClick, className }) => {
    return (
        <button className={`px-4 py-2 text-white rounded ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
