import styled from "styled-components";
import { Button } from "@taikai/rocket-kit";

import useAddress from "../../../hooks/useAddress";

const AddressOpen = styled.div`
  button {
    border: 1px solid #ccc;
    text-transform: none;
  }
`;

type ActionType = () => void;

interface OnActionClick {
  onClick: ActionType;
}

const ClickableEthAddress = (props: OnActionClick) => {
  const { address = "" } = useAddress();
  const { onClick } = props;
  return (
    <AddressOpen>
      <Button
        action={() => onClick()}
        color="grey100"
        txtColor="black"
        value={address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
      />
    </AddressOpen>
  );
};

export default ClickableEthAddress;
