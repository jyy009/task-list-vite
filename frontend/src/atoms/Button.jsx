export const Button = ({ type, text, onClick, section, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${
        section
          ? section
          : "bg-slate-200 hover:bg-sky-700 hover:text-slate-50 text-sky-900 font-semibold py-1 px-3 rounded shadow focus:outline-none focus:ring-2 focus:ring-sky-700 transition-colors duration-150"
      }`}
      aria-label={ariaLabel}
    >
      {text}
    </button>
  );
};
