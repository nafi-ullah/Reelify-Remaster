import { Box, Container, Grid } from "@mui/material";
import { createContext, useState, useEffect } from "react";
import CustomFilter from "./components/CustomFilter";
import FilterTabs from "./components/FilterTabs";
import ImageField from "./components/ImageField";
import InstaFitler from "./components/InstaFitler";
import "./global.css";
import axios from "axios";
import ForgetPasswordModal from "./components/ForgetPasswordModal";

export const FilterContext = createContext();
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curIndx, setCurIndx] = useState(0);
  const [data, setData] = useState(null);
  const [tabFilter, setTabFilter] = useState("customFilter");
  const [filterClass, setFilterClass] = useState("");
  const [customFilter, setCustomFilter] = useState({
    contrast: 100,
    brightness: 100,
    saturate: 100,
    sepia: 0,
    gray: 0,
  });

  const value = {
    tabFilter,
    setTabFilter,
    filterClass,
    setFilterClass,
    customFilter,
    setCustomFilter,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://10.100.161.49:3000/api/get-latest-video-content";
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {}, [data]);

  return (
    <FilterContext.Provider value={value}>
      <div className="w-screen h-screen bg-black flex flex-col no-scroll-pls">
        <ForgetPasswordModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalInputPre = {data ? data.imageScripts[curIndx] : ""}
          imageUrl = {data ? data.imageUrls[curIndx] : ""}
          promptIndex = {curIndx}
        />
        <div className="text-white text-4xl font-bold p-5 text-center">
          <span className="text-blue-300"> Re:elify </span> REMASTER
        </div>
        <div className="flex w-full h-full">
          <div className="min-w-[30%] w-1/3 bg-slate-700 m-8 rounded-xl text-black no-scroll-pls">
            {data ? (
              <div className="flex gap-2 flex-wrap">
                {" "}
                {data.imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    onClick={() => {
                      setCurIndx(index);
                    }}
                    className="w-5/12 mt-6 ml-6 mr-2 mb-2 rounded-lg shadow-2xl border-black"
                  />
                ))}{" "}
              </div>
            ) : (
              <div className="h-full flex justify-center items-center text-5xl text-black overflow-scroll">
                NO PHOTOS
              </div>
            )}
          </div>
          <div className="flex">
            <div className="w-7/12 flex flex-col justify-evenly items-center">
              <ImageField
                curImg={
                  data
                    ? data.imageUrls[curIndx]
                    : "https://www.remotion.dev/img/social-preview.png"
                }
              />
            </div>
            <div className="text-xl w-5/12 flex flex-col justify-around items-center">
              <div className="bg-slate-500 h-5/12 w-11/12 rounded-2xl shadow-xl p-6 flex flex-col justify-start align-middle">
                <div>
                  <FilterTabs />
                </div>
                {tabFilter === "instaFilter" ? (
                  <InstaFitler />
                ) : (
                  <CustomFilter />
                )}
              </div>
              <div onClick={() => {
                setIsModalOpen(true);
              }} className="bg-slate-800 text-slate-200 h-5/12 w-11/12 rounded-2xl shadow-xl p-6 flex flex-col justify-start align-middle font-mono">
                <h1 className="text-amber-500 font-bold">prompt:</h1>
                <div >
                  {data
                    ? data.imageScripts[curIndx]
                    : "a quick brown fox jumps over the lazy dog. a quick brown fox jumps over the lazy dog. a quick brown fox jumps over the lazy dog. a quick brown fox jumps over the lazy dog."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FilterContext.Provider>
  );
}

export default App;
