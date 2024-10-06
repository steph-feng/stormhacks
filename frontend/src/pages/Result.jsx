import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const { res } = location.state;

    return (
        <div>
            <div>
                <img src={`http://localhost:8000${res.image_url}`} alt="processed" />
            </div>
        </div>
    );
};

export default Result;
