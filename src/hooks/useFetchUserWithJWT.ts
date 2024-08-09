import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { getUserInformation } from "../utils/api";

const useFetchUserWithJWT = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserWithJWT = async () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        try {
          await getUserInformation(dispatch, navigate);
        } catch (error) {
          console.error("Error fetching user information", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserWithJWT();
  }, [dispatch, navigate]);

    return loading;
};

export default useFetchUserWithJWT;
