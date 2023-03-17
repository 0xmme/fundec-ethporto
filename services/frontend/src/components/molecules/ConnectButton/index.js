import SoftButton from "components/atoms/SoftButton";

// dappKit
import { useWeb3 } from "hooks/useWeb3";
import ClickableEthAddress from "./clickable-eth-address";

function ConnectButton({ onClick }) {
  const { connected } = useWeb3();

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
