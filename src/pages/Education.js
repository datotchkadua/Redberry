import React, { useEffect } from "react";
import EducationForm from "../components/EducationForm";
import { Link } from "react-router-dom";
import arrow from "../assets/arrow-back.svg";
import { useSelector, useDispatch } from "react-redux";

import {
  addEducations,
  trueValidationEducation,
  falseValidationEducation,
  sendResume,
} from "../features/inputSlice";
import { useNavigate } from "react-router-dom";
import { Cv } from "../components/Cv";

const Education = () => {
  const { validationEducation, isPostSuccess } = useSelector(
    (state) => state.inputInfo
  );
  const state = useSelector((state) => state.inputInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const educations = useSelector((state) => state.inputInfo.educations);

  const testvalidation = () => {
    const allExperiencesValid = educations.every((education) => {
      const { institute, degree, due_date, description } = education;
      return (
        institute.length >= 2 &&
        degree !== "" &&
        due_date !== "" &&
        description.length >= 2
      );
    });

    if (allExperiencesValid) {
      localStorage.setItem("validationEducation", "true"); // Set the value in localStorage directly
      dispatch(trueValidationEducation());
    } else {
      localStorage.setItem("validationEducation", "false"); // Set the value in localStorage directly
      dispatch(falseValidationEducation());
    }
  };

  const addEducationComponent = () => {
    //dakkomentarebulia dabla
    dispatch(addEducations());
  };

  useEffect(() => {
    testvalidation();
    const educationsStr = JSON.stringify(educations);
    localStorage.setItem("educations", educationsStr);
  }, [educations, dispatch]);

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload(true);
  };

  const submitData = async () => {
    await dispatch(sendResume());
  };

  useEffect(() => {
    if (validationEducation && isPostSuccess) {
      navigate("/resume");
    }
  }, [validationEducation, isPostSuccess]);

  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-3/5 relative py-12 px-[8.375rem]">
        <Link
          onClick={() => clearLocalStorage()}
          to="/"
          className="absolute top-11 left-12 w-10 h-10"
        >
          <img src={arrow} alt="back button" />
        </Link>

        <div className="flex flex-col w-full mb-[3rem]">
          <div className="flex space-x justify-between">
            <h1 className="text-2xl font-bold ">განათლება</h1>
            <h3 className="font-bold">3/3</h3>
          </div>
          <div className="bg-black h-px mt-3 "></div>
        </div>
        {educations.map((_, index) => (
          <EducationForm key={index} educationIndex={index} />
        ))}

        <div className="mt-12 bg-[#C1C1C1] h-px"></div>
        <div className="mt-10">
          <button
            className=" rounded-md text-white
           bg-[#62a1eb] hover:bg-[#72aaed] duration-300 h-12 w-72"
            onClick={addEducationComponent}
          >
            მეტი გამოცდილების დამატება
          </button>
          <div className="mt-14 flex flex-col lg:flex-row justify-between">
            <Link
              to="/experience"
              className=" flex justify-center items-center h-12 w-72 lg:w-36 lg:h-12 bg-[#6B40E3]
             hover:bg-[#9747FF] active:bg-[#512FAF] duration-300 
            my-12  rounded
        text-white tracking-widest  
         "
            >
              უკან
            </Link>
            <button
              onClick={submitData}
              className="h-12 w-72 lg:w-36 lg:h-12 bg-[#6B40E3]
             hover:bg-[#9747FF] active:bg-[#512FAF] duration-300 
            my-12  rounded
        text-white tracking-widest  
         "
            >
              დასრულება
            </button>
          </div>
        </div>
      </div>
      <Cv data={state} width="w-2/5" border="border-white" />
    </div>
  );
};

export default Education;
