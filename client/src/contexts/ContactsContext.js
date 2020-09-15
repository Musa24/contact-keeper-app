import React, { createContext, Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
export const ContactsContext = createContext();

class ContactsContextProvider extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: 'Musa Salumu',
        email: 'test@gmail.com',
        phone: 12232434,
        type: 'personal',
      },
      {
        id: 2,
        name: 'Musalumu',
        email: 'test1@gmail.com',
        phone: 22212121,
        type: 'professional',
      },
      {
        id: 3,
        name: 'Muhozya',
        email: 'test2@gmail.com',
        phone: 122344,
        type: 'personal',
      },
    ],
  };

  addContact = (contact) => {
    contact.id = uuidv4();
    this.setState((oldState) => {
      return { contacts: [...oldState.contacts, contact] };
    });
  };

  deleteContact = (id) => {
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== id),
    });
  };

  render() {
    return (
      <ContactsContext.Provider
        value={{
          ...this.state,
          addContact: this.addContact,
          deleteContact: this.deleteContact,
        }}
      >
        {this.props.children}
      </ContactsContext.Provider>
    );
  }
}

export default ContactsContextProvider;
