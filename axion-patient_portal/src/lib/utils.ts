import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLocationData = () => {
  return {
    latitude: 6.8996808,
    longitude: 79.8513088,
    ipAddress: "192.168.8.1",
  };
};
