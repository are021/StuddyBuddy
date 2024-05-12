import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDocuments(documents: string[]) {
  return documents.join("\n\n");
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid timestamp';
  }

  // Define month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Extract month and year
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Format the result
  const formattedDate = `${month} ${year}`;
  return formattedDate;
}
