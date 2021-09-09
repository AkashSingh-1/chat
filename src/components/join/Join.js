import React ,{useState}  from 'react'
import {Link} from 'react-router-dom'
import './join.css'

export const Join=()=>{
    const [name,setName]=useState('')
    const [room,setRoom]=useState('')
    // const [uname,setUname]=useState([])
    // const [rname,setRname]=useState([])
    return( 
    <div className='outerDiv'>
        <div className="innerDiv">
            <h1>Join</h1>
            <hr/>
            <input type="text" className="name" placeholder="name" onChange={(e)=> setName(e.target.value)}></input>
            <input type="text" className="room" placeholder="room" onChange={(e)=>setRoom(e.target.value)}></input>
            <Link className="signin" onClick={(e)=>{
            
                
                return(!name || !room)?(e.preventDefault()):null} }
                to={`/chat?name=${name}&room=${room}`}>
                <button className="btn" type='submit' >Sign In</button>
            </Link>
        </div>
     </div>          
    ) ;   
}        
 export default Join;            