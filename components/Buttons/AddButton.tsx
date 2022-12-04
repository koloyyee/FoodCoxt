import Link from 'next/link';
import styles from '../../styles/Button.module.css';

const AddButton = ({destination}:{destination: string}) => {
  return (
    <Link className={styles.addButton} href={destination}> + </Link>
  );
};

export default AddButton;
