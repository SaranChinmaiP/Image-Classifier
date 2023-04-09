import React from 'react';
import Chip from './Chips';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function PredictionList({ predictionArrayOut, CLASS_NAMES }) {
console.log("Prediction List" , CLASS_NAMES);
  return (
    <React.Fragment>
      <Card  sx={{ maxWidth: '300px' , padding: '1rem'  }} >
        <CardContent>
          {
            predictionArrayOut.map((element, index) => {
              return (<Chip key ={index} element={element} CLASS_NAME={CLASS_NAMES[index]} index={index}></Chip>
              )


            })

          }
        </CardContent>
      </Card>

    </React.Fragment>
  )
}


