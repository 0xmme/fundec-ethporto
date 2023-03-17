// React
import { useState } from "react";
import { DateTime } from "luxon";

// @mui material components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SelectDefault from "components/molecules/InputFields/SelectDefault";
import InputDefault from "components/molecules/InputFields/InputDefault";
import DatePickerDefault from "components/molecules/InputFields/DatePickerDefault";
import SwitchDefault from "components/molecules/InputFields/SwitchDefault";
import EditorDefault from "components/molecules/InputFields/EditorDefault";

// Others
import { assets } from "constants/assets.js";

function NewCampaign({
  setName,
  setDescription,
  description,
  setAddress,
  setActivationDate,
  setExpirationDate,
  setIsDemo,
  isDemo,
  setAsset,
  setGoal,
  setApy,
  setOwnerAddress,
}) {
  const onNameChange = (e) => setName(e.target.value);
  const onDescriptionChange = (e) => setDescription(e);
  const onAddressChange = (e) => setAddress(e.target.value);
  const onActivationDateChange = (date) => setActivationDate(date[0]);
  const onExpirationDateChange = (date) => setExpirationDate(date[0]);
  const onIsDemoChange = () => setIsDemo(!isDemo);
  const onAssetChange = (e) => setAsset(e.value);
  const onGoalChange = (e) => setGoal(Number(e.target.value));
  const onApyChange = (e) => setApy(Number(e.target.value));
  const onOwnerAddressChange = (e) => setOwnerAddress(e.target.value);

  return (
    <SoftBox mt={0} mb={4}>
      <Typography id="modal-modal-title" variant="h4" component="h4">
        New Campaign
      </Typography>
      <Grid container spacing={0} alignContent={"center"} mt={1}>
        <Grid item xs={12}>
          <InputDefault type="text" label="Name" defaultValue={""} onChange={onNameChange} />
        </Grid>
        <Grid item xs={12}>
          <EditorDefault
            label="Description"
            subLabel="This is how others will learn about the campaign, so make it good!"
            value={description}
            onChange={onDescriptionChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputDefault type="text" label="Location" defaultValue={""} onChange={onAddressChange} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <DatePickerDefault
                label="Começa em"
                onChange={onActivationDateChange}
                defaultValue={DateTime.fromJSDate(new Date()).toFormat("yyyy-MM-dd")}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePickerDefault
                label="Termina em"
                onChange={onExpirationDateChange}
                defaultValue={DateTime.fromJSDate(new Date()).toFormat("yyyy-MM-dd")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SwitchDefault label="Is demo?" onChange={onIsDemoChange} defaultChecked={isDemo} />
        </Grid>

        {isDemo ? (
          <>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <SelectDefault
                    label="Ativo"
                    defaultValue={{ value: "", label: "" }}
                    onChange={onAssetChange}
                    options={assets}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputDefault
                    type="number"
                    label="Objetivo"
                    defaultValue={0}
                    onChange={onGoalChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputDefault
                    type="number"
                    label="APY (%)"
                    defaultValue={0}
                    onChange={onApyChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <InputDefault
                type="test"
                label="Your ETH Address"
                defaultValue={""}
                onChange={onOwnerAddressChange}
              />
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <SoftBox mt={2} mb={2} textAlign="center">
              <h6
                style={{
                  fontSize: ".7em",
                  color: "red",
                  textAlign: "center",
                  fontWeight: 400,
                  transition: ".2s all",
                }}
              >
                {"Not Available"}
              </h6>
            </SoftBox>
          </Grid>
        )}
      </Grid>
    </SoftBox>
  );
}

export default NewCampaign;
