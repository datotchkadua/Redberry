import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import arrow from "../assets/arrow-back.svg";
import Input from "./Input";
import { Cv } from "./Cv";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { falseValidation, trueValidation } from "../features/inputSlice";

const PersonalInformation = () => {
  const { validationPersonal, name, surname, email, phone_number, image } =
    useSelector((state) => state.inputInfo);

  const state = useSelector((state) => state.inputInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openExperience = () => {
    if (validationPersonal) {
      navigate("/experience");
    }
  };
  const testvalidation = () => {
    if (
      /^[\ა-ჰ]{2,}$/.test(name) &&
      /^[\ა-ჰ]{2,}$/.test(surname) &&
      /^[a-zA-Z0-9]+@redberry.ge$/.test(email) &&
      /^\+995\s5\d{2}\s\d{2}\s\d{2}\s\d{2}$/.test(phone_number) &&
      image
    ) {
      localStorage.setItem("validationPersonal", "true");
      dispatch(trueValidation());
    } else {
      localStorage.setItem("validationPersonal", "false");
      dispatch(falseValidation());
    }
  };
  useEffect(() => {
    testvalidation();
  }, [dispatch, name, surname, email, phone_number, image]);

  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-3/5 relative py-12 px-[8.375rem]">
        <Link to="/" className="absolute top-11 left-12 w-10 h-10">
          <img src={arrow} alt="back button" />
        </Link>

        <div className="flex flex-col w-full mb-[3rem]">
          <div className=" flex space-x justify-between">
            <h1 className="text-2xl font-bold ">პირადი ინფო</h1>
            <h3 className="font-bold">1/3</h3>
          </div>
          <div className="bg-black h-px mt-3 "></div>
        </div>

        <div className="flex flex-col space-y-10 ">
          <div className="flex space-x-0 flex-col xl:flex-row xl:space-x-2 ">
            <Input
              label="სახელი"
              placeholder="ანზორ"
              description="მინიმუმ 2 ასო, ქართული ასოები"
              required="required"
              inputId="name"
              pattern={/^[ა-ჰ]{2,}$/}
              width="w-full"
            />
            <Input
              label="გვარი"
              placeholder="მუმლაძე"
              description="მინიმუმ 2 ასო, ქართული ასოები"
              required="required"
              inputId="surname"
              pattern={/^[ა-ჰ]{2,}$/}
              width="w-full"
            />
          </div>
          {/* img */}
          <div>
            <Input inputId="image" />
          </div>
          {/* img */}

          <Input
            label="ჩემ შესახებ (არასავალდებულო)"
            placeholder="ზოგადი ინფო შენ შესახებ"
            inputId="about_me"
          />
          <Input
            label="ელ.ფოსტა"
            placeholder="anzor666@redberry.ge"
            description="უნდა მთავრდებოდეს @redberry.ge-ით"
            required="required"
            inputId="email"
            pattern={/^[a-zA-Z0-9]+@redberry.ge$/}
            width="w-full"
            type="email"
          />
          <Input
            label="მობილურის ნომერი"
            placeholder="+995 551 12 34 56"
            description="უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
            required="required"
            inputId="phone_number"
            pattern={/^\+995\s5\d{2}\s\d{2}\s\d{2}\s\d{2}$/}
            width="w-full"
            type="tel"
          />
        </div>
        <div className="flex justify-end ">
          <button
            className=" w-36 h-12 bg-[#6B40E3]
             hover:bg-[#9747FF] active:bg-[#512FAF] duration-300 
            my-12  rounded
        text-white tracking-widest  
         "
            onClick={openExperience}
          >
            შემდეგი
          </button>
        </div>
      </div>

      <Cv data={state} width="w-2/5" border="border-white" />
    </div>
  );
};

export default PersonalInformation;
