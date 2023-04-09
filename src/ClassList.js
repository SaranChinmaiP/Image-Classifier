
import ClassCard from "./ClassCard";

import React from "react";
import './dataSide.css'


export default function ClassList({trainingData,updateOperation,deleteOperation,imageDeleteOperation}) {
    
  return (
    <React.Fragment>
        {
            trainingData.map((object,index)=>{
                return( <ClassCard object={object} updateOperation={updateOperation} deleteOperation={deleteOperation} imageDeleteOperation={imageDeleteOperation} key={object.key}></ClassCard>  )
            })
        }

    </React.Fragment>
      
  )
}
