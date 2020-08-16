import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// routes config
import routes from "../routes";

import {
  TheHeaderDropdown,
} from "./index";
import { AuthContext } from "../context/AuthContext";

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const [auth] = useContext(AuthContext);

  return (
    <CHeader withSubheader>
      {
        auth.status === true ?
          <>
            <CToggler
              inHeader
              className="ml-md-3 d-lg-none"
              onClick={toggleSidebarMobile}
            />
            <CToggler
              inHeader
              className="ml-3 d-md-down-none"
              onClick={toggleSidebar}
            />
          </>
          : ""
      }
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard">
            <CIcon name="cil-speedometer" />
            Dashboard
          </CHeaderNavLink>
        </CHeaderNavItem>
        {
          auth.status ?
            ""
            :
            <>
              <CHeaderNav className="px-3">
                <CHeaderNavLink to="/movie/list">
                  <CIcon name="cil-movie" />
                  {" "}Movie List
                </CHeaderNavLink>
              </CHeaderNav>
              <CHeaderNav className="px-3">
                <CHeaderNavLink to="/game/list">
                <CIcon name="cil-gamepad" />
                {" "}Game List
                </CHeaderNavLink>
              </CHeaderNav>
            </>
        }
      </CHeaderNav>

      <CHeaderNav className="px-3">
        {
          auth.status ?
            <TheHeaderDropdown />
            :
            <CHeaderNavLink to="/login">
              <CIcon name="cil-user" />
              {" "} Login
            </CHeaderNavLink>
        }
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        {/* <div className="d-md-down-none mfe-2 c-subheader-nav"> */}
        {/* <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />
            &nbsp;Dashboard
          </CLink> */}
        {/* </div> */}
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
