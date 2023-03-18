// React
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import console from "console-browserify";
// @mui material components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// redux
import { useSelector } from "react-redux";
import { selectAddress } from "../../../state/connection/connectionSlice";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SelectDefault from "components/molecules/InputFields/SelectDefault";
import InputDefault from "components/molecules/InputFields/InputDefault";
import DatePickerDefault from "components/molecules/InputFields/DatePickerDefault";
import SwitchDefault from "components/molecules/InputFields/SwitchDefault";
import EditorDefault from "components/molecules/InputFields/EditorDefault";

// Others
import { assets } from "constants/assets.js";

const priceFeed = {
  USDC: "https://xc-testnet.pyth.network/api/latest_price_feeds?ids[]=0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722",
  DAI: "https://xc-testnet.pyth.network/api/latest_price_feeds?ids[]=0x87a67534df591d2dd5ec577ab3c75668a8e3d35e92e27bf29d9e2e52df8de412",
  BIT: " https://xc-testnet.pyth.network/api/latest_price_feeds?ids[]=0x0e9ec6a3f2fba0a3df73db71c84d736b8fc1970577639c9456a2fee0c8f66d93",
  WETH: "https://xc-testnet.pyth.network/api/latest_price_feeds?ids[]=0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
};

const fetchPrice = async (asset) => {
  if (!asset) return 0;
  try {
    const response = await fetch(priceFeed[asset]);

    const data = await response.json();
    console.log(data);
    if (data && data[0] && data[0].price.price) {
      console.log(data[1]);
      return data[0].price.price * 0.00000001;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    return null;
  }
};

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
  asset,
  setGoal,
  goal,
  setApy,
}) {
  const ownerAddress = useSelector(selectAddress);
  const onNameChange = (e) => setName(e.target.value);
  const onAddressChange = (e) => setAddress(e.target.value);
  const onDescriptionChange = (e) => setDescription(e);
  const onActivationDateChange = (date) => setActivationDate(date[0]);
  const onExpirationDateChange = (date) => setExpirationDate(date[0]);
  const onIsDemoChange = () => setIsDemo(!isDemo);
  const onAssetChange = (e) => setAsset(e.value);
  const onGoalChange = (e) => setGoal(Number(e.target.value));
  const onApyChange = (e) => setApy(Number(e.target.value));

  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const price = await fetchPrice(asset);
      console.log(price);
      setPrice(price);
    };

    fetchData();
  }, [asset, goal]);

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
                    label={`Goal (${goal} ${asset} ~ ${(price * goal).toFixed(2)} $)`}
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
                value={ownerAddress ?? ""}
                disabled
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
