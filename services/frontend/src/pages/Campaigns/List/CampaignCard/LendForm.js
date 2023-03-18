import { useState, useEffect } from "react";
import console from "console-browserify";
// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";
import FormField from "components/molecules/InputFields/InputDefault";
import SoftButton from "components/atoms/SoftButton";

// redux
import { useSelector } from "react-redux";
import { selectAddress } from "../../../../state/connection/connectionSlice";

// dappKit
import { Model } from "@taikai/dappkit";
import { Web3Connection } from "@taikai/dappkit";

// abi
import Crowndlend from "abis/Crowdlend.json";
import MockToken from "abis/MockToken.json";

function LendForm({ asset, contractAddress }) {
  const address = useSelector(selectAddress);
  const [pledgedAmount, setPledgedAmount] = useState(null);
  const [amount, setAmount] = useState(0);

  const pledge = async () => {
    // Provide the custom provider to Web3Connection
    const web3Connection = new Web3Connection({ web3Host: "https://rpc.testnet.mantle.xyz" });
    web3Connection.start();
    await web3Connection.connect();

    const CrowndlendModel = new Model(web3Connection, Crowndlend.abi, contractAddress);

    await CrowndlendModel.start();

    // Change a value on the contract
    const receipt = await CrowndlendModel.sendTx(CrowndlendModel.contract.methods.pledge(amount));
  };

  const onChangeAmount = (e) => setAmount(e.target.value);
  const onClickPledge = async () => {
    await increaseAllowance();
    await pledge();
    await fetchData();
  };

  const increaseAllowance = async () => {
    // Provide the custom provider to Web3Connection
    const web3Connection = new Web3Connection({ web3Host: "https://rpc.testnet.mantle.xyz" });
    web3Connection.start();
    await web3Connection.connect();

    const MockTokenModel = new Model(
      web3Connection,
      MockToken.abi,
      "0xba2531Fe3D53b45991e5529Fb80a0Ae71C3c78CD"
    );

    await MockTokenModel.start();

    // Change a value on the contract
    const receipt = await MockTokenModel.sendTx(
      MockTokenModel.contract.methods.increaseAllowance(contractAddress, amount)
    );
  };

  const fetchData = async () => {
    if (address?.length > 0) {
      // Provide the custom provider to Web3Connection
      const web3Connection = new Web3Connection({ web3Host: "https://rpc.testnet.mantle.xyz" });
      web3Connection.start();
      await web3Connection.connect();

      const CrowndlendModel = new Model(web3Connection, Crowndlend.abi, contractAddress);

      await CrowndlendModel.start();
      const receipt = await CrowndlendModel.callTx(
        CrowndlendModel.contract.methods.pledgedAmount(address)
      );
      setPledgedAmount(receipt);
    }
  };

  useEffect(() => {
    fetchData();
  }, [address]);

  if (address?.length > 0) {
    return (
      <>
        <SoftBox display="flex" flexDirection="column">
          <FormField
            type="number"
            label="Stake Amount"
            defaultValue={0}
            onChange={onChangeAmount}
          />
          <SoftBox display="flex" flexDirection="row" justifyContent="space-between" pt={2}>
            <SoftTypography
              variant="h6"
              color="text"
              fontWeight="medium"
              marginBottom="auto"
              marginTop="auto"
            >
              Currently Pledged
            </SoftTypography>
            <SoftTypography variant="h4" color="text" fontWeight="medium" textAlign="right">
              {pledgedAmount ?? "NAN"} {asset}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox display="flex" justifyContent="space-between" mt={2}>
          <SoftButton variant="gradient" color="light" ml={5}>
            Unpledge
          </SoftButton>
          <SoftButton variant="gradient" color="info" onClick={onClickPledge}>
            Pledge
          </SoftButton>
        </SoftBox>
      </>
    );
  }

  return (
    <SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <FormField type="number" label="Pledge Amount" defaultValue={0} disabled />
        <SoftBox display="flex" flexDirection="row" justifyContent="space-between" pt={2}>
          <SoftTypography
            variant="h6"
            color="text"
            fontWeight="medium"
            marginBottom="auto"
            marginTop="auto"
          >
            Currently Pledging
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
