/* eslint-disable react/react-in-jsx-scope */
import Link from 'next/link';
import {CiDatabase} from 'react-icons/ci';
import {FiBookOpen, FiHome} from 'react-icons/fi';
import {TbTruckLoading} from 'react-icons/tb';
import styles from '../styles/NavDrawer.module.css';

const NavDrawer = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul} >

        <Link className={styles.link} href='/'><FiHome/>
          <span className={styles.span}>Home </span></Link>
        <Link className={styles.link} href='/recipes'>
          <FiBookOpen/><span className={styles.span}>
            Recipes</span></Link>
        <Link className={styles.link} href='/ingredients'>
          <CiDatabase/><span className={styles.span}>Ingredients </span></Link>
        <Link className={styles.link} href='/suppliers'>
          <TbTruckLoading/><span className={styles.span}>
            Suppliers</span></Link>
      </ul>
    </nav>
  );
};

export default NavDrawer;
