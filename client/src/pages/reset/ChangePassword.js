import { Form, Formik } from "formik";
// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import axios from "axios";

export default function ChangePassword({
  password,
  setPassword,
  conf_password,
  setConf_password,
  error,
  loading,
  setLoading,
  userInfos,
  setError,
}) {
  const navigate = useNavigate();
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "password must be at least 6 characters")
      .max(36, "Password can't be more than 36 characters"),

    conf_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password must match"),
  });
  const { email } = userInfos;
  const changePassword = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
        email,
        password,
      });
      setError("");
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form" style={{ height: "320px" }}>
      <div className="reset_form_header">Change password</div>
      <div className="reset_form_text">Pick a strong badass Password</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          conf_password,
        }}
        validationSchema={validatePassword}
        onSubmit={() => {
          changePassword();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
            <LoginInput
              type="password"
              name="conf_password"
              onChange={(e) => setConf_password(e.target.value)}
              placeholder="Confirm New Password"
              bottom
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
