interface NumberInputProps {
  classes: string,
  id: string;
  label: string;
  placeholder: string;
  inputValue: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NumberInput({
  classes,
  id,
  placeholder,
  inputValue,
  label,
  onChange,
}: NumberInputProps) {
  return (
    <div className={classes}>
      <label htmlFor={id} className="ms-2 text-blue-950 font-bold">
        {label}
      </label>
      <input
        type="number"
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
