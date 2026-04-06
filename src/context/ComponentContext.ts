import { createContext } from "react";
import { section, SECTIONS } from "../common/constants";

// Stores the last visited full pathname for each section
export const ComponentContext = createContext<Record<section, string>>(
  SECTIONS.reduce(
    (acc, sec) => {
      acc[sec] = `/${sec}`;
      return acc;
    },
    {} as Record<section, string>,
  ),
);
