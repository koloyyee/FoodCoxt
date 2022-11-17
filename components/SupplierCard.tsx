import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {SupplierInterface} from '../interfaces/supplier.interface';
import {default as styles} from '../styles/Card.module.css';
import Button from './Button';


const SupplierCard = (
    {supplier, isNew} :
    {supplier: SupplierInterface,

      isNew: boolean // is this a new ingredient?
    },
) => {
  const [data, setData] = useState<SupplierInterface>({...supplier});

  const [inputDisable, setInputDisable] = useState(true);

  useEffect(()=>setInputDisable(!isNew), []);
  const router = useRouter();

  /**
   * Check input is HK phone number lenght.
   * @param { React.ChangeEvent } e - onChange
   */
  function phoneValidation(e: React.ChangeEvent<HTMLInputElement>) {
    const regex = new RegExp(/^[2-9][0-9]{7}$/gm);
    if (!regex.test(e.target.value)) return;

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  /**
   *
   * @param {React.FormEvent} e
   * editMode to switch the form into editable form enable input
   */
  function editMode(e: React.SyntheticEvent) {
    e.preventDefault();
    setInputDisable(!inputDisable);
  }

  // eslint-disable-next-line require-jsdoc
  async function updateForm(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      const body = data;
      const id = body.id;
      await fetch(`/api/suppliers/update/${id}`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.error(e);
    }
    setInputDisable(!inputDisable);
  }

  // eslint-disable-next-line require-jsdoc
  async function createForm(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      const body = data;
      await fetch(`/api/suppliers/create`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.error(e);
    }
    setInputDisable(!inputDisable);
    router.back();
  }

  return (
    <article className='section'>
      {isNew? <h1>Add New Supplier</h1> : <h1>Update Supplier</h1>}
      <form className={styles.card}>
        <label htmlFor="name" className={styles.label}>
        Supplier Name
          <input
            className={`${styles.input}`}
            type="text"
            name="name"
            id='name'
            defaultValue={data.name}
            onChange={(e)=> setData(
                {...data,
                  [e.target.name]: e.target.value.toLowerCase()},
            )}
            disabled={inputDisable}
            required={true}/>
        </label>
        <label htmlFor="phone" className={styles.label}>
        Phone
          <input
            className={styles.input}
            type='tel'
            pattern= '[2-9][0-9]{7}'
            name='phone'
            id='phone'
            defaultValue={data.phone}
            onChange={phoneValidation}
            disabled={inputDisable}
            required={true}/>
        </label>
        <label htmlFor="email" className={styles.label}>
        Email
          <input
            className={styles.input}
            type="email"
            name="email"
            id='email'
            defaultValue={data.email}
            onChange={(e)=> setData(
                {...data,
                  [e.target.name]: e.target.value.toLowerCase()},
            )}
            disabled={inputDisable}
            required={true}/>
        </label>

        {
          isNew? <Button text='Save' onClick={createForm}/>:
         inputDisable?
         <Button text='Edit'onClick={editMode} /> :
         <Button text='Update' onClick={updateForm}/>
        }

      </form>

      <Button text='Back' onClick={()=>router.back()}/>
    </article>

  );
};

export default SupplierCard;
