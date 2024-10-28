function Input({
  name,
  label,
  placeholder,
  autoComplete = "off",
  type = "text",
  register,
  error,
}) {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        placeholder={placeholder}
        autoComplete={autoComplete}
        type={type}
        name={name}
        id={name}
        className={` rounded-lg border bg-dark-900 px-4 py-2 text-white outline-none focus:border-blue-500 ${error ? "border-red-500 focus:border-red-500" : "border-gray-500"}`}
        {...register}
      />
      {error && (
        <span className="mt-2 text-sm font-medium text-red-500">{error}</span>
      )}
    </div>
  );
}

export default Input;
