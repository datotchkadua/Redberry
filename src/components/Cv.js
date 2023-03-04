import React from "react";
import emailIcon from "../assets/gmail.svg";
import phoneIcon from "../assets/phone.svg";
import logo from "../assets/logo-bottom 1.svg";

export const Cv = ({ data, width, border }) => {
  const {
    name,
    surname,
    email,
    phone_number,
    image,
    about_me,
    experiences,
    educations,
  } = data;

  const hasNonEmptyFields = experiences.some((experience) => {
    const { position, employer, start_date, due_date, description } =
      experience;
    return (
      position.length > 0 ||
      employer.length > 0 ||
      start_date.length > 0 ||
      due_date.length > 0 ||
      description.length > 0
    );
  });
  const hasNonEmptyFieldsEducation = educations.some((experience) => {
    const { institute, degree_id, due_date, description } = experience;
    return (
      institute.length > 0 ||
      degree_id.length > 0 ||
      due_date.length > 0 ||
      description.length > 0
    );
  });

  return (
    <div className={` bg-white ${width} flex flex-col px-5 border ${border}`}>
      <div className="flex w-full  ">
        <div className="flex flex-col mt-16 ">
          <div className="flex flex-col  lg:flex-row ">
            <h1 className=" break-all mr-3 text-3xl font-bold color text-redText  ">
              {name}
            </h1>
            <h1 className=" break-all mr-3 text-3xl font-bold text-redText">
              {surname}
            </h1>
          </div>
          <div className="flex flex-col mt-5 space-y-2">
            <div className="flex space-x-2.5 items-center text-xl">
              {email && <img src={emailIcon} alt="" />}
              <h4>{email}</h4>
            </div>
            <div className="flex space-x-2.5 items-center text-xl">
              {phone_number && <img src={phoneIcon} alt="" />}
              <h4>{phone_number}</h4>
            </div>
          </div>
          {about_me && (
            <div className="flex flex-col max-w-md mt-6 space-y-3 xl:max-w-lg">
              <h3 className="font-bold text-redText text-xl">ჩემ შესახებ</h3>
              <p className="text-base break-all leading-snug">{about_me}</p>
            </div>
          )}
        </div>
        {image && (
          <div className=" w-2/5 flex  justify-end  ">
            <img
              src={image}
              alt="yjyh"
              className="mt-10  w-24 h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-56 2xl:h-56  rounded-full mx-3"
            />
          </div>
        )}
      </div>
      {image && <div className="mt-6 bg-[#C8C8C8] h-px"></div>}

      {hasNonEmptyFields && (
        <>
          <h3 className="font-bold text-redText mt-6  text-xl">გამოცდილება</h3>
          {experiences.map((experience, index) => {
            const { position, employer, start_date, due_date, description } =
              experience;

            return (
              <div key={index} className="flex flex-col mt-4  ">
                <div className="flex mb-2 space-x-2 ">
                  <h3 className="text-[#1A1A1A] font-bold">{position}</h3>
                  <h3 className="text-[#1A1A1A] font-bold">{employer}</h3>
                </div>
                <div className="flex mb-4 space-x-2 ">
                  <h3 className="italic text-[#919191]">{start_date}</h3>

                  <h3 className="italic text-[#919191]">{due_date}</h3>
                </div>

                <p className="text-base break-all leading-snug">
                  {description}
                </p>
              </div>
            );
          })}
          <div className="mt-8 bg-[#C8C8C8] h-px"></div>
        </>
      )}

      {hasNonEmptyFieldsEducation && (
        <>
          <h3 className="font-bold text-redText mt-6  text-xl">განათლება</h3>
          {educations.map((education, index) => {
            const { institute, degree_id, due_date, description } = education;

            return (
              <div key={index} className="flex flex-col mt-4  ">
                <div className="flex mb-2 space-x-2 ">
                  <h3 className="text-[#1A1A1A] font-bold">{institute}</h3>
                  <h3 className="text-[#1A1A1A] font-bold">{degree_id}</h3>
                </div>

                <h3 className="italic mb-4 text-[#919191]">{due_date}</h3>

                <p className="text-base break-all leading-snug">
                  {description}
                </p>
              </div>
            );
          })}
        </>
      )}
      <img className="   w-11 h-11 rounded-full  my-10" src={logo} alt="" />
    </div>
  );
};
