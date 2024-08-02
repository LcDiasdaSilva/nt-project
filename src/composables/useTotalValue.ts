import {formatCurrency} from "../utils/function"

export function useTotalValue(value: number, daily: number) {
    const total = value * daily;
    const totalCurrency = formatCurrency(total)
  return {
    total, totalCurrency
  }
}
