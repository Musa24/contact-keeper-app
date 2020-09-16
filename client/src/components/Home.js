import React from 'react';
import ContactFilterForm from '../contacts/ContactFilterForm';
import ContactForm from '../contacts/ContactForm';
import Contacts from '../contacts/Contacts';

function Home() {
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
