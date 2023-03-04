import React, { useEffect, useState } from "react";
import { clearState } from "../features/inputSlice";
import { Cv } from "../components/Cv";
import { useSelector, useDispatch } from "react-redux";
import arrow from "../assets/arrow-back.svg";
import XButton from "../assets/X.png";
import { Link } from "react-router-dom";

const Resume = () => {
  const { stateFromAPI } = useSelector((state) => state.inputInfo);
  const dispatch = useDispatch();
  const [successPopup, setSuccessPopup] = useState(true);

  const imageUrl = `https://resume.redberryinternship.ge${stateFromAPI.image}`;

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload(true);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSuccessPopup(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
 
  useEffect(() => {
    localStorage.clear();
    dispatch(clearState());
  }, []);

  const changedData = {
    ...stateFromAPI,
    image: imageUrl,
  };

  return (
    <div className="relative flex  justify-center  p-12 ">
      <Link
        onClick={() => clearLocalStorage()}
        to="/"
        className="absolute top-11 left-12 w-10 h-10"
      >
        <img src={arrow} alt="back button" />
      </Link>

      <Cv data={changedData} width="w-1/2" border="border-black" />

      {successPopup && (
        <div
          className=" flex ml-10 mr-10 p-8  mx-8 border border-solid 
      border-[#E4E4E4] rounded-lg bg-white shadow-lg w-72 lg:w-96 h-48 "
        >
          <h2 className="text-2xl font-bold">
            რეზიუმე წარმატებით გაიგზავნა 🎉
          </h2>
          <img
            onClick={() => setSuccessPopup(false)}
            className="cursor-pointer w-7 h-7"
            src={XButton}
            alt="ximg"
          />
        </div>
      )}
    </div>
  );
};

export default Resume;
