// Core
import { useEffect } from "react";

import SoftButton from "components/atoms/SoftButton";

// dappKit
import { useWeb3 } from "hooks/useWeb3";
import ClickableEthAddress from "./clickable-eth-address";

// redux
import { useDispatch } from "react-redux";
import { setAddress } from "../../../state/connection/connectionSlice";

function ConnectButton({ onClick }) {
  const { connected } = useWeb3();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!connected) {
      dispatch(setAddress(""));
    }
  }, [connected, dispatch]);

  if (!connected) {
    return (
      <SoftButton variant="gradient" color={"info"} onClick={onClick}>
        Connect
      </SoftButton>
    );
  }

  return <ClickableEthAddress onClick={onClick} />;
}
export default ConnectButton;
