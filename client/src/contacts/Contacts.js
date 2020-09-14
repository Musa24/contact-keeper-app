import React, { Fragment, useContext } from 'react';
import { ContactsContext } from '../contexts/ContactsContext';
import ContactItem from './ContactItem';

function Contacts() {
  const { contacts } = useContext(ContactsContext);

  return (
    <Fragment>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
}

export default Contacts;
