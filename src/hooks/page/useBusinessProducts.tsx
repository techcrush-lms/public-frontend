import { ProductType } from '@/lib/utils';
import { viewOrgProducts } from '@/redux/slices/orgSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useBusinessProducts = () => {
  const searchParams = useSearchParams();
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const businessId = params.business_url;

  const type = searchParams.get('type') as ProductType;
  const {
    org_products,
    loading,
    org_products_count,
    org_products_current_page,
    error,
  } = useSelector((state: RootState) => state.org);
  const { currency } = useSelector((state: RootState) => state.currency);

  const [currentProductPage, setCurrentProductPage] = useState(
    org_products_current_page
  );

  const limit = 12;

  useEffect(() => {
    dispatch(
      viewOrgProducts({
        business_id: businessId as string,
        ...(type && { type }),
        limit,
        ...(currentProductPage && { page: currentProductPage }),
        ...(currency && { currency }),
      })
    );
  }, [dispatch, businessId, type, limit, currentProductPage, currency]);

  return {
    org_products,
    org_products_count,
    loading,
    error,
    currentProductPage,
    setCurrentProductPage,
    org_products_current_page,
  };
};

export default useBusinessProducts;
