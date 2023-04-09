import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Webcam from "react-webcam";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CameraIcon from "@mui/icons-material/Camera";
const videoConstraints = {
    width: 225,
    height: 225,
    facingMode: "user",
};

export default function OutputCard({ predictImage, predictLive, predictBool }) {

    const [sampleTestImage, setSampleTestImage] = useState('sampleTestImage.jpg');
    const webcamRef = useRef(null);
    const [videoPlaying, setVideoPlaying] = useState(false);
    
    function capture() {
        let newImageObj = new Image(225, 225);
        //Might Take Dimension Details
        const imageSrc = webcamRef.current.getScreenshot();
        newImageObj.src = imageSrc;
        setSampleTestImage(newImageObj) ;
        predictImage(true, newImageObj);


    }



    //Render

    if (!videoPlaying) {
        return (
            <Card sx={{ padding: '1rem', maxWidth: '300px' }}>
                <CardContent>
                    <h6>Testing Area : Upload or Take a Live Shot</h6>
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
                                handleSingleInput(e);
                            }}
                            multiple="multiple"
                            type="file"
                        />
                        <DriveFolderUploadIcon />
                    </IconButton>
                    <img  width={225} height={225}  src={sampleTestImage.src} alt="Upload After Training"></img>
                </CardContent>
            </Card>
        );
    } else {
        return (
            <Card sx={{ padding: '1rem', maxWidth: '300px' }}>
                <CardContent>

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
                    <img  width={225} height={225}  src={sampleTestImage.src} alt="Live Shot :"></img>

                </CardContent>

            </Card>
        );
    }




    function handleSingleInput(e) {
        if (e.target.files.length) {
            console.log("Handling Single Input");
            base64Handler(e.target.files[0]);
        }

    }


    function base64Handler(file) {
        try {
            console.log("Info : Outputcard base64Handler called ");
            let base64String = "";
            let reader = new FileReader();
            reader.onload = function () {
                base64String = reader.result;
                let newImageObj = new Image(225, 225);
                newImageObj.src = base64String;
                setSampleTestImage(newImageObj);
                predictImage(true, newImageObj);

            };
            reader.readAsDataURL(file);
        }
        catch (e) {
            console.log("Error")
        }
    }
}












