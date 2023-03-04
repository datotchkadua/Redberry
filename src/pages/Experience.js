import React, { useEffect } from "react";

import ExperienceForm from "../components/ExperienceForm";
import { Link } from "react-router-dom";
import arrow from "../assets/arrow-back.svg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addExperience,
  trueValidationExperience,
  falseValidationExperience,
} from "../features/inputSlice";
import { Cv } from "../components/Cv";

const Experience = () => {
  const { validationExperience } = useSelector((state) => state.inputInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const experiences = useSelector((state) => state.inputInfo.experiences);
  const state = useSelector((state) => state.inputInfo);

  const openEducation = () => {
    if (validationExperience) {
      navigate("/educations");
    }
  };

  const testvalidation = () => {
    const allExperiencesValid = experiences.every((experience) => {
      const { position, employer, start_date, due_date, description } =
        experience;
      return (
        position.length >= 2 &&
        employer.length >= 2 &&
        start_date !== "" &&
        due_date !== "" &&
        description.length >= 2
      );
    });

    if (allExperiencesValid) {
    
      localStorage.setItem("validationExperience", "true"); // Set the value in localStorage directly
      dispatch(trueValidationExperience());
    } else {
     
      localStorage.setItem("validationExperience", "false"); // Set the value in localStorage directly
      dispatch(falseValidationExperience());
    }
  };

  const addExperienceComponent = () => {
    dispatch(addExperience());
  };

  useEffect(() => {
    testvalidation();
    const experienceStr = JSON.stringify(experiences);
    localStorage.setItem("experiences", experienceStr);
  }, [experiences, dispatch]);

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload(true);
  };

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
            <h1 className="text-2xl font-bold ">გამოცდილება</h1>
            <h3 className="font-bold">2/3</h3>
          </div>
          <div className="bg-black h-px mt-3 "></div>
        </div>
        {experiences.map((_, index) => (
          <ExperienceForm key={index} experienceIndex={index} />
        ))}

        <div className="mt-12 bg-[#C1C1C1] h-px"></div>
        <div className="mt-10">
          <button
            className=" rounded-md text-white
           bg-[#62a1eb] hover:bg-[#72aaed] duration-300 h-12 w-72"
            onClick={addExperienceComponent}
          >
            მეტი გამოცდილების დამატება
          </button>
          <div className="mt-14 flex flex-col lg:flex-row justify-between">
            <Link
              to="/personal-information"
              className=" flex justify-center items-center h-12 w-72 lg:w-36 lg:h-12 bg-[#6B40E3]
             hover:bg-[#9747FF] active:bg-[#512FAF] duration-300 
            my-12  rounded
        text-white tracking-widest  
         "
            >
              უკან
            </Link>
            <button
              onClick={openEducation}
              className="h-12 w-72 lg:w-36 lg:h-12 bg-[#6B40E3]
             hover:bg-[#9747FF] active:bg-[#512FAF] duration-300 
            my-12  rounded
        text-white tracking-widest  
         "
            >
              შემდეგი
            </button>
          </div>
        </div>
      </div>
      <Cv data={state} width="w-2/5" border="border-white" />
    </div>
  );
};

export default Experience;
