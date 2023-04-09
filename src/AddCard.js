

import React from "react";
import './dataSide.css'

export default function AddCard({createOperation}) {
  return (
    <React.Fragment>
            <div className="addClassContainer">
                <button
                    id="addClassContainerBtn"
                    onClick={createOperation}
                >
                    {" + Add Class "}
                </button>
            </div>
    </React.Fragment>
      
  )
}
