import React, { Fragment, useContext, useEffect } from 'react';
import { ContactsContext } from '../contexts/ContactsContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';

function Contacts() {
  const { contacts, filtered, getContactsFromDB, loading } = useContext(
    ContactsContext
  );

  useEffect(() => {
    getContactsFromDB();
  }, []);

  if (contacts.length === 0) {
    return <h4>Please add Contacts</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
}

export default Contacts;
