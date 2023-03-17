// React
import { useEffect } from "react";

// Soft UI Dashboard PRO React components
import SoftButton from "components/atoms/SoftButton";

// Moralis
import { ConnectButton as Web3ConnectButton } from "web3uikit";
import ConnectButtonStyles from "./ConnectButton.styles";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectConnection,
  setWeb3Status,
  setIsConnectModalOpen,
} from "state/connection/connectionSlice";

// Others
import { getEllipsisTxt } from "utils/formatters";

const {
  WrapperStyled,
  TextStyled,
  ConnectButtonStyled,
  AccountInfoStyled,
  AddressStyled,
  BalanceBlockStyled,
} = ConnectButtonStyles;

export default function ConnectButton({ color }) {
  if (true) {
    return (
      <SoftButton
        variant="gradient"
        color={color}
        onClick={() => dispatch(setIsConnectModalOpen())}
      >
        Connect
      </SoftButton>
    );
  }

  return (
    <WrapperStyled>
      <AccountInfoStyled>
        <BalanceBlockStyled></BalanceBlockStyled>
        <AddressStyled onClick={() => {}}>
          <TextStyled style={{ marginRight: "8px" }}></TextStyled>
        </AddressStyled>
      </AccountInfoStyled>
    </WrapperStyled>
  );
}
