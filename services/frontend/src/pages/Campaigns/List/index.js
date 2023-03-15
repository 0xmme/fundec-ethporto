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

// React
import console from "console-browserify";

// @mui material components
import Grid from "@mui/material/Grid";
import GradeIcon from "@mui/icons-material/Grade";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";
import DashboardLayout from "components/molecules/LayoutContainers/DashboardLayout";
import Footer from "components/molecules/Footer";

// Project page components
import Header from "components/organisms/Header";
import CommunityCard from "./CampaignCard";

// Redux
import { useSelector } from "react-redux";
import { useGetCommunitiesQuery } from "state/communities/communitiesApiSlice";
import { selectCurrentUser } from "state/auth/authSlice";

function ListCampaigns() {
  const user = useSelector(selectCurrentUser);

  // READ communities
  const { data: communities, isSuccess } = useGetCommunitiesQuery("communitiesList", {
    refetchOnFocus: true,
  });

  if (isSuccess) {
    const { ids, entities } = communities;
  }

  return (
    <DashboardLayout>
      <Header name={user?.email ?? "Not Authorized"} />
      <SoftBox pt={1} pb={2}>
        <SoftBox mt={{ xs: 1, lg: 3 }} mb={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={5}>
              <CommunityCard />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <SoftBox display="flex" flexDirection="column" mt="1rem" textAlign="justify">
        <SoftBox display="flex" flexDirection="row" mt="1rem">
          <GradeIcon
            fontSize="small"
            sx={{ marginTop: "auto", marginBottom: "auto", marginRight: "1.5rem" }}
          />
          <SoftTypography variant="body2" color="text">
            Staked tokens can be withdrawn at any time
          </SoftTypography>
        </SoftBox>
        <SoftBox display="flex" flexDirection="row" mt="1rem">
          <GradeIcon
            fontSize="small"
            sx={{ marginTop: "auto", marginBottom: "auto", marginRight: "1.5rem" }}
          />
          <SoftTypography variant="body2" color="text">
            Hourly rewards will be compounded (added to the total stake and earn interest)
          </SoftTypography>
        </SoftBox>
        <SoftBox display="flex" flexDirection="row" mt="1rem">
          <GradeIcon
            fontSize="small"
            sx={{ marginTop: "auto", marginBottom: "auto", marginRight: "1.5rem" }}
          />
          <SoftTypography variant="body2" color="text">
            A small gas fee is charged for Stake and Unstake operations
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ListCampaigns;
