import React, { createContext, Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
export const ContactsContext = createContext();

class ContactsContextProvider extends Component {
  state = {
    contacts: [
      // {
      //   id: 1,
      //   name: 'Musa Salumu',
      //   email: 'test@gmail.com',
      //   phone: 12232434,
      //   type: 'personal',
      // },
    ],
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };

  getContactsFromDB = async () => {
    try {
      const res = await axios.get('/api/contacts');
      console.log('Musa', res.data);
      this.setState((oldState) => {
        return { contacts: [...oldState.contacts, ...res.data] };
      });
    } catch (error) {
      console.log(error.response.msg);
      this.setState({ error: error.response.msg });
    }
  };

  addContact = async (contact) => {
    // contact.id = uuidv4();
    // Header config
    const config = {
      Headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      console.log(res.data);
      this.setState((oldState) => {
        return { contacts: [...oldState.contacts, res.data] };
      });
    } catch (error) {
      console.log(error.response.msg);
      this.setState({ error: error.response.msg });
    }
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
          getContactsFromDB: this.getContactsFromDB,
        }}
      >
        {this.props.children}
      </ContactsContext.Provider>
    );
  }
}

export default ContactsContextProvider;
