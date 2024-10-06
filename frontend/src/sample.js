import React, { useState } from 'react';

/* for testing only */

const ImageUpload = () => {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);

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
            setResponse(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>

            {response && (
                <div>
                    <img src={`http://localhost:8000${response.image_url}`} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
