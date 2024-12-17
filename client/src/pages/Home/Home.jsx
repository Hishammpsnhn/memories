import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log(user)
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);
  return <div>Homhhhe</div>;
};

export default Home;
