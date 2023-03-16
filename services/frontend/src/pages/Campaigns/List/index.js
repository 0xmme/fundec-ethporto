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
import { DateTime } from "luxon";
import console from "console-browserify";

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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux
import { useSelector } from "react-redux";
import { useGetCampaignsQuery, useAddNewCampaignMutation } from "state/campaigns/campaignsApiSlice";
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

  // Modals
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // CREATE campaigns
  const [name, setName] = useState(null);
  const [description, setDescription] = useState("<p>Time to be <strong>creative!</strong></p>");
  const [address, setAddress] = useState(null);
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
    description,
    setAddress,
    setActivationDate,
    setExpirationDate,
    isDemo,
    setIsDemo,
    setAsset,
    setApy,
    setGoal,
    setOwnerAddress,
  };
  const onSave =
    [activationDate, expirationDate, asset, apy, goal, ownerAddress].every(Boolean) &&
    [goal, apy].every(Number) &&
    goal > 0 &&
    apy > 0 &&
    apy < 100 &&
    isDemo === true &&
    name.length > 0 &&
    activationDate < expirationDate &&
    activationDate > new Date();

  const [addNewCampaign] = useAddNewCampaignMutation();
  const onNewCommunity = async () => {
    handleCloseModal();
    const id = toast.loading("Please wait...");
    try {
      const payload = {
        name,
        description,
        address,
        activation_date: DateTime.fromJSDate(activationDate).toFormat("yyyy-MM-dd hh:mm:ss"),
        expiration_date: DateTime.fromJSDate(expirationDate).toFormat("yyyy-MM-dd hh:mm:ss"),
        asset,
        apy,
        goal,
        name,
        owner_address: ownerAddress,
      };
      console.log(payload);
      await addNewCampaign(payload).unwrap();
      toast.update(id, {
        render: "All is good",
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 1000,
      });
    } catch (err) {
      toast.update(id, {
        render: "Something went wrong...",
        type: toast.TYPE.ERROR,
        autoClose: 1000,
        isLoading: false,
      });
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
        onConfirm={onSave}
        onClickConfirm={onNewCommunity}
        onClickClose={handleCloseModal}
        children={<NewCampaign {...newCampaignProps} />}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default ListCampaigns;
