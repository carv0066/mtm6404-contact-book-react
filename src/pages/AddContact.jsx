import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import db from '../utils/db';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../utils/fontawesome';
import { Link } from "react-router-dom";
import '../AddContact.css';

const AddContact = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await addDoc(collection(db, "contacts"), {
        firstName,
        lastName,
        email,
        birthday,
        });
        navigate('/');
        } catch (error) {
        console.error("Error adding contact: ", error);
        }
    };

    return (
        <div className="add-contact-container">
            <div className="contactbtn-title">
                <h1 className="contact-title">Add Contact</h1>
                <div className="back-button-container">
                    <Link to="/" className="back-button"><FontAwesomeIcon icon="arrow-right" className="icon back-button" />Go back</Link>
                </div>
            </div>

        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>First Name:</label>
            <input
                className='input-short'
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label>Last Name:</label>
            <input
                className='input-short'
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label>Email:</label>
            <input
                className='input-short'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label>Birthday:</label>
            <input
                className='input-short'
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
            />
            </div>
            <button type="submit" className="submit-button">Add Contact</button>
        </form>
        </div>
    );
    };

export default AddContact;
