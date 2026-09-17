type ButtonProps = {
    text: string;
    onClick: () => void;
    variant?: "primary" | "secondary"| "danger";
    disabled?: boolean;
};

function Button({text, onClick, variant, disabled = false}: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn btn-${variant}`} disabled={disabled}>
      {text}
    </button>
  )
}

export default Button