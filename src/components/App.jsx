import { useState, useEffect } from 'react';
import styles from './App.module.css';
import List from './List';
import ContactForm from './Form';
import Notification from './Notification';
import Filter from './Filter';


const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? ''
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSameName = data => {
    return contacts.find(({ name }) => name === data.name);
  };

  const onFormSubmit = data => {
    if (contacts.length === 0) {
      setContacts([data]);
      return;
    } else if (onSameName(data)) {
      alert(`${data.name} is already in contacts.`);
      return;
    } else {
      setContacts(prevState => [data, ...prevState]);
      return;
    }
  };

  const onInputHandler = e => {
    setFilter(e.currentTarget.value);
  };

  

  const onDeleteHandle = contactId => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
  };

  const getFilteredContacts = () => {
    if (contacts.length === 0) {
      return;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

   return (
      <div className={styles.div}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={onFormSubmit} />
        <h2>Contacts</h2>
        <Filter
          onFilterInput={onInputHandler}
          value={filter}
        />
        {contacts.length > 0 ? (
        <List contacts={filteredContacts} onDelete={onDeleteHandle} />
      ) : (
          <Notification />
        )}
      </div>
    );
};

export default App;