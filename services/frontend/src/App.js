// Core
import React from "react";
import Router from "Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";

// Moralis
import { WalletModal } from "web3uikit";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setIsConnectModalOpen, selectConnection } from "state/connection/connectionSlice";

export default function App() {
  const dispatch = useDispatch();
  const connection = useSelector(selectConnection);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
      <WalletModal
        chainId={connection.chainId}
        signingMessage={connection.signingMessage}
        isOpened={connection.isConnectModalOpen}
        moralisAuth={false}
        setIsOpened={() => dispatch(setIsConnectModalOpen())}
      />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
}
