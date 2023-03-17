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

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";
import SoftButton from "components/atoms/SoftButton";

function Header({ onSignup }) {
  return (
    <SoftBox>
      <SoftBox mb={1}>
        <SoftTypography sx={{ fontSize: "4.5rem" }} fontWeight="bold" color="info" textGradient>
          <p>{"Invest Locally, "}</p>
          <p>{"Impact Globally"}</p>
        </SoftTypography>
      </SoftBox>
      <SoftTypography variant="body1" fontWeight="regular" color="text">
        {
          "Yield your capital and support sustainable development by investing in local Energy Communities"
        }
      </SoftTypography>
      <SoftBox display="flex" flexDirection="row" mt={5}>
        <SoftButton variant="gradient" color="info" sx={{ marginRight: "10px" }} onClick={onSignup}>
          {"Sign up"}
        </SoftButton>
        <SoftButton variant="gradient" color="light">
          {"Learn More"}
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
}

export default Header;
