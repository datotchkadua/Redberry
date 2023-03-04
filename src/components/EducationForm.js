import React from "react";

import Input from "./Input";
const EducationForm = ({ educationIndex }) => {
  return (
    <>
      <div className="flex flex-col space-y-10 mb-[3rem]">
        <Input
          label="სასწავლებელი"
          placeholder="სასწავლებელი"
          description="მინიმუმ 2 სიმბოლო"
          
          educationIndex={educationIndex}
          inputId="institute"
          pattern={/.{2,}/}
          width="w-full"
        />
        <div className="flex  space-x-0 flex-col xl:flex-row xl:space-x-2 ">
          <Input
            required="required"
            educationIndex={educationIndex}
            inputId="degree_id"
            type="select"
            width="w-full"
          />

          <Input
            label="დამთავრების რიცხვი"
            required="required"
            educationIndex={educationIndex}
            inputId="due_date"
            type="date"
            width="w-full"
          />
        </div>
        <Input
          label="აღწერა"
          placeholder="როლი თანმდებობაზე"
          inputId="description"
          educationIndex={educationIndex}
          width="w-full"
        />
      </div>
    </>
  );
};

export default EducationForm;
