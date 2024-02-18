import { Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useEffect, useRef, useState } from "react";
import { FilterContext } from "../App";
import "../styles/instagram.css";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import axios from "axios";

const StyleBox = styled(Box)({
  background: "#ddd",
  minHeight: "20rem",
  maxHeight: "100vh",
  marginBottom: "1rem",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});

const StyledImage = styled("img")((props) => ({
  width: "100%",
  height: "100%",
  objectFit: "contain",
  filter: `contrast(${props.customFilter.contrast}%) brightness(${props.customFilter.brightness}%) saturate(${props.customFilter.saturate}%) sepia(${props.customFilter.sepia}%) grayScale(${props.customFilter.gray}%)`,
}));

const ImageField = (props) => {
  const curImg = props.curImg;
  // const [data, setData] = useState(null);
  const uploadInputRef = useRef(null);
  const imgResultRef = useRef(null);
  const [imageFile, setImageFile] = useState(
    "https://www.remotion.dev/img/social-preview.png"
  );
  const { filterClass, customFilter } = useContext(FilterContext);

  const handleChangeInput = (e) => {
    setImageFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleDownloadImage = () => {
    domtoimage
      .toBlob(imgResultRef.current)
      .then(function (blob) {
        saveAs(blob, "result.png");
      })
      .catch(function (error) {
        console.error("ooops, something went wrong!", error);
      });
  };

  const renderImage = () => (
    <figure style={{ width: "100%", height: "100%" }}>
      <StyledImage
        customFilter={!filterClass && customFilter}
        className={filterClass}
        src={imageFile}
        alt=""
        ref={imgResultRef}
      />
    </figure>
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const url = "http://10.100.161.49:3000/api/get-latest-video-content";
  //       const response = await axios.get(url);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    if (curImg) {
      console.log(curImg);
      setImageFile(curImg);
    }
  }, [curImg]);

  return (
    <div className="w-5/6 flex flex-col justify-center items-center">
      {imageFile ? renderImage() : {}}

      <div className="p-4 pt-8 text-4xl"><Button
        onClick={handleDownloadImage}
        disabled={!imageFile}
        variant="contained"
        color="success"
      >
        Download Image
      </Button></div>
    </div>
  );
};

export default ImageField;
