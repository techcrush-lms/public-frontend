import { viewProductDetails } from '@/redux/slices/orgSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useBusinessProductDetails = () => {
  const params = useParams();
  const { currency } = useSelector((state: RootState) => state.currency);

  const dispatch = useDispatch<AppDispatch>();

  const productId = params.product_id;

  const { loading, product, error } = useSelector(
    (state: RootState) => state.org
  );

  useEffect(() => {
    dispatch(viewProductDetails({ product_id: productId as string, currency }));
  }, [dispatch, productId, currency]);

  return {
    product,
    loading,
    error,
  };
};

export default useBusinessProductDetails;
