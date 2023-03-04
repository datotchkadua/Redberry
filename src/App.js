import FirstPage from "./pages/FirstPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import PersonalInformation from "./components/PersonalInformation";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Resume from "./pages/Resume";
import ProtectedRoute from "./pages/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { getDegrees } from "./features/inputSlice";

import { useEffect } from "react";

function App() {
  const {
    validationPersonal,
    validationExperience,
    validationEducation,
    isPostSuccess,
    
  } = useSelector((store) => store.inputInfo);
  
 
  
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDegrees());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/personal-information" element={<PersonalInformation />} />
        <Route
          path="/experience"
          element={
            <ProtectedRoute validation={validationPersonal}>
              <Experience />
            </ProtectedRoute>
          }
        />
        <Route
          path="/educations"
          element={
            <ProtectedRoute validation={validationExperience}>
              <Education />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume"
          element={
            <ProtectedRoute validation={validationEducation && isPostSuccess}>
              <Resume />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<h1 className="text-4xl">Page not found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
