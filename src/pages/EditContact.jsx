import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import db from '../utils/db';
import '../EditContact.css';

const EditContact = () => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const navigate = useNavigate();

    const fetchContactById = async () => {
        const docSnap = await getDoc(doc(db, "contacts", id));
        if (docSnap.exists()) {
            const data = docSnap.data();
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setBirthday(data.birthday);
        }
    };

    useEffect(() => {

        fetchContactById();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, "contacts", id), {
            firstName,
            lastName,
            email,
            birthday,
        })
        .then(() => {
            navigate(`/details/${id}`);
        })
        .catch((error) => {
            console.error("Error updating info: ", error);
        });
    };

    return (
        <div className="edit-contact-container">
            <h1>Edit Contact</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Birthday:</label>
                    <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">Save</button>
            </form>
        </div>
    );
};

export default EditContact;
