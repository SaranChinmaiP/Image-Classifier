import React from "react";
// import ModalView from './ModalView';
import ImageList from './ImageList';
import "./dataSide.css";
export default function ModalList({ object, imageDeleteOperation }) {
  const { key, labelArray } = object;

  return (
    <React.Fragment >
      {labelArray.map((imgSrc, index) => {
        return (
          <ImageList
            imgSrc={imgSrc}
            index={index}
            keyId={key}
          
            imageDeleteOperation={imageDeleteOperation}
            key = {index}
          ></ImageList>
        );
      })}
    </React.Fragment>
  );
}

