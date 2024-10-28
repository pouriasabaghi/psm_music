function Input({ name, label, autoComplete = "off", type = "text", register, error }) {
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
        className={`bg-dark-700 text-white px-4 py-2 rounded-lg border outline-none focus:border-blue-500 ${error ? 'focus:border-red-500 border-red-500' : 'border-gray-500'}`}
        {...register}
      />
      {error && <span className="text-red-500 text-sm mt-2 font-medium">{error}</span>}
    </div>
  );
}

export default Input;

