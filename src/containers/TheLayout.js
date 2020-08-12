import React, { useContext } from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { AuthContext } from '../context/AuthContext'
import { Redirect } from 'react-router-dom';

const TheLayout = () => {

  const [auth, setAuth] = useContext(AuthContext);

  return (
    <div className="c-app c-default-layout">
      {auth.status === true ?
        (
          <>
            <TheSidebar />
            <div className="c-wrapper">
              <TheHeader />
              <div className="c-body">
                <TheContent />
              </div>
              <TheFooter />
            </div>
          </>
        )
        :
        <Redirect to="/login"/>
      }
    </div>
  )
}

export default TheLayout
