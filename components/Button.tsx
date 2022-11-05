
import {ButtonInterface} from '../interfaces/global.interface';
import styles from '../styles/Button.module.css';

const Button = ({text, onClick, onSubmit}:ButtonInterface) => {
  return (
    <button
      className={`${styles.button} 
      ${styles[`${text.toString().toLowerCase()}`]}`}
      onClick={onClick} onSubmit={onSubmit}>
      {text}
    </button>
  );
};

export default Button;
