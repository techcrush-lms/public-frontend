import { fetchShipping } from '@/redux/slices/orgSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useBusinessShipping = () => {
  const searchParams = useSearchParams();
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const businessId = params.business_url;

  const {
    shipping,
    shipping_count,
    shipping_current_page,
    shipping_loading: loading,
    error,
  } = useSelector((state: RootState) => state.org);

  const [currentShippingPage, setCurrentShippingPage] = useState(
    shipping_current_page
  );
  const limit = 12;

  useEffect(() => {
    dispatch(
      fetchShipping({
        business_id: businessId as string,
        limit,
        ...(currentShippingPage && { page: currentShippingPage }),
      })
    );
  }, [dispatch, businessId, limit, currentShippingPage]);

  return {
    shipping,
    shipping_count,
    loading,
    error,
    currentShippingPage,
    setCurrentShippingPage,
    shipping_current_page,
  };
};

export default useBusinessShipping;
