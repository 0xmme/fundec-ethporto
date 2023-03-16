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

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";
import SoftEditor from "components/atoms/SoftEditor";

function EditorDefault({ label, subLabel, onChange, ...rest }) {
  return (
    <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
      <SoftBox mb={1} ml={0.5} mt={2} lineHeight={0} display="inline-block">
        <SoftTypography component="label" variant="caption" fontWeight="bold">
          {label}
        </SoftTypography>
      </SoftBox>
      <SoftBox mb={1.5} ml={0.5} mt={0.5} lineHeight={0} display="inline-block">
        <SoftTypography component="label" variant="caption" fontWeight="regular" color="text">
          {subLabel}
        </SoftTypography>
      </SoftBox>
      <SoftEditor onChange={onChange} {...rest} />
    </SoftBox>
  );
}

// typechecking props for FormField
EditorDefault.propTypes = {
  label: PropTypes.string.isRequired,
  subLabel: PropTypes.string.isRequired,
  laonChangebel: PropTypes.func.isRequired,
};

export default EditorDefault;
