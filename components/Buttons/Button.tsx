
import {IButton} from '../../interfaces/global.interface';
import styles from '../../styles/Button.module.css';

const Button = ({text, onClick, onSubmit}:IButton) => {
  return (
    <button

      className={`border-solid border-2 border-slate-200 
       bg-white  text-gray-700 w-24 rounded-md p-1 m-2 
       hover:bg-blue-800 
       hover:text-white
       hover:border-blue-800
       ease-in-out
       duration-200
      ${styles[`${text.toString().toLowerCase()}`]}`}
      onClick={onClick} onSubmit={onSubmit}>
      {text}
    </button>
  );
};

export default Button;
