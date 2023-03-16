/**
=========================================================
* Soft UI Dashboard PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";
import Switch from "@mui/material/Switch";

function SwitchDefault({ label, onChange, defaultChecked, ...rest }) {
  return (
    <SoftBox width="100%">
      <SoftBox display="flex" flexDirection="row" alignItems="center" mt={2} mb={1}>
        <SoftBox
          mb={0}
          mt={0}
          ml={0.5}
          justifyContent="center"
          lineHeight={0}
          display="inline-block"
        >
          <SoftTypography component="label" variant="caption">
            {label}
          </SoftTypography>
        </SoftBox>
        {defaultChecked ? (
          <Switch
            onChange={onChange}
            sx={{ marginBottom: 0, marginTop: 0, marginLeft: 1 }}
            defaultChecked
            {...rest}
          />
        ) : (
          <Switch
            onChange={onChange}
            sx={{ marginBottom: 0, marginTop: 0, marginLeft: 1 }}
            {...rest}
          />
        )}
      </SoftBox>
    </SoftBox>
  );
}

// typechecking props for FormField
SwitchDefault.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultChecked: PropTypes.bool,
};

export default SwitchDefault;
