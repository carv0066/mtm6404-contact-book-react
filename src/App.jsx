import { query, getDocs, collection, orderBy } from 'firebase/firestore';
import db from './utils/db';
import { useEffect, useState } from 'react';
import './App.css';
import { Link } from "react-router-dom";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  const fetchContacts = async () => {
    const q = query(collection(db, "contacts"), orderBy("lastName", "asc"));
    const querySnapshot = await getDocs(q);
    const contactList = [];
    querySnapshot.forEach((doc) => {
      contactList.push({
        id: doc.id,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        email: doc.data().email,
      });
    });
    setContacts(contactList);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(contact =>
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [contacts, searchTerm]);

  return (
    <div className="app-container">
      <h1 className="app-title">Contacts</h1>

      {/* Add Contact */}
      <div className="add-contact-button-container">
        <Link to="/add-contact" className="add-contact-button">Add Contact</Link>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="contact-list">
        {filteredContacts.map(({ id, firstName, lastName }) => (
          <Link key={id} to={`/details/${id}`} className="contact-link">
            <div className="contact-item">
              <p className="contact-name">{firstName} {lastName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
