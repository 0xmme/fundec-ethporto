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

// Core
import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import DashboardLayout from "components/organisms/LayoutContainers/DashboardLayout";
import Footer from "components/molecules/Footer";

// Project page components
import Header from "components/organisms/Header";
import CommunityCard from "./CampaignCard";
import NoteItem from "./NoteItem";
import ModalDefault from "components/molecules/Modals";
import NewCampaign from "pages/Campaigns/New";

// Redux
import { useSelector } from "react-redux";
import { useGetCampaignsQuery } from "state/campaigns/campaignsApiSlice";
import { selectCurrentUser } from "state/auth/authSlice";

function ListCampaigns() {
  const user = useSelector(selectCurrentUser);

  // READ campaigns
  const { data: communities, isSuccess } = useGetCampaignsQuery("campaignsList", {
    refetchOnFocus: true,
  });

  if (isSuccess) {
    const { ids, entities } = communities;
  }

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // CREATE campaigns
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [activationDate, setActivationDate] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [isDemo, setIsDemo] = useState(true);
  const [asset, setAsset] = useState(null);
  const [apy, setApy] = useState(null);
  const [goal, setGoal] = useState(null);
  const [ownerAddress, setOwnerAddress] = useState(null);

  const newCampaignProps = {
    setName,
    setDescription,
    setActivationDate,
    setExpirationDate,
    isDemo,
    setIsDemo,
    setAsset,
  };
  // const [addNewCommunity] = useAddNewCommunityMutation();
  const onNewCommunity = async () => {
    handleClose();
    try {
      await addNewCommunity({
        admin_id: user.id,
        name,
        type: isDemo ? "DEMO" : "PROD",
      }).unwrap();
    } catch (err) {
      dispatch(openNotificationPopup({ notification: err, type: "error" }));
    }
  };

  return (
    <DashboardLayout>
      <Header name={user?.email ?? "Not Authorized"} onCreate={handleOpenModal} />
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
        <NoteItem label="Staked tokens can be withdrawn at any time" />
        <NoteItem label="Hourly rewards will be compounded (added to the total stake and earn interest)" />
        <NoteItem label="A small gas fee is charged for Stake and Unstake operations" />
      </SoftBox>
      <ModalDefault
        open={openModal}
        onClickConfirm={() => {}}
        onClickClose={handleCloseModal}
        children={<NewCampaign {...newCampaignProps} />}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default ListCampaigns;
