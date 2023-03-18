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
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";

// Soft UI Dashboard PRO React example components
import PageLayout from "components/organisms/LayoutContainers/PageLayout";
import DefaultNavbar from "../../../molecules/Navbars/DefaultNavbar";

// Authentication layout components
import AuthFooter from "components/molecules/Footer/AuthFooter";

function AuthCoverLayout({ color, header, title, description, image, top, children }) {
  return (
    <PageLayout background="white">
      <DefaultNavbar
        action={{
          type: "external",
          route: "/signin",
          label: "Sign In",
        }}
      />
      <Grid
        container
        justifyContent="center"
        sx={{
          minHeight: "75vh",
          margin: 0,
        }}
      >
        <Grid item xs={11} sm={8} md={5} xl={4}>
          <SoftBox mt={top}>
            <SoftBox pt={3} px={3}>
              {!header ? (
                <>
                  <SoftBox mb={1}>
                    <SoftTypography variant="h3" fontWeight="bold" color={color} textGradient>
                      {title}
                    </SoftTypography>
                  </SoftBox>
                  <SoftTypography variant="body2" fontWeight="regular" color="text">
                    {description}
                  </SoftTypography>
                </>
              ) : (
                header
              )}
            </SoftBox>
            <SoftBox pl={3} pt={2} pb={1}>
              {children}
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} md={5}>
          <SoftBox
            height="100%"
            display={{ xs: "none", md: "block" }}
            position="relative"
            right={{ md: "-12rem", xl: "-16rem" }}
            mr={-16}
            sx={{
              transform: "skewX(-10deg)",
              overflow: "hidden",
              borderBottomLeftRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
            }}
          >
            <SoftBox
              ml={-8}
              height="100%"
              sx={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                objectFit: "cover;",
              }}
            />
          </SoftBox>
        </Grid>
      </Grid>
      <AuthFooter />
    </PageLayout>
  );
}

// Setting default values for the props of AuthCoverLayout
AuthCoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 20,
};

// Typechecking props for the AuthCoverLayout
AuthCoverLayout.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default AuthCoverLayout;
