export const Button = ({ type, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full bg-sky-700 hover:bg-sky-800 text-slate-50 font-semibold py-2 px-4 rounded shadow transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-sky-700 mt-2"
    >
      {text}
    </button>
  );
};
