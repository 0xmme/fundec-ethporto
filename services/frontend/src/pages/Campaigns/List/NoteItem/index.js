// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";

// @mui material components
import GradeIcon from "@mui/icons-material/Grade";

function NoteItem({ label }) {
  return (
    <SoftBox display="flex" flexDirection="row" mt="1rem">
      <GradeIcon
        fontSize="small"
        sx={{ marginTop: "auto", marginBottom: "auto", marginRight: "1.5rem" }}
      />
      <SoftTypography variant="body2" color="text">
        {label}
      </SoftTypography>
    </SoftBox>
  );
}

export default NoteItem;
