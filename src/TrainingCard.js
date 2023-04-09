import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";

export default function TrainingCard({
  readOperation,
  currentEpoch,
  startCycle,
}) {
  const [epochs, setEpochs] = useState(25);
  const [batchSize, setBatchSize] = useState(16);
  // const [trainingState, setTrainingState] = useState(false);

  const [learningRate, setLearningRate] = useState(0.001);

  function handleTrain() {
    window.alert("Training Started , Don't Leave the Page , WAIT ");
    // setTrainingState(true);
    readOperation(epochs, batchSize);
  }

  return (
    <Card sx={{ width: 300 }}>
      <CardContent>
        <center>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              handleTrain();
            }}
          >
            train
          </Button>
        </center>

        <hr />
        <>
          <TextField
            inputProps={{
              maxLength: 2,
              step: "5",
              min: 10,
              max: 100,
            }}
            label="Epochs"
            type="number"
            size="small"
            value={epochs}
            onChange={(e) => {
              setEpochs(e.target.value);
            }}
            sx={{ maxWidth: 90, marginRight: "5px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            inputProps={{
              maxLength: 2,
              step: "0.01",
              min: 0.001,
              max: 0.1,
            }}
            label="Learning Rate"
            type="number"
            size="small"
            value={learningRate}
            onChange={(e) => {
              setLearningRate(e.target.value);
            }}
            sx={{ maxWidth: 150 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </>
        <br />
        <TextField
          disabled
          inputProps={{
            maxLength: 2,
            step: "16",
            min: 16,
            max: 100,
          }}
          label="Batch Size"
          type="number"
          size="small"
          value={batchSize}
          onChange={(e) => {
            setBatchSize(e.target.value);
          }}
          sx={{ maxWidth: 150, marginTop: "1rem" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <hr></hr>
        <div
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            fontSize: "small",
            fontWeight: "bold",
          }}
        >
          Epoch : {currentEpoch} / {epochs}
        </div>
        {startCycle && (
          <>
            <LinearProgress sx={{ marginTop: "1rem" }} color="success" />
          </>
        )}
      </CardContent>
    </Card>
  );
}
