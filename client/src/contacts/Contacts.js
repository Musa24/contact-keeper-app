import React, { Fragment, useContext } from 'react';
import { ContactsContext } from '../contexts/ContactsContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';

function Contacts() {
  const { contacts, filtered } = useContext(ContactsContext);

  if (contacts.length === 0) {
    return <h4>Please add Contacts</h4>;
  }
  return (
    <Fragment>
      {filtered !== null
        ? filtered.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        : contacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
    </Fragment>
  );
}

export default Contacts;
