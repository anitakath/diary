
import { useState } from "react";

const useFormatDate = (language) => {
  
  const formatDate1 = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}.${
      month < 10 ? "0" + month : month
    }.${year}`;
  };

  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month < 10 ? "0" + month : month}.${
      day < 10 ? "0" + day : day
    }.${year}`;
  };

  const formatDate3 = (dateString) => {
    const months = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day}. ${months[monthIndex]}, ${year}`;
  };

  // Hier kannst du weitere Funktionen oder Zustände hinzufügen, die du benötigst

  return { formatDate1, formatDate2, formatDate3 };
};

export default useFormatDate;

