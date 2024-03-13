const NumberInput = ({ value, onChange, ...rest }) => {
  // this is the custom component for inputs
  const handleChange = (e) => {
    const value = e.target.valueAsNumber || 0;
    onChange(value);
  };
  return (
    <input
      type="number"
      min={0}
      onChange={handleChange}
      value={value}
      {...rest}
    />
  );
};

export default NumberInput;
