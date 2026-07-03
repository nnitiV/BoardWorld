interface TextAreaInputProps {
  className: string,
  id: string;
  label: string;
  placeholder: string;
  inputValue: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextAreaInput({
  className,
  id,
  placeholder,
  inputValue,
  label,
  onChange,
}: TextAreaInputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="ms-2 text-blue-950 font-bold">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
        className="h-55 border border-transparent border-b-black/25 rounded-xl px-4 py-2 focus:outline-none transition-all focus:shadow-sm focus:border-blue-950"
      />
    </div>
  );
}
