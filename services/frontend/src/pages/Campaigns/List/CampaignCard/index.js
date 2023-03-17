import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";
import DoughnutChart from "components/molecules/Charts/DoughnutChart";
import FormField from "components/molecules/InputFields/InputDefault";
import SoftButton from "components/atoms/SoftButton";

// Others
import ItemCard from "./ItemCard";
import LendForm from "./LendForm";

function CampaignCard({
  title,
  subtitle,
  location,
  description,
  apy,
  startDate,
  endDate,
  onChange,
  handleDisable,
  onClick,
}) {
  const data = {
    datasets: {
      backgroundColors: ["info", "dark"],
      data: [90, 0],
    },
  };

  const [openLendForm, setOpenLendForm] = useState(false);

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
            <ItemCard label="Activation Date" value={startDate} />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <ItemCard label="Expiration Date" value={endDate} />
          </Grid>
        </Grid>
        <Divider />
        {openLendForm ? (
          <LendForm />
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
