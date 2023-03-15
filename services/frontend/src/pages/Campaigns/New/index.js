// React
import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Soft UI Dashboard PRO React components
import SuiBox from "components/atoms/SuiBox";
import SelectDefault from "components/molecules/FormField/SelectDefault";
import InputDefault from "components/molecules/InputFields/InputDefault";
import DatePickerDefault from "components/molecules/InputFields/DatePickerDefault";
import SwitchDefault from "components/molecules/InputFields/SwitchDefault";

// Others
import { assets } from "constants/index.js";

function NewCampaign({ setEndDate, setAsset, asset, setGoal, setOwnerAddress, setDepositAddress }) {
  const [isCustodial, setIsCustodial] = useState(false);

  const onEndDateChange = (date) => setEndDate(date[0]);
  const onAssetChange = (e) => setAsset(e.value);
  const onGoalChange = (e) => setGoal(e.target.value);
  const onOwnerAddressChange = (e) => setOwnerAddress(e.target.value);
  const onDepositAddressChange = (e) => setDepositAddress(e.target.value);

  return (
    <SuiBox mt={0} mb={4}>
      <Typography id="modal-modal-title" variant="h4" component="h4">
        Novo Crowdfund
      </Typography>
      <Grid container spacing={0} alignContent={"center"} mt={1}>
        <Grid item xs={6}>
          <DatePickerDefault
            label="Campanha termina em"
            onChange={onEndDateChange}
            defaultValue={new Date()}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6} mr={2}>
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
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SwitchDefault
            label="Quero custódia dos fundos"
            onChange={() => {
              setIsCustodial(!isCustodial);
            }}
          />
        </Grid>

        {asset && asset !== "EUR" && (
          <Grid item xs={12}>
            <InputDefault
              type="text"
              label="Endereço do Proprietário"
              defaultValue={0}
              onChange={onGoalChange}
            />
          </Grid>
        )}
      </Grid>
    </SuiBox>
  );
}

export default NewCampaign;
