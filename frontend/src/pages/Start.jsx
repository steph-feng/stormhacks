import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Start.css'; 

const Start = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch('http://localhost:8000/api/process/', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await res.json();
            navigate('/result', { state: { res: data } });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="start-container">
            <h1>count your colonies</h1>
            <form onSubmit={handleSubmit} className="start-form">
                <label htmlFor="file-upload" className="custom-file-upload">choose file</label>
                <input 
                    type="file" 
                    id="file-upload" 
                    onChange={handleFileChange} 
                    className="file-input"
                />
                <button type="submit" className="upload-btn">upload</button>
            </form>
        </div>
    );
};

export default Start;