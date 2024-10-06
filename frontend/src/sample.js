import React, { useState } from 'react';

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
            const res = await fetch('http://localhost:8080/api/process/', {
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
                    <h3>Number of Colonies: {response.num_colonies}</h3>
                    <img src={response.image_url} alt="Contour" />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
