import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    isConnectModalOpen: false,
    web3Status: "disconnected",
    chainId: undefined,
    signingMessage: "",
    chainId: undefined,
  },
  reducers: {
    setIsConnectModalOpen: (state, action) => {
      state.isConnectModalOpen = !state.isConnectModalOpen;
    },
    setChainId: (state, action) => {
      const { chainId } = action.payload;
      state.chainId = chainId;
    },
    setSigningMessage: (state, action) => {
      const { signingMessage } = action.payload;
      state.signingMessage = signingMessage;
    },
    setWeb3Status: (state, action) => {
      const { web3Status } = action.payload;
      state.web3Status = web3Status;
    },
  },
});

export const { setIsConnectModalOpen, setChainId, setSingningMessage, setWeb3Status } =
  connectionSlice.actions;

export default connectionSlice.reducer;
export const selectConnection = (state) => state.connection;
