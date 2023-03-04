import React from "react";
import Input from "./Input";
const ExperienceForm = ({ experienceIndex }) => {
  return (
    <>
      <div className="flex flex-col space-y-10  mb-[3rem]">
        <Input
          label="თანამდებობა"
          placeholder="დეველოპერი, დიზაინერი, ა.შ"
          description="მინიმუმ 2 სიმბოლო"
          required="required"
          experienceIndex={experienceIndex}
          inputId="position"
          pattern={/.{2,}/}
          width="w-full"
        />
        <Input
          label="დამსაქმებელი"
          placeholder="დამსაქმებელი"
          description="მინიმუმ 2 სიმბოლო"
          required="required"
          experienceIndex={experienceIndex}
          inputId="employer"
          pattern={/.{2,}/}
          width="w-full"
        />
        <div className="flex space-x-0 flex-col xl:flex-row xl:space-x-2 ">
          <Input
            label="დაწყების რიცხვი"
            required="required"
            experienceIndex={experienceIndex}
            inputId="start_date"
            type="date"
            width="w-full"
          />
          <Input
            label="დამთავრების რიცხვი"
            required="required"
            experienceIndex={experienceIndex}
            inputId="due_date"
            type="date"
            width="w-full"
          />
        </div>
        <Input
          label="აღწერა"
          placeholder="როლი თანმდებობაზე"
          inputId="description"
          experienceIndex={experienceIndex}
          width="w-full"
          pattern={/.{2,}/}
        />
      </div>
    </>
  );
};

export default ExperienceForm;
