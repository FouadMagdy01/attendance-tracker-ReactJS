import LogoWithText from "../../components/LogoWithText/LogoWithText";
import SignUpForm from "../../components/Forms/SignUpForm";
import classes from "./SignUp.module.css";
const SignUpPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <LogoWithText text="SIGNING UP A NEW ACCOUNT" />
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
