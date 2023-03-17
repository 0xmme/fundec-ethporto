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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui core components
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftTypography from "components/atoms/SoftTypography";

function LogoutIcon({ onClick, light }) {
  return (
    <IconButton
      size="small"
      color="inherit"
      aria-controls="logout"
      aria-haspopup="true"
      variant="contained"
      onClick={onClick}
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
  );
}

// Setting default values for the props of LogoutIcon
LogoutIcon.defaultProps = {
  light: false,
};

// Typechecking props for the LogoutIcon
LogoutIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  light: PropTypes.bool,
};

export default LogoutIcon;
