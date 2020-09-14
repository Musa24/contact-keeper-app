import React, { createContext } from 'react';

export const ContactsContext = createContext();

class ContactsContextProvider extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: 'Musa',
        email: 'test@gmail.com',
        phone: 111 - 111 - 111,
        type: 'personal',
      },
      {
        id: 2,
        name: 'Musalumu',
        email: 'test1@gmail.com',
        phone: 222 - 111 - 111,
        type: 'proffesional',
      },
      {
        id: 3,
        name: 'Muhozya',
        email: 'test2@gmail.com',
        phone: 222 - 222 - 111,
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
