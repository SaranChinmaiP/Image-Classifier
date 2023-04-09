import React, { useState, useRef } from "react";
import ModalList from "./ModalList";
//Class Card Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import EditIcon from "@mui/icons-material/Edit";
//Camera Input Imports
import Webcam from "react-webcam";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CameraIcon from "@mui/icons-material/Camera";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";

import "./dataSide.css";

import Modal from "@mui/material/Modal";

const videoConstraints = {
  width: 225,
  height: 225,
  facingMode: "user",
};

export default  function ClassCard({
  object,
  updateOperation,
  deleteOperation,
  imageDeleteOperation,
}) {
  const { key, label, labelArray } = object;
  const [labelName, setLabelName] = useState(label);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleNameChange(e) {
    const bool = 1;
    setLabelName(e.target.value);
    updateOperation(bool, key, labelName);
  }

  function handleDelete() {
    console.log("Handling Delete Event");
    deleteOperation(key);
  }
  return (
    <React.Fragment>
      <Card sx={{ width: 400}} raised={true}>
        <CardContent>
          <header>
            <TextField
              sx={{ width: 100 }}
              hiddenLabel
              id="className"
              variant="standard"
              size="small"
              value={labelName}
              onChange={(e) => handleNameChange(e)}
            />
            <EditIcon fontSize="small" />

            <IconButton
              onClick={handleDelete}
              size="small"
              sx={{ float: "right" }}
            >
              <DeleteForeverIcon></DeleteForeverIcon>
            </IconButton>
          </header>
          <Divider />
          <IconButton onClick={()=> handleOpen()} sx={{ float: "right" }}>
            <AppRegistrationIcon></AppRegistrationIcon>
          </IconButton>

          <Modal open={open} onClose={()=> handleClose()}>
            <Box sx={style}>
              <h5>
                {" "}
                Label : {labelName} -- Count : {labelArray.length}{" "}
              </h5>
              <ModalList
                object={object}
                imageDeleteOperation={imageDeleteOperation}
              ></ModalList>
            </Box>
          </Modal>
          <article>
            <p className="addSamples">Add Samples :</p>
            <span className="addSamples">Count : {labelArray.length}</span>
<br/>
            <DataInputComponent
              object={object}
              updateOperation={updateOperation}
            >
              {" "}
            </DataInputComponent>
          </article>
        </CardContent>
      </Card>
      <br></br>
    </React.Fragment>
  );
}

function DataInputComponent({ object, updateOperation }) {
  const key = object.key;
  const webcamRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  function capture() {
    const bool = 2;
    let newImageObj = new Image();
    //Might Take Dimension Details
    const imageSrc = webcamRef.current.getScreenshot();
    newImageObj.src = imageSrc;
    console.log("Took The ScreenShot of Key ID : " + key);
    updateOperation(bool, key, newImageObj);
  }

  function base64Handler(file) {
    try{
    let base64String = "";
    const bool = 2;

    let reader = new FileReader();

    reader.onload = function () {
      base64String = reader.result;
      let newImageObj = new Image();
      newImageObj.src = base64String;
      updateOperation(bool, key, newImageObj);
    };
    reader.readAsDataURL(file);
  }
  catch(e){
    console.log("Error : File Input Operation Aborted (Class Card List) ");
  }
  }

  function handleMutliInput(e) {
    const files = e.target.files;
    if(files.length){    
    for (let i = 0; i < files.length; i++) {
      base64Handler(files[i]);
      console.log("Handling Mutli Input Event", i);
    }
  }
  }

  if (!videoPlaying) {
    return (
      <>
        <IconButton
          size="small"
          color="primary"
          aria-label="Open Camera"
          onClick={() => setVideoPlaying(true)}
          style={{ float: "left" }}
        >
          <CameraAltIcon />
        </IconButton>
        <IconButton
          size="small"
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            accept="image/*"
            onChange={(e) => {
              handleMutliInput(e);
            }}
            multiple="multiple"
            type="file"
          />
          <DriveFolderUploadIcon />
        </IconButton>
      </>
    );
  } else {
    return (
      <>
        <div>
          <div className="webCamUnit">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              mirrored={true}
            />

            <button
              className="closeCameraBtn"
              onClick={() => setVideoPlaying(false)}
            >
              &times;
            </button>
          </div>
          <br />
          <IconButton
            style={{ marginLeft: 50 }}
            color="primary"
            onClick={capture}
            size="small"
          >
            {" "}
            <CameraIcon fontSize="small" />
            {" Hold"}
          </IconButton>
        </div>
      </>
    );
  }
}



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '65vw',
  bgcolor: "background.paper",
  border: "2px dotted #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  maxHeight: "80%",
};
