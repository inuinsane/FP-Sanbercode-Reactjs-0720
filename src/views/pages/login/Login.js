import React, { useContext, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AuthContext } from '../../../context/AuthContext'
import Axios from 'axios'
import Swal from 'sweetalert2'

const Login = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (auth.list === null) {
      Axios.get(auth.url)
        .then(res => {
          setAuth({
            ...auth, list: res.data.map(user => {
              return {
                username: user.username,
              }
            })
          })
        })
    }
    else if (localStorage.getItem('loginStatus') === 'false') {
      setAuth({ ...auth, status: false });
    } else if (localStorage.getItem('loginStatus') === 'true') {
      setAuth({
        ...auth, status: true, currentUser: {
          ...auth.currentUser,
          id: parseInt(localStorage.getItem('id')),
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password'),
        },
      })
    }
  }, [auth, setAuth]);


  const handleChange = (e) => {
    let inputName = e.target.name;
    if (e.target.value !== '') {
      switch (inputName) {
        default:
        case "username":
          setAuth({ ...auth, currentUser: { ...auth.currentUser, username: e.target.value } });
          break;
        case "password":
          setAuth({ ...auth, currentUser: { ...auth.currentUser, password: e.target.value } });
          break;
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let username = auth.currentUser.username;
    let password = auth.currentUser.password;
    if (username !== null && password !== null) {
      if (auth.list.find(user => user.username === username)) {
        Axios.post(auth.loginUrl, { username, password })
          .then(res => {
            res.data.id ?
              (
                setAuth({
                  ...auth,
                  currentUser: {
                    ...auth.currentUser,
                    id: res.data.id,
                    username: res.data.username,
                    password: res.data.password,
                  },
                  status: true,
                })
              )
              :
              Swal.fire({
                title: "Error!",
                text: `Password salah, silakan ulangi kembali`,
                icon: "error",
              });
          })
      } else {
        Swal.fire({
          title: "Error!",
          text: "Data tidak ditemukan, silakan registrasi terlebih dahulu",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Kolom username dan password tidak boleh kosong",
        icon: "error",
      });
    }
  }
  if (auth.status === true) {
    localStorage.setItem('loginStatus', true);
    localStorage.setItem('id', auth.currentUser.id);
    localStorage.setItem('username', auth.currentUser.username);
    localStorage.setItem('password', auth.currentUser.password);
  }

  const handleClick = () => {
    setShow(!show);
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      {auth.status === false ?
        (<CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1 className={show ? "" : "text-center"}>Login</h1>
                      <p className={show ? "text-muted" : "text-muted text-center"}>Silakan login untuk mengakses data</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Username" autoComplete="username" name="username" onChange={handleChange} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Password" autoComplete="current-password" name="password" onChange={handleChange} />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" className="px-4" onClick={handleSubmit}>Login</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton className="text-xs" onClick={handleClick}>{show ? "Login saja" : "Belum punya akun?"}</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                {
                  show &&
                  <CCard className="text-white bg-primary py-5" style={{ width: '100%' }}>
                    <CCardBody className="text-center">
                      <div>
                        <h2>Registrasi</h2>
                        <p>
                          Anda perlu login untuk mengakses data yang ada pada web ini. Apabila anda belum memiliki akun, maka
                          anda dapat registrasi terlebih dahulu.
                      </p>
                        <Link to="/register">
                          <CButton color="primary" className="mt-3" active tabIndex={-1}>Klik untuk Registrasi</CButton>
                        </Link>
                      </div>
                    </CCardBody>
                  </CCard>
                }
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
        )
        : <Redirect to="/" />
      }
    </div>
  )
}

export default Login
