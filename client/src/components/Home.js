import React, { useContext, useEffect } from 'react';
import ContactFilterForm from '../contacts/ContactFilterForm';
import ContactForm from '../contacts/ContactForm';
import Contacts from '../contacts/Contacts';
import { AuthContext } from '../contexts/AuthContext';
import Register from './auth/Register';

function Home() {
  const { loadUser, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilterForm />
        <Contacts />
      </div>
    </div>
  );
}

export default Home;
