import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../../functions/utiles";

const SecureContent = (props) => {
  const [ValidToken, setValidToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const isVtoken = async () => {
      try {
        const isvalid = await isTokenValid();
        setValidToken(isvalid);
      } catch (error) {
        console.log(error);
      }
    };
    isVtoken();
    if (ValidToken === false) {
      navigate("/login");
    }
  }, [ValidToken]);

  return <>{props.children}</>;
};

export default SecureContent;
