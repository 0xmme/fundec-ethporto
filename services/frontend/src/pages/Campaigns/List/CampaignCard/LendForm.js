import { useEffect } from "react";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";
import FormField from "components/molecules/InputFields/InputDefault";
import SoftButton from "components/atoms/SoftButton";

// dappKit
import useAddress from "hooks/useAddress";

function LendForm({}) {
  const { address: ownerAddress = "" } = useAddress();

  useEffect(() => {}, [ownerAddress]);
  if (ownerAddress?.length > 0) {
    return (
      <>
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
            Unpledge
          </SoftButton>
          <SoftButton variant="gradient" color="info">
            Pledge
          </SoftButton>
        </SoftBox>
      </>
    );
  }

  return (
    <SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <FormField type="number" label="Stake Amount" defaultValue={0} disabled />
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
            {""}
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
            {""}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox display="flex" justifyContent="space-between" mt={2}>
        <SoftButton variant="gradient" color="light" ml={5} disabled>
          Unstake
        </SoftButton>
        <SoftButton variant="gradient" color="info" disabled>
          Stake
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
}

export default LendForm;
