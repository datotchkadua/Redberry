import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const urlDegrees = `https://resume.redberryinternship.ge/api/degrees`;
const urlResume = `https://resume.redberryinternship.ge/api/cvs`;

const initialState = {
  name: localStorage.getItem("name") || "",
  surname: localStorage.getItem("surname") || "",
  email: localStorage.getItem("email") || "",
  phone_number: localStorage.getItem("phone_number") || "",
  image: localStorage.getItem("image") || "",
  about_me: localStorage.getItem("about_me") || "",
  validationPersonal: localStorage.getItem("validationPersonal") === "true",
  validationExperience: localStorage.getItem("validationExperience") === "true",
  validationEducation: false,
  experiences: JSON.parse(localStorage.getItem("experiences")) || [
    {
      position: "",
      employer: "",
      start_date: "",
      due_date: "",
      description: "",
    },
  ],

  educations: JSON.parse(localStorage.getItem("educations")) || [
    {
      institute: "",
      degree_id: "",
      due_date: "",
      description: "",
    },
  ],
  degrees: [],
  isPostSuccess: false,
  stateFromAPI: null,
};

export const getDegrees = createAsyncThunk(
  "inputInfo/getDegrees",
  async (thunkAPI) => {
    try {
      const resp = await axios(urlDegrees);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const sendResume = createAsyncThunk(
  "inputInfo/sendResume",
  async (_, thunkAPI) => {
    try {
      const {
        educations,
        experiences,
        about_me,
        image,
        phone_number,
        email,
        surname,
        name,
      } = thunkAPI.getState().inputInfo;

      const requestBody = {
        educations: educations.map((edu) => ({
          ...edu,
          degree_id: Number(edu.degree_id),
        })),
        experiences,
        about_me,
        image,
        phone_number: phone_number.replace(/\s+/g, ""),
        email,
        surname,
        name,
      };

      const formData = new FormData();
      if (requestBody.image) {
        const binaryImage = atob(requestBody.image.split(",")[1]);
        const binaryString = new Uint8Array(binaryImage.length);
        for (let i = 0; i < binaryImage.length; i++) {
          binaryString[i] = binaryImage.charCodeAt(i);
        }
        formData.append("image", new Blob([binaryString], { type: "image/*" }));
      }
      formData.append("about_me", requestBody.about_me);
      formData.append("phone_number", requestBody.phone_number);
      formData.append("email", requestBody.email);
      formData.append("surname", requestBody.surname);
      formData.append("name", requestBody.name);
      requestBody.educations.forEach((edu, i) => {
        Object.entries(edu).forEach(([key, value]) => {
          formData.append(`educations[${i}][${key}]`, value);
        });
      });
      requestBody.experiences.forEach((exp, i) => {
        Object.entries(exp).forEach(([key, value]) => {
          formData.append(`experiences[${i}][${key}]`, value);
        });
      });

      const resp = await axios.post(urlResume, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return resp.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);



const inputSlice = createSlice({
  name: "inputInfo",
  initialState,
  reducers: {
    updateInputPerson: (state, action) => {
      const { inputId, value } = action.payload;
      state[inputId] = value;
    },
    trueValidation: (state) => {
      state.validationPersonal = true;
    },
    falseValidation: (state) => {
      state.validationPersonal = false;
    },
    trueValidationExperience: (state) => {
      state.validationExperience = true;
    },
    falseValidationExperience: (state) => {
      state.validationExperience = false;
    },
    trueValidationEducation: (state) => {
      state.validationEducation = true;
    },
    falseValidationEducation: (state) => {
      state.validationEducation = false;
    },

    updateExperience: (state, action) => {
      const { inputId, value, experienceIndex } = action.payload;
      const updatedExperiences = [...state.experiences]; 
      const experienceToUpdate = updatedExperiences[experienceIndex]; 
      const updatedExperience = { ...experienceToUpdate, [inputId]: value }; 
      updatedExperiences[experienceIndex] = updatedExperience; 
      state.experiences = updatedExperiences; 
    },
    updateEducations: (state, action) => {
      const { inputId, value, educationIndex } = action.payload;
      const updatedEducations = [...state.educations]; 
      const educationToUpdate = updatedEducations[educationIndex];
      const updatedEducation = { ...educationToUpdate, [inputId]: value }; 
      updatedEducations[educationIndex] = updatedEducation; 
      state.educations = updatedEducations; 
    },
    addExperience: (state) => {
      state.experiences.push({
        position: "",
        employer: "",
        start_date: "",
        due_date: "",
        description: "",
      });
    },
    addEducations: (state) => {
      state.educations.push({
        institute: "",
        degree_id: "",
        due_date: "",
        description: "",
      });
    },
    clearState: (state) => {
     
      const emptyObj = {
        name: "",
        surname: "",
        email: "",
        phone_number: "",
        image: "",
        about_me: "",
        validationPersonal: false,
        validationExperience: false,
        validationEducation: false,
        experiences: [
          {
            position: "",
            employer: "",
            start_date: "",
            due_date: "",
            description: "",
          },
        ],

        educations: [
          {
            institute: "",
            degree_id: "",
            due_date: "",
            description: "",
          },
        ],
        degrees: [],
        isPostSuccess: false,
      };
  
      state = { ...state.stateFromAPI, emptyObj };
     
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDegrees.pending, (state) => {
        
      })
      .addCase(getDegrees.fulfilled, (state, action) => {
       
        state.degrees = action.payload;
      })
      .addCase(getDegrees.rejected, (state, action) => {
      
      })
      .addCase(sendResume.fulfilled, (state, action) => {
        //state.isLoading = false;
        state.stateFromAPI = action.payload;
        state.isPostSuccess = true;
       
      })
      .addCase(sendResume.rejected, (state, action) => {
       
        state.isPostSuccess = false;
      });
  },
});

//functions here
export const {
  updateInputPerson,
  falseValidation,
  trueValidation,
  trueValidationExperience,
  falseValidationExperience,
  trueValidationEducation,
  falseValidationEducation,
  updateExperience,
  addExperience,
  addEducations,
  updateEducations,
  clearState,
} = inputSlice.actions;

export default inputSlice.reducer;
