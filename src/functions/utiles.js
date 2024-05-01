import axios from "axios";

export const isTokenValid = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`http://localhost:8080/auth/tokenValid`, {
      headers: { Authorization: token },
    });
    if (res.status == 200) {
      return true;
    } else return;
  } catch (error) {
    // console.log("ERR_BAD_REQUEST");
    return false;
  }
};

export const ModalStyle = () => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
});
