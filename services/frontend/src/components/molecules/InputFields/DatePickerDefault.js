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
import SoftDatePicker from "components/atoms/SoftDatePicker";

function DatePickerDefault({ label, onChange, ...rest }) {
  return (
    <SoftBox mb={0}>
      <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <SoftTypography component="label" variant="caption" fontWeight="bold">
          {label}
        </SoftTypography>
      </SoftBox>
      <SoftDatePicker {...rest} onChange={onChange} />
    </SoftBox>
  );
}

// typechecking props for FormField
DatePickerDefault.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatePickerDefault;
