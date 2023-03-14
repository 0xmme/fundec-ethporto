// @mui material components
import Card from "@mui/material/Card";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";
import DoughnutChart from "components/molecules/Charts/DoughnutChart";
import FormField from "components/molecules/InputFields/InputDefault";
import SoftButton from "components/atoms/SoftButton";

function CommunityCard({
  title,
  subtitle,
  location,
  description,
  apy,
  duration,
  rating,
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

  return (
    <Card>
      <SoftBox width="100%" py={2.5} px={4}>
        <SoftBox mb={1} lineheight={1} display="flex" flexDirection="column">
          <SoftTypography variant="h3" fontWeight="bold" textAlign="center">
            Vila - Sustainable School IV
          </SoftTypography>
          <SoftTypography variant="button" color="text" fontWeight="medium" textAlign="center">
            Comunidade de Energia Renovável
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} mt={3} display="flex" flexDirection="row" alignItems="center">
          <LocationOnIcon />
          <SoftTypography variant="h6" fontWeight="medium" textAlign="center" mr={1}>
            Porto, Portugal
          </SoftTypography>
        </SoftBox>
        <SoftTypography variant="h6" color="text" fontWeight="medium" textAlign="left" mr={1}>
          A clinic to promote wellness services. Refinancing solar panels for energy renewables
        </SoftTypography>
        <SoftBox mt="1rem" mb="1rem">
          <DoughnutChart chart={data} height="200px" />
        </SoftBox>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={8}>
            <SoftBox
              display="flex"
              flexDirection="row"
              mt="5px"
              bgColor="rgba(244, 246, 249, 1)"
              border="0 solid rgba(0, 0, 0, 0.125)"
              borderRadius="1rem"
            >
              <SoftBox display="flex" flexDirection="row" mt="0.5rem" mb="0.5rem">
                <TimelapseIcon
                  fontSize="large"
                  sx={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginRight: "1.5rem",
                    marginLeft: "1.5rem",
                  }}
                />
                <SoftBox display="flex" flexDirection="column" flexGrow={3}>
                  <SoftTypography
                    variant="h5"
                    color="dark"
                    fontWeight="medium"
                    textAlign="left"
                    mr={1}
                  >
                    Duration
                  </SoftTypography>
                  <SoftTypography
                    variant="h4"
                    color="info"
                    fontWeight="bold"
                    textAlign="left"
                    mr={1}
                  >
                    12 Months
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <SoftBox
              display="flex"
              flexDirection="row"
              mt="5px"
              bgColor="rgba(244, 246, 249, 1)"
              border="0 solid rgba(0, 0, 0, 0.125)"
              borderRadius="1rem"
            >
              <SoftBox
                mt="0.5rem"
                mb="0.5rem"
                ml="auto"
                mr="auto"
                display="flex"
                flexDirection="column"
              >
                <SoftTypography
                  variant="h5"
                  color="dark"
                  fontWeight="medium"
                  textAlign="left"
                  mr={1}
                >
                  Rating
                </SoftTypography>
                <SoftTypography variant="h4" color="info" fontWeight="bold" textAlign="left" mr={1}>
                  B-
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
        <Divider />
        <SoftBox display="flex" flexDirection="column">
          <FormField type="number" label="Stake Amount" defaultValue={2} />
          <SoftBox display="flex" flexDirection="row" justifyContent="space-between" pt={2}>
            <SoftTypography
              variant="h6"
              color="text"
              fontWeight="medium"
              marginBottom="auto"
              marginTop="auto"
            >
              Currently Staking
            </SoftTypography>
            <SoftTypography variant="h4" color="text" fontWeight="medium" textAlign="right">
              5 EWT
            </SoftTypography>
          </SoftBox>
          <SoftBox display="flex" flexDirection="row" justifyContent="space-between" pt={2}>
            <SoftTypography
              variant="h6"
              color="text"
              fontWeight="medium"
              marginBottom="auto"
              marginTop="auto"
            >
              Earned Rewards
            </SoftTypography>
            <SoftTypography variant="h4" color="text" fontWeight="medium" textAlign="right">
              1 EWT
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox display="flex" justifyContent="space-between" mt={2}>
          <SoftButton variant="gradient" color="light" ml={5}>
            Unstake
          </SoftButton>
          <SoftButton variant="gradient" color="info">
            Stake
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default CommunityCard;
