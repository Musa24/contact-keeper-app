import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ContactsContext } from '../contexts/ContactsContext';
import { AlertContext } from '../contexts/AlertContext';

function ContactItem({ contact }) {
  const { deleteContact, setCurrent, clearCurrent } = useContext(
    ContactsContext
  );

  //This
  const { setAlert } = useContext(AlertContext);

  const { _id, name, email, phone, type } = contact;

  // Deleting an Item
  const handleDelete = (e) => {
    console.log('Deleting');
    e.preventDefault();
    deleteContact(_id);
    clearCurrent();
  };
  const handleEdit = () => {
    setCurrent(contact);
  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (type === 'personal' ? 'badge-primary' : 'badge-success')
          }
        >
          {type[0].toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul>
        {email && (
          <li>
            <i className="fas fa-envelope-open"> {email}</i>
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"> {phone}</i>
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          Delete
        </button>
      </p>
    </div>
  );
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
