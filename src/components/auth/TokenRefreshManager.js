import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../../store/auth/authActions";

const TokenRefreshManager = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
  
    useEffect(() => {
      if (!isAuthenticated || !user) {
        console.log("User not authenticated; token refresh interval not started.");
        return;
      }
  
      console.log("Starting token refresh interval...");
      const interval = setInterval(() => {
        console.log("Dispatching refreshToken thunk...");
        dispatch(refreshToken());
      }, 1000 * 60 * 1); // every 1 minute
  
      return () => {
        console.log("Clearing token refresh interval...");
        clearInterval(interval);
      };
    }, [isAuthenticated, user, dispatch]);
  
    return null;
  };

export default TokenRefreshManager;