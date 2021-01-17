import React from 'react'
import './notifiy.css'
const Notification = (props) => {
    const {message} = props;
    return (
        <div>
            <h1 className='error'>{message}</h1>
        </div>
    )
}

export default Notification
