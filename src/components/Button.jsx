// import React from 'react';

import "./Button.css";

const ButtonGeneric = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className="button">
            {children}
        </button>
    );
};
 
export default ButtonGeneric;