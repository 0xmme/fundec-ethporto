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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";
import SoftSelect from "components/atoms/SoftSelect";

function SelectDefault({ label, defaultValue, onChange, options, isDisabled, ...rest }) {
  return label !== " " ? (
    <SoftBox mb={0}>
      <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <SoftTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </SoftTypography>
      </SoftBox>
      <SoftSelect
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        isDisabled={isDisabled}
        {...rest}
      />
    </SoftBox>
  ) : (
    <SoftSelect
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      isDisabled={isDisabled}
      {...rest}
    />
  );
}

// Setting default values for the props of FormField
SelectDefault.defaultProps = {
  label: " ",
  onChange: () => {},
  options: [],
  isDisabled: false,
  defaultValue: { value: "", label: "" },
};

// Typechecking props for FormField
SelectDefault.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  isDisabled: PropTypes.bool,
};

export default SelectDefault;
