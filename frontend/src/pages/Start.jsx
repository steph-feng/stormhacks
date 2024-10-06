import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">upload</button>
            </form>
        </div>
    )
}

export default Start