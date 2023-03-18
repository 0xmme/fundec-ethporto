// Core
import { useState } from "react";
import console from "console-browserify";

// @mui material components
import Card from "@mui/material/Card";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import { DateTime } from "luxon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";
import DoughnutChart from "components/molecules/Charts/DoughnutChart";
import FormField from "components/molecules/InputFields/InputDefault";
import SoftButton from "components/atoms/SoftButton";

// redux
import { useSelector } from "react-redux";
import { selectAddress } from "../../../../state/connection/connectionSlice";

// Others
import ItemCard from "./ItemCard";
import LendForm from "./LendForm";

function CampaignCard({
  title,
  location,
  description,
  apy,
  startDate,
  endDate,
  ownerAddress,
  asset,
  contractAddress,
}) {
  const address = useSelector(selectAddress);
  const data = {
    labels: ["Pledged", "Goal"],
    datasets: {
      label: "Projects",
      backgroundColors: ["info", "dark"],
      data: [75, 25],
    },
  };
  const isOwner = ownerAddress === address;
  const [openLendForm, setOpenLendForm] = useState(false);

  const isOwnerCTO = () => {
    const today = new Date();
    const startDateJs = new Date(startDate);
    const endDateJs = new Date(endDate);
    if (startDateJs > today) {
      return "Funds not yet available to claim";
    } else if (startDateJs < today && endDateJs > today) {
      return "Can claim funds";
    } else if (endDateJs < today) {
      return "Send funds back";
    } else {
      return "HEY";
    }
  };
  return (
    <Card>
      <SoftBox width="100%" py={2.5} px={4}>
        <SoftBox mb={1} lineheight={1} display="flex" flexDirection="column">
          <SoftTypography variant="h3" fontWeight="bold" textAlign="center">
            {title}
          </SoftTypography>
          <SoftTypography variant="button" color="text" fontWeight="medium" textAlign="center">
            Renewable Energy Community
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} mt={3} display="flex" flexDirection="row" alignItems="center">
          <LocationOnIcon />
          <SoftTypography variant="h6" fontWeight="medium" textAlign="center" mr={1}>
            {location}
          </SoftTypography>
        </SoftBox>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <SoftBox mt="1rem" mb="1rem">
          <DoughnutChart chart={data} height="200px" value={apy} />
        </SoftBox>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={6}>
            <ItemCard
              label="Activation Date"
              value={DateTime.fromISO(startDate).toFormat("yyyy-MM-dd")}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <ItemCard
              label="Expiration Date"
              value={DateTime.fromISO(endDate).toFormat("yyyy-MM-dd")}
            />
          </Grid>
        </Grid>
        <Divider />
        {isOwner ? (
          isOwnerCTO()
        ) : openLendForm ? (
          <LendForm asset={asset} contractAddress={contractAddress} />
        ) : (
          <SoftBox width="100%">
            <SoftButton
              variant="gradient"
              color="light"
              ml={5}
              onClick={() => setOpenLendForm(true)}
              sx={{ minWidth: "100%" }}
            >
              Pledge to this campaign
            </SoftButton>
          </SoftBox>
        )}
      </SoftBox>
    </Card>
  );
}

export default CampaignCard;
