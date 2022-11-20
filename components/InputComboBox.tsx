import {Combobox} from '@headlessui/react';
import React, {useState} from 'react';

const InputComboBox = ({list, search}:
  {list: string[],
    search:(value: string)=>void}) => {
  const [selected, setSelected] = useState('');
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
      value={selected}
      onChange={setSelected}>
      <Combobox.Input onChange={inputOnChange}
        className="border-2 border-sky-800 focus:ring-0 z-10
        "
      />
      <Combobox.Options
        className='relative z-10 border-2'
      >
        {filtered.map((item, index)=>(
          <Combobox.Option
            key={item}
            value={item}
            className="
            bg-white
            ui-active:bg-blue-500
            ui-active:text-white
            ui-not-active:bg-white
            ui-not-active:text-black
            "
          >
            {item}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};

export default InputComboBox;
