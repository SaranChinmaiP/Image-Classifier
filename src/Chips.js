import React from 'react'
import './dataSide.css'

export default function Chip({ element, index ,CLASS_NAME}) {
    return (

        <React.Fragment key={index}>
            <h6 style={{margin : 0 , padding : 0}}>{CLASS_NAME} : </h6>
            <div className="progress">
                <div style={{ background: `#${hexArray[index]}`, width: `${element}%` }} className="progress__fill"></div>
                <span className="progress__text" >{element}</span>
            </div>
        </React.Fragment>




    )
}

const hexArray = ["ff3300", "FFFF00", "e600e6", "e68a00", "0066ff", "1a53ff", "AFEEEE", "B0C4DE", "FFDEAD", "DCDCDC",
    "BA55D3", "20B2AA", "DDA0DD", "ffff1a", "00BFFF", "7FFF00", "ff1a66", "FFE4B5","ff3300", "FFFF00", "e600e6", "e68a00", "0066ff", "1a53ff", "AFEEEE", "B0C4DE", "FFDEAD", "DCDCDC",
    "BA55D3", "20B2AA", "DDA0DD", "ffff1a", "00BFFF", "7FFF00", "ff1a66", "FFE4B5"];