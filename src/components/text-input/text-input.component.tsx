import "./text-input.component.scss";

export const TextInput = ({ onInputChange, term }: TextInputType) => {
  return (
    <input
      type="text"
      autoComplete="off"
      value={term}
      onChange={(ev) => onInputChange(ev.target.value)}
    />
  );
};

interface TextInputType {
  onInputChange: (term: string) => void;
  term: string;
}
