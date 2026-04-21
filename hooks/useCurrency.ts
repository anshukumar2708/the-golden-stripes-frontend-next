'use client';

import { useAppSelector } from '@/store';
import { currencies } from '@/data/products';

export function useCurrency() {
  const selected = useAppSelector(s => s.currency.selected);
  const config = currencies.find(c => c.code === selected) ?? currencies[0];

  const format = (usdPrice: number): string => {
    const converted = usdPrice * config.rate;
    return `${config.symbol}${converted.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return { currency: config, format };
}
