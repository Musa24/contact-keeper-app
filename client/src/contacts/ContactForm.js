import React, { useContext, useEffect, useState } from 'react';
import { ContactsContext } from '../contexts/ContactsContext';

function ContactForm() {
  const { addContact, current, clearCurrent, updateContact } = useContext(
    ContactsContext
  );
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'personal',
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        phone: '',
        email: '',
        type: 'personal',
      });
    }
  }, [current]);

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSumit = (e) => {
    e.preventDefault();

    if (current === null) {
      if (
        contact.name !== '' &&
        contact.email !== '' &&
        contact.phone !== '' &&
        contact.type !== ''
      ) {
        addContact(contact);
        setContact({
          name: '',
          phone: '',
          email: '',
          type: 'personal',
        });
      }
    } else {
      // updating
      updateContact(contact);
    }
  };

  const handleClear = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={handleSumit}>
      <h2 className="text-primary">{current ? 'Edit' : 'Add'} Contact</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={onChange}
        checked={type === 'personal'}
      />{' '}
      Person{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        onChange={onChange}
        checked={type === 'professional'}
      />{' '}
      Professional
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
}

export default ContactForm;
