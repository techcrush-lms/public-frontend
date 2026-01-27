import useStoreCurrencies from '@/hooks/page/useStoreCurrencies';
import { switchCurrency } from '@/redux/slices/currencySlice';
import { AppDispatch, RootState } from '@/redux/store';
import { Field, Flex, NativeSelect } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface CurrencySwitcherProps {
  business_id: string;
}
const CurrencySwitcher = ({ business_id }: CurrencySwitcherProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { store_currencies } = useStoreCurrencies({ business_id });
  const { currency } = useSelector((state: RootState) => state.currency);

  // Set default to the first currency once store_currencies is fetched
  useEffect(() => {
    if (
      store_currencies?.currencies &&
      store_currencies.currencies.length > 0 &&
      !currency
    ) {
      dispatch(switchCurrency(store_currencies.currencies[0]));
    }
  }, [store_currencies, currency, dispatch]);

  return (
    <div className='mx-2'>
      {/* <select
        value={currency}
        onChange={(e) => dispatch(switchCurrency(e.target.value))}
        className='border rounded-md px-2 py-1 text-sm dark:bg-gray-800 dark:text-white'
      >
        {store_currencies?.currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select> */}

      {/* Currency Select */}
      <Field.Root>
        <NativeSelect.Root>
          <NativeSelect.Field
            name='currency'
            className='border-none focus:ring-0 focus:outline-none'
            border={0}
            value={currency}
            onChange={(e) => dispatch(switchCurrency(e.target.value))}
          >
            {store_currencies?.currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>
    </div>
  );
};

export default CurrencySwitcher;
