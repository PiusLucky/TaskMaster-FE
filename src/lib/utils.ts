import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(inputString: string): string {
  if (inputString?.length === 0) {
    return inputString;
  }

  const firstLetter = inputString?.[0].toUpperCase();
  const restOfString = inputString?.slice(1);

  return firstLetter + restOfString;
}

export function getFirstLetters(inputString: string): string {
  const words: string[] = inputString.split(' ');
  const firstLetters: string = words.map((word) => word.charAt(0).toUpperCase()).join('')
  return firstLetters;
}

export function getCapitalizedFirstLetter(inputString: string): string {
  if (inputString?.length === 0) {
    return inputString;
  }

  const firstLetter = inputString?.charAt(0)?.toUpperCase();
  return firstLetter;
}

export function ellipisifyString(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }

  const startLength = Math.floor((maxLength - 3) / 2);
  const endLength = maxLength - 3 - startLength;

  const startPart = input.slice(0, startLength);
  const endPart = input.slice(input.length - endLength);

  return `${startPart}${endPart}...`;
}

export const objectToUri = (obj: { [key: string]: any }): string => {
  const uriString = Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
  return uriString;
};