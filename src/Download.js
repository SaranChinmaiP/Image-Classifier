import React from 'react'
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
function Download({modelDownload}) {
    function handleSave(){
        modelDownload();
    }
  return (
    <React.Fragment>
      <Card sx={{ width: 300 }}>
      <CardContent>
        <center>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              handleSave();
            }}
          >
            Download
          </Button>
        </center>

        
      </CardContent>
    </Card>
    </React.Fragment>
  )
}

export default Download
