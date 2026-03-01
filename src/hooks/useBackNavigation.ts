import { useLocation, useNavigate } from "react-router";
import { trimPathname } from "../RouterComponent";

export const useBackNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    const parentPath = trimPathname(location.pathname);
    navigate(parentPath);
  };

  return { goBack };
};
