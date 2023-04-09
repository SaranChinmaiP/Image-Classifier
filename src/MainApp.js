import React, { useState } from "react";
import *  as tf from "@tensorflow/tfjs";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import ClassList from "./ClassList";
import AddCard from "./AddCard";
import TrainingData from "./TrainingData";
import PredictionList from "./PredictionList";
import TrainingCard from "./TrainingCard";
import "./dataSide.css";
import OutputCard from './OutputCard';
import Download from "./Download";

export default function MainApp() {
  const [trainingData, setTrainingData] = useState(TrainingData);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [startCycle, setStartCycle] = useState(false)
  const [predictBool, setPredictBool] = useState(false)
  const [predictionArrayOut, setPredictionArrayOut] = useState([]);
  function createOperation() {
    console.log("Info : Create Operation Called");
    const templateObject = {
      key: generateKey(),
      label: "New Class",
      labelArray: [],
    };
    const copy = [...trainingData, templateObject];
    setTrainingData(copy);
    console.log(templateObject, "Info : createOperation Called");
  }

  function readOperation(epochs, batchSize) {
    setStartCycle(true);
    console.log("Info : Read Operation Called");
    init(epochs, batchSize);
  }
  function updateOperation(bool, key, newEdit) {
    if (bool === 1) {
      console.log("Info : Name Update Operation Called");
      let updatedData = trainingData.map((object) => {
        return object.key === key
          ? { ...object, label: newEdit }
          : { ...object };
      });
      setTrainingData(updatedData);
    } else if (bool === 2) {
      console.log("Info : Image Update Operation Called");
      // let updatedData = trainingData.map((object)=>{
      //     return object.key === key ? object['labelArray'].push(newEdit)  : object ;
      // })
      // setTrainingData(updatedData) ;
      for (let i = 0; i < trainingData.length; i++) {
        if (trainingData[i].key === key) {
          trainingData[i].labelArray.push(newEdit);
          break;
        }
      }
    } else {
      console.log("Error :  Update Operation Called");
    }
  }

  function deleteOperation(key) {
    console.log("Info : Delete Operation Called");
    let updatedData = trainingData.filter((object) => {
      return object.key !== key;
    });
    setTrainingData(updatedData);
  }

  function imageDeleteOperation(uniqueKey, indexKey) {
    console.log("Image Removed", indexKey, uniqueKey);
    for (let i = 0; i < trainingData.length; i++) {
      if (trainingData[i].key === uniqueKey) {
        trainingData[i].labelArray.splice(indexKey, 1);
        break;
      }
    }
  }

  return (
    <React.Fragment>
      <Grid className="mainGrid" container spacing={2}>
        <Grid item lg={4} xs="auto">
          <Box className="grid1" sx={styleGrid1}>
            <ClassList
              imageDeleteOperation={imageDeleteOperation}
              trainingData={trainingData}
              updateOperation={updateOperation}
              deleteOperation={deleteOperation}
            ></ClassList>
          </Box>

          <AddCard createOperation={createOperation}></AddCard>
        </Grid>
        <Grid item lg={4} xs="auto">
          <Box className="grid2">
            {" "}
            <TrainingCard readOperation={readOperation} currentEpoch={currentEpoch} startCycle={startCycle}> </TrainingCard>
            {predictBool && <Download modelDownload={modelDownload}> </Download>}

          </Box>
        </Grid>
        <Grid item lg={4} xs="auto">
          <div className="grid3" >

            <OutputCard predictImage={predictImage} predictionArrayOut={predictionArrayOut} predictBool={predictBool}></OutputCard>
            {
              predictBool &&
              <div className="grid4">
                <PredictionList predictionArrayOut={predictionArrayOut} CLASS_NAMES={CLASS_NAMES}> g</PredictionList>
              </div>
            }

          </div>

        </Grid>
      </Grid>
    </React.Fragment>
  );





  function init(epochParamter, batchSizeParameter) {
    try {
      myTrainingData = [...trainingData];
      outputNeurons = myTrainingData.length;
      fillTrainingDataLoop(myTrainingData);

      console.log("Called Init From Training ");
      modelCompile(outputNeurons);
      trainModel(epochParamter, batchSizeParameter);
    } catch (e) {
      console.log(e);
      window.alert(e);
    }

  }

  function modelCompile(outputNeurons) {
    try {
      model.add(
        tf.layers.dense({ inputShape: [1024], units: 128, activation: "relu" })
      );
      model.add(tf.layers.dense({ units: outputNeurons, activation: "softmax" }));
      model.summary();
      model.compile({
        optimizer: "adam",
        loss:
          outputNeurons === 2
            ? "binaryCrossentropy"
            : "categoricalCrossentropy",
        metrics: ["accuracy"],
      });
    } catch (e) {
      console.log(e);
      window.alert(e);
    }
  }
  //filling Data Here
  function fillTrainingDataLoop(myTrainingData) {
    for (let i = 0; i < myTrainingData.length; i++) {
      CLASS_NAMES.push(myTrainingData[i].label);
      let subArray = myTrainingData[i].labelArray;
      for (let x = 0; x < subArray.length; x++) {
        let imageFeatures = calculateFeaturesOnCurrentFrame(subArray[x]);
        trainingDataInputs.push(imageFeatures);
        trainingDataOutputs.push(i);
      }
    }

  }

  function calculateFeaturesOnCurrentFrame(imageFeed) {
    console.log("Info : calculateFeaturesOnCurrentFrame1 Called");
    return tf.tidy(function () {
      // Grab pixels from current Array
      let videoFrameAsTensor = tf.browser.fromPixels(imageFeed);
      // Resize video frame tensor to be 224 x 224 pixels which is needed by MobileNet for input.
      let resizedTensorFrame = tf.image.resizeBilinear(
        videoFrameAsTensor,
        [MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH],
        true
      );
      let normalizedTensorFrame = resizedTensorFrame.div(255);
      let answer = mobilenet.predict(normalizedTensorFrame.expandDims()).squeeze();
      return answer;
      // console.log(answer)
    });
  }


  async function trainModel(epochParamter, batchSizeParameter) {
    try {
      tf.util.shuffleCombo(trainingDataInputs, trainingDataOutputs);

      let outputsAsTensor = tf.tensor1d(trainingDataOutputs, "int32");
      let oneHotOutputs = tf.oneHot(outputsAsTensor, outputNeurons);
      let inputsAsTensor = tf.stack(trainingDataInputs);
      await model.fit(inputsAsTensor, oneHotOutputs, {
        shuffle: true,
        batchSize: batchSizeParameter,
        //epoch parameter can be varied in the page through input box.
        epochs: epochParamter,
        callbacks: { onEpochEnd: logProgress },
      });

      outputsAsTensor.dispose();
      oneHotOutputs.dispose();
      inputsAsTensor.dispose();
      setCurrentEpoch(epochParamter)
      setStartCycle(false);
      window.alert(" Training Completed")
      setPredictBool(true);
    } catch (e) {
      console.log(e);
      window.alert(e);
    }

  }
  /**
   * Logs the  training progress.
   **/

  function logProgress(epoch, logs) {
    AccuracyFactor = Math.floor(logs.acc * 100);
    LossFactor = Math.floor(logs.loss * 100);
    setCurrentEpoch(epoch + 1);
    console.log(`Training data for epoch : ${epoch + 1}`);
    console.log(`Accuracy : ${AccuracyFactor} %  Loss : ${LossFactor} %`);
  }

  /**
 *  Make live predictions from webcam once trained.
 * By Presing Predict Button on the Page.
 **/

  /* Updates the Confidence rate in the Bar Graphs Output*/

  function predictImage(isImage, newImageObj) {
    try {
      if (isImage) {
        tf.tidy(function () {
          let tempArray = []
          let imageFeatures = calculateFeaturesOnCurrentFrame(newImageObj);
          let prediction = model.predict(imageFeatures.expandDims()).squeeze();
          let highestIndex = prediction.argMax().arraySync();
          let predictionArray = prediction.arraySync();
          console.log(highestIndex, predictionArray)
          for (i = 0; i < CLASS_NAMES.length; i++) {
            rate = Math.floor(predictionArray[i] * 100);
            tempArray.push(rate)
          }
          setPredictionArrayOut(tempArray);
        });
      }
      else {
        console.log(" Not Image");
      }
    }
    catch (e) {
      console.log(e);
      window.alert("Train The Model First");
    }

  }

  async function modelDownload() {
    await model.save("downloads://my-model");
  }



}


