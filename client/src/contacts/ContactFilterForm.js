import React, { useContext, useEffect, useRef } from 'react';
import { ContactsContext } from '../contexts/ContactsContext';

function ContactFilterForm() {
  // You can use useRef Hook
  const { filterContact, clearFilter } = useContext(ContactsContext);
  const text = useRef('');
  const handleFilteredContact = (e) => {
    filterContact(e.target.value);
  };

  useEffect(() => {
    clearFilter();
  }, [clearFilter]);

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts...."
        onChange={handleFilteredContact}
      />
    </form>
  );
}

export default ContactFilterForm;
