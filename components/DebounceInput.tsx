import React from 'react';
import {DebounceInputInterface} from '../interfaces/global.interface';
import styles from '../styles/Input.module.css';

const DebounceInput:React.FC<DebounceInputInterface> =
({value: initialValue,
  onChange,
  debounce = 500,
  extraClass,
  ...props
} :
    DebounceInputInterface
    & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = React.useState(initialValue);
  React.useEffect(()=>{
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(()=>{
    const timeout = setTimeout(()=>{
      onChange(value);
    }, debounce);
    return ()=> clearTimeout(timeout);
  }, [value] );


  return (
    <input
      className={`${styles.input} ${styles[extraClass!]}`}
      {...props}
      value ={value} onChange={(e)=>setValue(e.target.value)} />
  );
};

export default DebounceInput;
