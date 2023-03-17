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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";

function DefaultNavbarItem({ name, light, ...rest }) {
  return (
    <>
      <SoftBox
        {...rest}
        mx={1}
        p={1}
        display="flex"
        alignItems="baseline"
        color={light ? "white" : "dark"}
        sx={{ cursor: "pointer", userSelect: "none" }}
      >
        <SoftTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color="inherit"
          sx={{ fontWeight: "100%" }}
        >
          {name}
        </SoftTypography>
      </SoftBox>
    </>
  );
}

// Setting default values for the props of DefaultNavbarLink
DefaultNavbarItem.defaultProps = {
  children: false,
  light: false,
};

// Typechecking props for the DefaultNavbarLink
DefaultNavbarItem.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  light: PropTypes.bool,
};

export default DefaultNavbarItem;
