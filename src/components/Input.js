import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import warningIcon from "../assets/warning.svg";
import successIcon from "../assets/success.svg";
import {
  updateInputPerson,
  updateExperience,
  updateEducations,
} from "../features/inputSlice";

const Input = ({
  inputId,
  pattern,
  type,
  required,
  label,
  placeholder,
  description,
  width,
  experienceIndex,
  educationIndex,
}) => {
  const [isBorderRed, setisBorderRed] = useState(false);

  let inputValue;
  const inputpersonal = useSelector((state) => state.inputInfo[inputId] || "");
  const { degrees } = useSelector((state) => state.inputInfo);

  const inputExperience = useSelector((state) => {
    const experience = state.inputInfo.experiences[experienceIndex];
    return experience ? experience[inputId] : "";
  });

  const inputEducation = useSelector((state) => {
    const education = state.inputInfo.educations[educationIndex];
    return education ? education[inputId] : "";
  });
  const educationIds = ["institute", "degree_id", "due_date", "description"];

  const experienceIds = [
    "position",
    "employer",
    "start_date",
    "due_date",
    "description",
  ];

  if (experienceIndex >= 0 && experienceIds.includes(inputId)) {
    inputValue = inputExperience;
  } else if (educationIndex >= 0 && educationIds.includes(inputId)) {
    inputValue = inputEducation;
  } else {
    inputValue = inputpersonal;
  }

  const patternRegex = new RegExp(pattern);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (inputId === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        dispatch(updateInputPerson({ inputId, value: reader.result }));
        localStorage.setItem(inputId, reader.result);
      };
    } else if (experienceIndex >= 0 && experienceIds.includes(inputId)) {
      dispatch(
        updateExperience({ inputId, value: e.target.value, experienceIndex })
      );
    } else if (educationIndex >= 0 && educationIds.includes(inputId)) {
      dispatch(
        updateEducations({ inputId, value: e.target.value, educationIndex })
      );
    } else {
      dispatch(updateInputPerson({ inputId, value: e.target.value }));

      localStorage.setItem(
        inputId,
        e.target.value !== "" ? e.target.value : ""
      );
    }
  };

  function formatNumber() {
    let formattedValue;
    if (inputId === "phone_number") {
      if (
        !inputValue.startsWith("+995") &&
        !inputValue.startsWith("995") &&
        inputValue.length === 9
      ) {
        formattedValue = `+995 ${inputValue.slice(0, 3)} ${inputValue.slice(
          3,
          5
        )} ${inputValue.slice(5, 7)} ${inputValue.slice(7)}`;
      } else if (inputValue.startsWith("995") && inputValue.length === 12) {
        formattedValue = `+${inputValue.slice(0, 3)} ${inputValue.slice(
          3,
          6
        )} ${inputValue.slice(6, 8)} ${inputValue.slice(
          8,
          10
        )} ${inputValue.slice(10)}`;
      } else if (inputValue.startsWith("+995") && inputValue.length === 12) {
        formattedValue = `${inputValue.slice(0, 4)} ${inputValue.slice(
          4,
          7
        )} ${inputValue.slice(7, 9)} ${inputValue.slice(
          9,
          11
        )} ${inputValue.slice(11)}`;
      }
      if (formattedValue) {
        dispatch(updateInputPerson({ inputId, value: formattedValue }));
        localStorage.setItem("phone_number", formattedValue);
      }
    }
  }

  useEffect(() => {
    if (patternRegex.test(inputValue)) {
      setisBorderRed(false);
    } else {
      setisBorderRed(true);
    }
    if (inputValue.length === 9 || inputValue.length === 12) {
      formatNumber();
    }
  }, [inputValue, isBorderRed]);

  return (
    <>
      {inputId === "image" ? (
        <div className="flex justify-between w-2/3 items-center">
          <h3 className="font-bold">პირადი ფოტოს ატვირთვა</h3>
          <label
            className=" bg-[#0e80bf] h-7 text-center
           text-white  px-5 rounded cursor-pointer"
          >
            ატვირთვა
            <input
              type="file"
              className="hidden"
              onChange={handleChange}
              required="required"
            />
          </label>
        </div>
      ) : inputId === "about_me" || inputId === "description" ? (
        <>
          <div className="flex flex-col space-y-2 mb-[3rem] ">
            <label className="font-bold"> {label}</label>
            <textarea
              className={`border min-h-[5rem] ${
                inputValue.length === 0
                  ? "border-empty"
                  : isBorderRed
                  ? "border-error"
                  : "border-success"
              } 
              focus:outline-none px-4 py-3.5`}
              value={inputValue}
              onChange={handleChange}
              placeholder={placeholder}
            ></textarea>
          </div>
        </>
      ) : inputId === "degree_id" ? (
        <>
          <div className="flex  flex-col w-full space-y-2 mr-2">
            <p className="font-bold"> ხარისხი</p>
            <select
              onChange={handleChange}
              className={` h-12 border  ${
                inputValue.length === 0
                  ? "border-empty"
                  : isBorderRed
                  ? "border-error"
                  : "border-success"
              }  rounded-sm 
               text-base px-4  
              py-3 focus:outline-none  `}
              name="cars"
              id="cars"
              value={inputValue}
            >
              <option value="" disabled hidden>
                აირჩიეთ ხარისხი
              </option>
              {degrees.map((degree) => {
                const { id, title } = degree;
                return (
                  <option key={id} value={id}>
                    {title}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      ) : (
        <>
          <div className={`flex flex-col w-full space-y-2   `}>
            <label className="font-bold">{label}</label>
            <div className="flex flex-row items-center">
              <input
                placeholder={placeholder}
                type={type}
                value={
                  inputId === "phone_number" ? inputValue.trim() : inputValue
                }
                onChange={handleChange}
                required={required}
                className={`${width} border h-12 rounded-sm  text-base px-4  
              py-3.5 focus:outline-none ${
                inputValue.length === 0
                  ? "border-empty"
                  : isBorderRed
                  ? "border-error"
                  : "border-success"
              }`}
              />
              {inputValue.length !== 0 && (
                <img
                  src={isBorderRed ? warningIcon : successIcon}
                  className="w-4 h-4 ml-2"
                  alt="imager"
                />
              )}
            </div>

            <p className="font-light text-sm leading-[21px] text-textgray">
              {description}
            </p>
          </div>
        </>
      )}
    </>
  );
};
export default Input;
