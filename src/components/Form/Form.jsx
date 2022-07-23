import { useState } from 'react'
import { nanoid } from 'nanoid';
import styles from './Form.module.css';
import PropTypes from 'prop-types';






const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onInputHandler = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

    const objectCompiler = () => {
    return { name, number, id: nanoid() };
  };
  
  const onSubmitHandler = e => {
    e.preventDefault();
    onSubmit(objectCompiler());
    reset();
  };


   const reset = () => {
    setName('');
    setNumber('');
  };

  
    return (
      <>
        <form className={styles.forms} onSubmit={onSubmitHandler}>
          <label className={styles.label}>
            Name
            <input
            className={styles.input}
              type="text"
              name="name"
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={onInputHandler}
            />
          </label>
          <label className={styles.label}>
            Number
            <input
            className={styles.input}
              type="tel"
              name="number"
              value={number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={onInputHandler}
            />
          </label>
          <button className={styles.button} type="submit">Add contact</button>
        </form>
      </>
    );
  }


export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};




