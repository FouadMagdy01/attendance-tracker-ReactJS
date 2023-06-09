import React, { useState } from "react";

import Choose_Role from "../../UI/SignUp_Steps/Choose_Role";
import AdminSignup from "../../UI/SignUp_Steps/Admin_Signup";
import SignupSuccess from "../../UI/SignUp_Steps/SignupSuccess";
import InstructorSignup from "../../UI/SignUp_Steps/Instructor_Signup";
import api from "../../services/apis/api";

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const [signUpStep, setSignUpStep] = useState(1);
  const [role, setRole] = useState("Admin");
  const [signUpSucceeded, setSignUpSucceeded] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const changeRoleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const proceedToStepTwo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignUpStep(2);
  };

  const instructorSignUpHandler = async (signUpData: any) => {
    setLoading(true);
    try {
      const response = await api.post("/instructorAuth/signUp", {
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
      });
      setSignUpSucceeded(true);
      setErr(false);
    } catch (err) {
      setErr(true);
    }
    setLoading(false);
  };

  const adminSignUpHandler = async (signUpData: any) => {
    setLoading(true);
    try {
      const response = await api.post("/adminAuth/signUp", {
        email: signUpData.email,
        password: signUpData.password,
        OrgPassword: signUpData.orgPassword,
        faculty: signUpData.faculty,
      });
      console.log(response);
      setSignUpSucceeded(true);
      setErr(false);
    } catch (err) {
      console.log(err);
      setErr(true);
    }
    setLoading(false);
  };
  return (
    <>
      {signUpStep === 1 && (
        <Choose_Role
          role={role}
          onRoleChange={changeRoleHandler}
          onFormSubmit={proceedToStepTwo}
        />
      )}
      {signUpStep === 2 && role === "Admin" && !signUpSucceeded && (
        <AdminSignup
          loading={loading}
          err={err}
          onSignUp={adminSignUpHandler}
        />
      )}
      {signUpStep === 2 && role === "Instructor" && !signUpSucceeded && (
        <InstructorSignup
          loading={loading}
          err={err}
          onSignUp={instructorSignUpHandler}
        />
      )}
      {signUpSucceeded && <SignupSuccess />}
    </>
  );
};
export default SignUpForm;
