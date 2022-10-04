import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test', 'btn--outline2', 'btn-yellow', 'btn-red', 'btn-green', 'btn-blue', 'btn-gray'];
const SIZES = ['btn--medium', 'btn--large', 'btn--small'];

export const Btn = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    linkto,
    state
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link to={linkto} className='btn-mobile'>
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
                disabled={state}
            >
                {children}
            </button>
        </Link>
    );
};

export default Btn;