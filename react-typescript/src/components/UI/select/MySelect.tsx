import React from 'react';

type Props = {
  label: string;
  options: {
    name: string | number;
    value: string | number;
  }[];
  defaultValue: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => Promise<void>;
};

const MySelect = (props: Props) => {
  const { label, options, defaultValue, onChange } = props;
  return (
    <label htmlFor="select">
      {label}&ensp;
      <select id="select" defaultValue={defaultValue} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default MySelect;
