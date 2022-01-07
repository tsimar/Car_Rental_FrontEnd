import React from 'react'
import './Cars.css'

const L=()=>React.createElement('div',{className:"add"},"Hello")

const test=()=>{
    return(
        <div>
            <ul>
              {/* <l />   */}
              <li>
                 <L/>
              </li>
              
            </ul>
            
        </div>
    );
};

export default test;