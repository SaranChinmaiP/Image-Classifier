import { useState } from "react";
import React from "react";

export default function ImageList({ imgSrc, index, keyId, imageDeleteOperation }) {

  const [active, setActive] = useState(true);
  function handleimageDeleteOperation(id) {
    setActive(false);
    console.log(id, ": Image Deleted");
    imageDeleteOperation(keyId, id);
  }
  return (
    
    <React.Fragment>
        { active && 
      <div className="modalUnit">
        <div className="modalImageUnit">
           <img width={100} height={100} alt="index here" src={imgSrc.src} />
          <button
            id={index}
            className="closeModalBtn"
            onClick={(e) => {
              handleimageDeleteOperation(e.target.id);
            }}
          >
            &times;
          </button>
        </div>
      </div>
}
    </React.Fragment>
  );
}


