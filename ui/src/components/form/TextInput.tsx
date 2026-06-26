interface TextInputProps {
  className: string,
  type: "text" | "password" | "email";
  id: string;
  label: string;
  placeholder: string;
  inputValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  className,
  type,
  id,
  placeholder,
  inputValue,
  label,
  onChange,
}: TextInputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="ms-2 text-blue-950 font-bold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
        className="border border-transparent border-b-black/25 rounded-xl px-4 py-2 focus:outline-none transition-all focus:shadow-sm focus:border-blue-950"
      />
    </div>
  );
}
