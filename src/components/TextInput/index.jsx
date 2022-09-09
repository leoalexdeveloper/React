import "./styles.css";

export const TextInput = ({handleChange, searchValue}) => (
  <input placeholder="Type your search" className="text-input" onChange={handleChange} value={searchValue} type="search" />
);
