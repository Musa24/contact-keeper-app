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
    current: null,
    filtered: null,
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
    if (this.state.filtered !== null) {
      this.setState({
        filtered: this.state.filtered.filter((contact) => contact.id !== id),
      });
    }
  };

  setCurrent = (contact) => {
    this.setState({
      current: contact,
    });
  };

  updateContact = (contact) => {
    let updatedContact = this.state.contacts.map((oldContact) =>
      oldContact.id === contact.id ? contact : oldContact
    );
    let updatedFilteredContact = this.state.contacts.map((oldContact) =>
      oldContact.id === contact.id ? contact : oldContact
    );
    this.setState(
      {
        contacts: updatedContact,
        filtered: updatedFilteredContact,
      },
      () => {
        this.clearCurrent();
      }
    );
  };

  clearCurrent = () => {
    this.setState({ current: null });
  };

  filterContact = (text) => {
    let filterContacts = this.state.contacts.filter((contact) => {
      const regex = new RegExp(`${text}`, 'gi');
      return contact.name.match(regex) || contact.email.match(regex);
    });

    this.setState({ filtered: filterContacts });
  };

  clearFilter = () => {
    {
      this.setState({ filtered: null });
    }
  };

  render() {
    return (
      <ContactsContext.Provider
        value={{
          ...this.state,
          addContact: this.addContact,
          deleteContact: this.deleteContact,
          setCurrent: this.setCurrent,
          clearCurrent: this.clearCurrent,
          updateContact: this.updateContact,
          filterContact: this.filterContact,
          clearFilter: this.clearFilter,
        }}
      >
        {this.props.children}
      </ContactsContext.Provider>
    );
  }
}

export default ContactsContextProvider;
