interface DateInputProps {
  classes: string;
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DateInput({
  classes,
  label,
  id,
  placeholder,
  value,
  onChange,
}: DateInputProps) {
  return (
    <div className={classes}>
      <label htmlFor="dateOfBirth" className="ms-2 text-blue-950 font-bold">
        {label}
      </label>
      <input
        type="date"
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-transparent border-b-black/25 rounded-xl px-4 py-2 outline-0 transition-all focus:shadow-sm focus:border-blue-950"
      />
    </div>
  );
}
