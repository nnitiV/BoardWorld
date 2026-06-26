interface CheckboxInputProps {
  className: string;
  label: string;
  id: string;
  checked: boolean;
  setChecked: (value: boolean) => void;
}

export default function CheckboxInput({
  className,
  label,
  id,
  checked,
  setChecked,
}: CheckboxInputProps) {
  return (
    <div className={className}>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="appearance-none w-3 h-3 border me-2 rounded-xl cursor-pointer transition-all checked:bg-black"
      />
      <label
        htmlFor={id}
        className="text-blue-950 font-semibold cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}
