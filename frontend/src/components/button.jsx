import "./button.css";

const Button = ({ variant = "default", text, onClick, type = "button" }) => {
  return (
    <button
      className={`btn ${variant}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
