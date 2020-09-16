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
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
}

export default Contacts;
