import React, { createContext, Component } from 'react';

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
        type: 'proffesional',
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
  render() {
    return (
      <ContactsContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </ContactsContext.Provider>
    );
  }
}

export default ContactsContextProvider;
