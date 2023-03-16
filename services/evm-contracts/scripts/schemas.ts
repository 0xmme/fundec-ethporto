import { BigNumber, BigNumberish } from "ethers";

export interface ICampaign {
  creator: String;
  apy: number;
  goal: BigNumber;
  pledged: BigNumber;
  startAt: BigNumber;
  endAt: BigNumber;
  claimed: Boolean;
}
