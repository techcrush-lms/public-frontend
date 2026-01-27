import { fetchStoreCurrencies } from '@/redux/slices/currencySlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface UseStoreCurrenciesProps {
  business_id: string;
}
const useStoreCurrencies = ({ business_id }: UseStoreCurrenciesProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { store_currencies, loading, error } = useSelector(
    (state: RootState) => state.currency
  );

  useEffect(() => {
    dispatch(fetchStoreCurrencies({ business_id })).unwrap();
  }, [dispatch, business_id]);

  return {
    store_currencies,
    loading,
    error,
  };
};

export default useStoreCurrencies;
