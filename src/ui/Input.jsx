function Input({ name, label, autoComplete = "off", type = "text" }) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        autoComplete={autoComplete}
        type={type}
        name={name}
        id={name}
        className="bg-dark-700 text-white px-4 py-2 rounded-lg border border-gray-500 outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default Input;
