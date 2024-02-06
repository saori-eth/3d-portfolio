import { createContext } from "react";
import { Driver } from ".";

export const DriverContext = createContext<Driver | null>(null);
