import React, { useContext, useState } from 'react';
import { ContactsContext } from '../contexts/ContactsContext';

function ContactForm() {
  const { addContact } = useContext(ContactsContext);
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSumit = (e) => {
    e.preventDefault();

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
  };

  return (
    <form onSubmit={handleSumit}>
      <h2 className="text-primary">Add Contact</h2>
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
          value="Add Contact"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
}

export default ContactForm;
