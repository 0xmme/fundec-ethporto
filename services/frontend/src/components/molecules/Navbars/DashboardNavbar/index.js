/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftButton from "components/atoms/SoftButton";
import LogoutIcon from "./LogoutIcon";

// Custom styles for DashboardNavbar
import { navbar, navbarRow } from "components/molecules/Navbars/DashboardNavbar/styles";

// Moralis
import ConnectButton from "components/molecules/ConnectButton";
import ConnectModal from "components/molecules/ConnectButton/connect-wallet-modal";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logOut } from "state/auth/authSlice";

function DashboardNavbar({ absolute, light, isMini }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [isConnectModal, setConnectModal] = useState(false);

  const onClickLogout = () => {
    dispatch(logOut());
    return navigate("/");
  };

  return (
    <AppBar position="absolute" color="inherit" sx={(theme) => navbar(theme, { absolute, light })}>
      <Toolbar>
        {false ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini: true })} marginLeft="auto">
            <SoftBox display="flex" color={light ? "white" : "inherit"}>
              {user ? (
                <>
                  <SoftBox mr={2}>
                    <ConnectButton onClick={() => setConnectModal(true)} />
                  </SoftBox>
                  <LogoutIcon onClick={onClickLogout} light />
                </>
              ) : (
                <SoftButton variant="gradient" color="light" onClick={() => navigate("/signin")}>
                  {"Sign In"}
                </SoftButton>
              )}
              {isConnectModal && <ConnectModal onClose={() => setConnectModal(false)} />}
            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
