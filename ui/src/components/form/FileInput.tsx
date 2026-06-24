interface FileInputProps {
  classes?: string,
  id: string;
  fileKey: string,
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInput({
  classes,
  id,
  fileKey,
  label,
  onChange
}: FileInputProps) {
  return (
    <div className={classes}>
      <label htmlFor={id} className="ms-2 text-blue-950 font-bold">
        {label}
      </label>
      <input
        type="file"
        key={fileKey}
        id={id}
        name={id}
        onChange={onChange}
        className="border border-transparent border-b-black/25 rounded-xl px-4 py-2 focus:outline-none transition-all focus:shadow-sm focus:border-blue-950"
      />
    </div>
  );
}
