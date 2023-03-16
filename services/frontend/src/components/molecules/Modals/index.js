// React
import PropTypes from "prop-types";

// @mui material components
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  alignContent: "center",
  button: {
    boxSizing: "border-box",
    transition: "background-color .1s ease-out",
    borderRadius: "3.01px",
    borderRtyle: "solid",
    borderWidth: "1px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "14px",
    fontVariant: "normal",
    fontWeight: "400",
    backgroundImage: "none",
    display: "inline-block",
    height: "2.14285714em",
    lineHeight: "1.42857143em",
    border: "1px solid transparent",
    margin: 0,
    padding: "4px 10px",
    verticalAlign: "baseline",
    whiteSpace: "nowrap",
    textTransform: "none",
  },
  confirm: {
    backgroundColor: "#0052cc",
    color: "#fff",
    "&:hover": {
      transitionDuration: "0s, 0.15s",
      color: "#FFFFFF !important",
      background: "#0065FF",
      textDecoration: "inherit",
    },
  },
  cancel: {
    color: "#000",
    marginRight: "10px",
    "&:hover": {
      transitionDuration: "0s, 0.15s",
      color: "#8993A4 !important",
    },
  },
};

function ModalDefault({ open, children, onClickClose, onClickConfirm, ...rest }) {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...rest}
    >
      <Box sx={style}>
        {children}
        <Grid container direction="row-reverse" item xs={12}>
          <Button sx={{ ...style.button, ...style.confirm }} onClick={onClickConfirm}>
            Confirmar
          </Button>
          <Button sx={{ ...style.button, ...style.cancel }} onClick={onClickClose}>
            Cancelar
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}

// Typechecking props for the ModalDefault
ModalDefault.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onClickClose: PropTypes.func.isRequired,
  onClickConfirm: PropTypes.func.isRequired,
};

export default ModalDefault;
