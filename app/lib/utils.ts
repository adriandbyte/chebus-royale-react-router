import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWidthClass(size: number): string {
  if (size <= 50) return "w-12"; // ~48px
  if (size <= 75) return "w-16"; // ~64px
  if (size <= 100) return "w-24"; // ~96px
  if (size <= 150) return "w-32"; // ~128px
  if (size <= 200) return "w-40"; // ~160px
  if (size <= 250) return "w-48"; // ~192px
  if (size <= 300) return "w-56"; // ~224px
  if (size <= 350) return "w-64"; // ~256px
  if (size <= 400) return "w-72"; // ~288px
  if (size <= 450) return "w-80"; // ~320px
  if (size <= 500) return "w-96"; // ~384px
  return "w-auto";
}