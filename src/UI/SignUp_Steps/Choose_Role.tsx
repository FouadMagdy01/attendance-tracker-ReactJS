import React, { FormEventHandler, useState } from "react";

import AuthCard from "../../components/AuthCard";
import Button from "../../components/Button";
import SectionTitle from "../../components/SectionTitle";
import classes from "./CardsStyles.module.css";
import { formStyles } from "../../constants/formStyles";
import Dropdown from "../../components/Dropdown";

interface ChooseRoleProps {
  role?: String;
  onRoleChange?: Function;
  onFormSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const roles = [
  {
    label: "Instructor",
    value: "Instructor",
  },
  {
    label: "Admin",
    value: "Admin",
  },
];

const ChooseRole: React.FC<ChooseRoleProps> = ({
  onFormSubmit,
  role,
  onRoleChange,
}) => {
  return (
    <AuthCard>
      <SectionTitle className={classes.cardTitle} sectionTitle="Sign Up" />
      <p className={classes.subTitle}>Select Role First</p>
      <form onSubmit={onFormSubmit} style={styles.form}>
        <Dropdown
          dropdownLabel="Role"
          dropdownItems={roles}
          selectConfigProps={{
            value: role,
            onChange: onRoleChange,
          }}
        />
        <Button
          buttonConfigProps={{
            type: "submit",
          }}
          sxStyles={styles.button}
          buttonLabel="Next"
        />
      </form>
    </AuthCard>
  );
};

const styles = {
  input: formStyles.input,
  button: {
    ...formStyles.button,
    marginBottom: "50px",
  },
  form: {
    width: "100%",
  },
};
export default ChooseRole;
