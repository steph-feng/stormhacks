import React from 'react';
import { useLocation } from 'react-router-dom';
import './Result.css'

const Result = () => {
    const location = useLocation();
    const { res } = location.state;

    return (
        <div className="result-container">
            <div className="image-container">
                <div className="text">your colony count is: {res.num_colonies}</div>
                <img src={`http://localhost:8000${res.image_url}`} alt="processed" />
            </div>
        </div>
    );
};

export default Result;
