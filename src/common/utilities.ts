// utility function define

import axios, { AxiosRequestConfig } from "axios";

export const DelayedExecute = (callback: () => void, ms: number): void => {
  const callbackTimeoutID = setTimeout(() => {
    callback();
    clearTimeout(callbackTimeoutID);
  }, ms);
};

export const FormatString = (str: string, ...val: string[]): string => {
  for (let index = 0; index < val.length; index++) {
    str = str.replace(`{${index}}`, val[index]);
  }
  return str;
};

export const FormatNumber = (val: number, digit: number): string => {
  return val.toFixed(digit);
};

export const FormatNumberArray = (items: number[], digit: number): string => {
  return items.reduce((acc, item) => {
    const itemStr = item.toFixed(digit);
    return acc.length == 0 ? itemStr : `${acc}, ${itemStr}`;
  }, "");
};

export const AwaitTimeout = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const YMDHMSFormat = (src: string): string => {
  if (src.length == 0) {
    return "";
  }

  const yy = src.length >= 4 ? src.substring(0, 4) : "----";
  const mm = src.length >= 6 ? src.substring(4, 2) : "--";
  const dd = src.length >= 8 ? src.substring(6, 2) : "--";
  const hh = src.length >= 10 ? src.substring(8, 2) : "--";
  const min = src.length >= 12 ? src.substring(10, 2) : "--";
  const sec = src.length >= 14 ? src.substring(12, 2) : "--";

  return `${yy}-${mm}-${dd} ${hh}:${min}:${sec}`;
};

export const FormatBytesNumber = (value: number): string => {
  value = !value ? 0 : value;
  const sign = value < 0 ? "-" : "";

  value = Math.abs(value);
  if (value >= 1099511627776) return `${sign}${(value / 1099511627776).toLocaleString()}T`;
  else if (value >= 1073741824) return `${sign}${(value / 1073741824).toLocaleString()}G`;
  else if (value >= 1048576) return `${sign}${(value / 1048576).toLocaleString()}M`;
  else if (value >= 1024) return `${sign}${(value / 1024).toLocaleString()}K`;
  return `${sign}${value.toLocaleString()}`;
};

export const ExecuteRequest = async (path: string, config?: AxiosRequestConfig): Promise<Record<string, unknown>> => {
  try {
    const result = await axios(path, config);
    return result as object as Record<string, unknown>;
  } catch (err) {
    const anyResult = err as Record<string, unknown>;
    if (anyResult && anyResult.response) {
      return anyResult.response as object as Record<string, unknown>;
    }
  }

  return {};
};
