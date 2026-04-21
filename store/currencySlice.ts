import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency } from '@/types';

interface CurrencyState {
  selected: Currency;
}

const initialState: CurrencyState = { selected: 'USD' };

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<Currency>) {
      state.selected = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
