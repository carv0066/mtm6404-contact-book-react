import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import db from '../utils/db';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../utils/fontawesome';
import '../Details.css';

const Details = () => {
    const [contact, setContact] = useState();
    const { id } = useParams();
    const navigate = useNavigate(); // Add this to handle navigation after deletion

    const fetchContactById = async () => {
        const docSnap = await getDoc(doc(db, "contacts", id));
        if (docSnap.exists()) {
            setContact(docSnap.data());
        }
    };

    useEffect(() => {
        fetchContactById();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "contacts", id));
            navigate('/'); // go to home page after delete
        } catch (error) {
            console.error("Error deleting contact: ", error);
        }
    };

    return (
        <div className="details-container">
            <div className="contactbtn-title">
                <h1 className="details-title">Details</h1>
                <div className="back-button-container">
                    <Link to="/" className="back-button">
                        <FontAwesomeIcon icon="arrow-right" className="icon back-button" /> Go back
                    </Link>
                </div>
            </div>
            {contact ? (
                <div className="contact-details">
                    <div className="contact-item">
                        <span className="contact-label">Name:</span> {contact.firstName} {contact.lastName}
                    </div>
                    <div className="contact-item">
                        <span className="contact-label">Email:</span> {contact.email}
                    </div>
                    <div className="contact-item">
                        <span className="contact-label">Birthday:</span> {contact.birthday}
                    </div>
                    <button onClick={handleDelete} className="delete-button">Delete</button>
                </div>
            ) : (
                <p>Loading contact information...</p>
            )}
        </div>
    );
};

export default Details;
