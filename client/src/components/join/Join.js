import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import './Join.css'

function Join(props) {
const [name, setName] = useState('');
const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
            <h1 className="heading">join</h1>
            <div><input type="text" placeholder='Name' className='joinInput' onChange={(event) => setName(event.target.value)} /></div>
            <div><input type="text" placeholder='Room' className='joinInput mt-20' onChange={(event) => setRoom(event.target.value)} /></div>
            <Link onClick={(event)=>(!name||!room)? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
            <button className='button mt20' type='submit'>Sign In</button>
            </Link>
            </div>
        </div>
    );
}

export default Join;