let i = 0;
let rate = undefined;
const MOBILE_NET_INPUT_WIDTH = 224;
const MOBILE_NET_INPUT_HEIGHT = 224;
let myTrainingData = [{ key: 1502, label: 'Class 1', labelArray: [] }, { key: 2504, label: 'Class 2', labelArray: [], }];;
let mobilenet = undefined;
let trainingDataInputs = [];
let trainingDataOutputs = [];
let AccuracyFactor = 0;
let LossFactor = 0;
// let url = undefined;
// let link = undefined;
let CLASS_NAMES = [];
let outputNeurons = undefined;

const model = tf.sequential();
loadMobileNetFeatureModel();


/**
* Loads the MobileNet model and warms it up so ready for use.
**/
async function loadMobileNetFeatureModel() {
  const URL =
    "https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1";
  mobilenet = await tf.loadGraphModel(URL, { fromTFHub: true });

  // Warm up the model by passing zeros through it once.
  tf.tidy(function () {
    let answer = mobilenet.predict(
      tf.zeros([1, MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, 3])
    );
    console.log(answer.shape);
  });

  //End React Componet 
}


function generateKey() {
  const d = new Date();
  let keyId = d.getTime();
  return keyId;
}

const styleGrid1 = {
  overflowY: "scroll",
  maxHeight: "90%",
};

