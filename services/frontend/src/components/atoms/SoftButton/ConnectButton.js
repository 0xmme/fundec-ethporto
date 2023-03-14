// React
import { useEffect } from "react";

// Soft UI Dashboard PRO React components
import SoftButton from "components/atoms/SoftButton";

// Moralis
import { ConnectButton as Web3ConnectButton } from "web3uikit";
import { useEnsAddress, useMoralis } from "react-moralis";
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
  const moralisAuth = true;
  const {
    account,
    isAuthenticated,
    logout,
    deactivateWeb3,
    enableWeb3,
    isWeb3Enabled,
    isInitialized,
    isWeb3EnableLoading,
    isAuthenticating,
    authenticate,
    Moralis,
  } = useMoralis();

  const { name } = useEnsAddress(String(account));
  const connection = useSelector(selectConnection);
  const dispatch = useDispatch();

  useEffect(() => {
    // to avoid problems in Next.JS apps because of window object
    if (typeof window == "undefined") return;

    const provider = window.localStorage.getItem("provider");
    if (
      !isWeb3Enabled &&
      !isWeb3EnableLoading &&
      provider &&
      connection.web3Status === "disconnected"
    ) {
      dispatch(setWeb3Status({ web3Status: "pending" }));
      enableWeb3({
        provider,
        chainId: connection.chainId,
        onSuccess: () => setWeb3Status("only_web3"),
      });
    }
  }, [isWeb3Enabled, isWeb3EnableLoading, connection.web3Status]);

  useEffect(() => {
    // to avoid problems in Next.JS apps because of window object
    if (typeof window == "undefined") return;

    const provider = window.localStorage.getItem("provider");

    if (
      isInitialized &&
      !isAuthenticated &&
      !isAuthenticating &&
      isWeb3Enabled &&
      moralisAuth &&
      connection.web3Status === "only_web3"
    ) {
      authenticate({
        provider,
        chainId,
        signingMessage: connection.signingMessage,
      });
    }
  }, [isAuthenticated, isInitialized, isWeb3Enabled, isAuthenticating]);

  useEffect(() => {
    Moralis.onAccountChanged((address) => {
      if (!address) disconnectWallet();
    });
  }, []);

  async function disconnectWallet() {
    // to avoid problems in Next.JS apps because of localStorage
    if (typeof window == "undefined") return;

    window.localStorage.removeItem("provider");
    dispatch(setWeb3Status({ web3Status: "disconnected" }));

    deactivateWeb3();
    if (isInitialized) logout();
  }

  if (!account || (moralisAuth && isInitialized && !isAuthenticated)) {
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
        <AddressStyled onClick={() => disconnectWallet()}>
          <TextStyled style={{ marginRight: "8px" }}>
            {name
              ? name.length <= 15
                ? name
                : getEllipsisTxt(name)
              : account && getEllipsisTxt(account)}
          </TextStyled>
        </AddressStyled>
      </AccountInfoStyled>
    </WrapperStyled>
  );
}
