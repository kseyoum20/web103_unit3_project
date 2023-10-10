import React from 'react'
import '../css/Event.css'

const Event = (props) => {
    return (
        <article className='event-information'>
            <img src={props.event.image_url} alt={props.event.event_name} />
            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{props.event.event_name}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {props.event.event_date}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
