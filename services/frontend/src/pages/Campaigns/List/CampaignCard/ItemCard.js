// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";
import TimelapseIcon from "@mui/icons-material/Timelapse";

function ItemCard({ label, value }) {
  return (
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
            marginRight: "1rem",
            marginLeft: "1rem",
          }}
        />
        <SoftBox display="flex" flexDirection="column" flexGrow={3}>
          <SoftTypography variant="body2" color="dark" fontWeight="medium" textAlign="left" mr={1}>
            {label}
          </SoftTypography>
          <SoftTypography variant="body2" color="info" fontWeight="bold" textAlign="left" mr={1}>
            {value}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

export default ItemCard;
