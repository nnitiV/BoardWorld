interface DateInputProps {
  className: string;
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DateInput({
  className,
  label,
  id,
  placeholder,
  value,
  onChange,
}: DateInputProps) {
  return (
    <div className={className}>
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
        className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-3 pr-8 rounded-lg 
                transition-all hover:border-blue-400 focus:outline-none focus:ring-2
                focus:ring-blue-500/20 focus:border-blue-500"
      />
    </div>
  );
}
