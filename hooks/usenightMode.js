import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useNightMode = (mode) => {
  const [style, setStyle] = useState(false);
  const nightMode = useSelector((state) => state.toggle.isNightMode);

  useEffect(() => {
    setStyle(nightMode);
  }, [nightMode]);

  return { style };
};
