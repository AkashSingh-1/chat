import React from 'react'
import './input.css'

const Input=({message,setMessage,sendMessage})=>(
     <form className='form'>
       <div className="input-container">
            <input className="input" type="text" placeholder="type a message..."
                value={message}
                onChange={(e)=>{setMessage(e.target.value)}}
                onKeyPress={e=>e.key==='Enter'?sendMessage(e):null}
                ></input> 
                <button className="button" onClick={(e)=>sendMessage(e)}><i className="fas fa-paper-plane fa-2x"></i></button>
                
       </div>

     </form>
)

export default Input