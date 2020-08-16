import React, { useContext, useState } from "react";
import { AuthContext } from "./../../context/AuthContext";
import {
  CCard,
  CCardHeader,
  CCardTitle,
  CCardBody,
  CForm,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CContainer,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const ChangePassword = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [input, setInput] = useState(null);
  const [correct, setCorrect] = useState(false);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "current_password":
      default:
        setInput({ ...input, currentPassword: e.target.value });
        break;
      case "newPassword":
        setInput({ ...input, newPassword: e.target.value });
        break;
      case "newRePassword":
        setInput({ ...input, newRePassword: e.target.value });
        break;
    }
  };

  const currentPasswordSubmit = (e) => {
    e.preventDefault();
    input.currentPassword === auth.currentUser.password
      ? setCorrect(true)
      : Swal.fire({
          icon: "error",
          title: "Error",
          text: "Password tidak sesuai",
        });
  };

  const newPasswordSubmit = (e) => {
    e.preventDefault();
    if (input.newPassword === input.newRePassword) {
      Axios.put(`${auth.url}/${auth.currentUser.id}`, {
        password: input.newPassword,
      }).then((res) => {
        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text:
            "Password anda telah di-update, silakan login kembali dengan password anda yang baru.",
        }).then(() => {
          localStorage.clear();
          setAuth({
            ...auth,
            status: false,
            currentUser: { id: null, username: "", password: "" },
          });
          setInput(null);
        });
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Password tidak sama, mohon ulangi kembali",
      });
    }
  };

  return (
    <div className="c-app c-default-layout flex-row">
      {auth.status ? (
        <CContainer>
          {correct === false && (
            <CCard>
              <CCardHeader>
                <CCardTitle className="text-center">
                  Masukkan Password Anda
                </CCardTitle>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={currentPasswordSubmit}>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Masukkan password anda saat ini"
                      autoComplete="password"
                      name="current_password"
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CButton color="primary" block type="submit">
                    Submit
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          )}
          {correct === true && (
            <CCard>
              <CCardHeader>
                <CCardTitle className="text-center">
                  Masukkan Password Baru
                </CCardTitle>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={newPasswordSubmit}>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Masukkan password baru"
                      autoComplete="password"
                      name="newPassword"
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Ulangi password baru"
                      autoComplete="password"
                      name="newRePassword"
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CButton color="warning" block type="submit">
                    Submit
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          )}
        </CContainer>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

export default ChangePassword;
