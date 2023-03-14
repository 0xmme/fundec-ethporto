import { BigNumber, BigNumberish } from "ethers";

export interface ICampaign {
  creator: String;
  goal: BigNumber;
  pledged: BigNumber;
  startAt: BigNumber;
  endAt: BigNumber;
  claimed: Boolean;
}
