import { useState, useEffect } from "react";
import { useSessionTimeout } from "../utils/useSessionTimeout";
import { toast } from "react-toastify";

const SessionManager = () => {
  const [showWarning, setShowWarning] = useState(false);

  useSessionTimeout(setShowWarning);

  useEffect(() => {
    if (showWarning) {
      toast.warning("last 5 mins");
    }
  }, [showWarning]);

  return null;
};

export default SessionManager;
