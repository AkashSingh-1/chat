import React from 'react'
import './infobar.css'
 

const Infobar=({room})=>{
   
    
    return(
    <div className="infobar">

        <div className="leftInnerContainer">
        
            <h3 className="room-name">Chat-Chord</h3>
        </div>
        <div className="rightInnerContainer">
            <a className="cross" href="/">  <div id="first"></div><div id="second"></div> </a>
        </div>
    </div>
)}

export default Infobar