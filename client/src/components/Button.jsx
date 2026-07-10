function Button({ children, type = "button" }) {
  return (
    <button
      type={type}
      className="
w-full
bg-black
text-white
py-2
rounded-lg
font-medium
hover:bg-gray-800
transition
"
    >
      {children}
    </button>
  );
}

export default Button;
