import {Combobox} from '@headlessui/react';
import React, {useState} from 'react';

const InputComboBox = ({list, search}:
  {list: string[],
    search:(value: string)=>void}) => {
  const [selected, setSelected] = useState(list[0]);
  const [query, setQuery] = useState('');
  const filtered = query === ''? [] : list.filter((item)=>{
    return item.toLowerCase().includes(query.toLocaleLowerCase());
  });

  const inputOnChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value;
    search(value);
    setQuery(value);
  };

  return (
    <Combobox
      name="name"
      value={selected} onChange={setSelected}>
      <Combobox.Input onChange={inputOnChange} />
      <Combobox.Options>
        {filtered.map((item, index)=>(
          <Combobox.Option
            key={item}
            value={item}>
            {item}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};

export default InputComboBox;
