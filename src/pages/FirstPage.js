import React from "react";
import { Link } from "react-router-dom";
import redberryLogo from "../assets/redberry-logo-text.png";
import redberryLogo2 from "../assets/firstPageLogo.png";

const FirstPage = () => {
  return (
    <div className="flex flex-col  w-full h-screen bg-firstPageBg bg-cover bg-no-repeat  ">
      <div className=" px-16 py-6 ">
        <div className="flex flex-col w-full  ">
          <img src={redberryLogo} alt="redberry" className="w-60 h-10 mb-6" />
          <div className="bg-black h-px"></div>
        </div>
      </div>

      <section
        className=" flex justify-center items-center h-screen
      "
      >
        <div className=" flex w-1/2 relative h-[20rem] items-center justify-center">
          <Link
            to="/personal-information"
            className=" absolute top-16 z-20 text-white lg:w-[24rem] xl:w-[26rem] 2xl:w-[29rem] items-center justify-center bg-[#1A1A1A] hover:bg-[#24292F]/90  focus:outline-none
        font-medium rounded-xl text-xl px-[3.75rem] py-[1.125rem] text-center inline-flex	"
          >
            რეზიუმეს დამატება
          </Link>

          <img
            src={redberryLogo2}
            alt="logo2"
            className=" z-10 absolute right-14 bottom-0 w-[18.75rem] h-[18.75rem]  "
          />
        </div>
      </section>
    </div>
  );
};

export default FirstPage;
