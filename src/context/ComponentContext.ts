import { createContext } from "react";
import { section, SECTIONS } from "../common/constants";

export const ComponentContext = createContext<Record<section, string>>(
  SECTIONS.reduce(
    (acc, section) => {
      acc[section] = "";
      return acc;
    },
    {} as Record<section, string>,
  ),
);
