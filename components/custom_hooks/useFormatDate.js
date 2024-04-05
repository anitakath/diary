import { useState } from "react";

const useFormatDate = (language) => {
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const date = new Date(dateString);

    if (language === "English") {
      return date.toLocaleDateString("en-GB", options);
    } else {
      return date.toLocaleDateString("de-DE", options);
    }
  };

  return formatDate;
};

export default useFormatDate;