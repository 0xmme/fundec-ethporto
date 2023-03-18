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
import CampaignCard from "./CampaignCard";
import NoteItem from "./NoteItem";
import ModalDefault from "components/molecules/Modals";
import NewCampaign from "pages/Campaigns/New";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux
import { useSelector } from "react-redux";
import { useGetCampaignsQuery, useCreate } from "state/campaigns/campaignsApiSlice";
import { selectUser } from "state/auth/authSlice";
import { selectAddress } from "../../../state/connection/connectionSlice";
import { useAddNewCampaignMutation } from "../../../state/campaigns/campaignsApiSlice";

// dappKit
import { Model } from "@taikai/dappkit";
import { Web3Connection } from "@taikai/dappkit";

// abi
import CrowndlendFactory from "abis/CrowdlendFactory.json";

function ListCampaigns() {
  const user = useSelector(selectUser);
  const ownerAddress = useSelector(selectAddress);

  // READ campaigns
  const { data: campaigns, isSuccess } = useGetCampaignsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

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
  };
  const onSave =
    [activationDate, expirationDate, asset, apy, goal].every(Boolean) &&
    [goal, apy].every(Number) &&
    goal > 0 &&
    apy > 0 &&
    apy < 100 &&
    isDemo === true &&
    name.length > 0 &&
    activationDate < expirationDate &&
    activationDate > new Date();

  const [addNewCampaign] = useAddNewCampaignMutation();
  const onNewCampaign = async () => {
    handleCloseModal();
    const id = toast.loading("Please wait...");
    try {
      // Provide the custom provider to Web3Connection
      const web3Connection = new Web3Connection({ web3Host: "http://localhost:8545" });
      web3Connection.start();
      await web3Connection.connect();

      const CrowndlendFactoryModel = new Model(
        web3Connection,
        CrowndlendFactory.abi,
        "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
      );

      await CrowndlendFactoryModel.start();

      // Change a value on the contract
      const receipt = await CrowndlendFactoryModel.sendTx(
        CrowndlendFactoryModel.contract.methods.createCampaign(
          ownerAddress,
          apy,
          "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          goal,
          Math.floor(activationDate / 1000),
          Math.floor(expirationDate / 1000)
        )
      );
      const campaignAddress = receipt;

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

      await addNewCampaign(payload);
      toast.update(id, {
        render: "Campaign created!",
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 1000,
      });
    } catch (err) {
      console.log(err);
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
            {isSuccess &&
              campaigns.ids.map((id) => {
                const campaign = campaigns.entities[id];

                const cardProps = {
                  title: campaign.name,
                  location: campaign.address,
                  description,
                  apy: campaign.apy,
                  asset: campaign.asset,
                  startDate: campaign.activation_date,
                  endDate: campaign.expiration_date,
                  ownerAddress: campaign.owner_address,
                  contractAddress: campaign.deposit_address,
                  goal: campaign.goal,
                };
                return (
                  <Grid key={id} item xs={12} md={6} lg={4}>
                    <CampaignCard {...cardProps} />
                  </Grid>
                );
              })}
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
        onClickConfirm={onNewCampaign}
        onClickClose={handleCloseModal}
        children={<NewCampaign {...newCampaignProps} />}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default ListCampaigns;
