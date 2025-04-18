export const Header2 = ({ text, id }) => {
  return (
    <h2
      className="font-[poppins] text-2xl font-bold text-slate-800 mb-4 text-center"
      id={id}
    >
      {text}
    </h2>
  );
};
