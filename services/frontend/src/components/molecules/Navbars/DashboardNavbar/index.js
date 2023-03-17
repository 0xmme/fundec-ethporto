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

import { useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";

// Custom styles for DashboardNavbar
import { navbar, navbarRow } from "components/molecules/Navbars/DashboardNavbar/styles";

// Moralis
import ConnectButton from "components/atoms/SoftButton/ConnectButton";

function DashboardNavbar({ absolute, light, isMini }) {
  const navigate = useNavigate();

  const onClickLogout = () => {
    return navigate("/");
  };

  return (
    <AppBar position="absolute" color="inherit" sx={(theme) => navbar(theme, { absolute, light })}>
      <Toolbar>
        {false ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini: true })} marginLeft="auto">
            <SoftBox display="flex" color={light ? "white" : "inherit"}>
              <SoftBox mr={2}>
                <ConnectButton color="light" />
              </SoftBox>
              <IconButton
                size="small"
                color="inherit"
                aria-controls="logout"
                aria-haspopup="true"
                variant="contained"
                onClick={onClickLogout}
              >
                <Icon
                  sx={({ palette: { dark, white } }) => ({
                    color: light ? white.main : dark.main,
                  })}
                >
                  account_circle
                </Icon>
                <SoftTypography variant="button" fontWeight="medium" color={"white"} ml={0.5}>
                  Logout
                </SoftTypography>
              </IconButton>
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
