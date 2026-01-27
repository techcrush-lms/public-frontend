import { ProductType } from '@/lib/utils';
import { viewOrgSubscriptionPlans } from '@/redux/slices/orgSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useParams, useSearchParams } from 'next/navigation';
import { log } from 'node:console';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useBusinessSubscriptionPlans = () => {
  const searchParams = useSearchParams();
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const businessId = params.business_url;

  const type = searchParams.get('type') as ProductType;
  const {
    org_subscriptions,
    org_subscription_loading: loading,
    org_subscriptions_count,
    org_plans_current_page,
    error,
  } = useSelector((state: RootState) => state.org);

  const [currentPage, setCurrentPage] = useState(org_plans_current_page);

  // Determine screen size limit
  const isSmallScreen =
    typeof window !== 'undefined' && window.innerWidth < 1024;
  const limit = isSmallScreen ? 10 : 9;

  useEffect(() => {
    dispatch(
      viewOrgSubscriptionPlans({
        business_id: businessId as string,
        ...(type && { type }),
        limit,
        ...(currentPage && { page: currentPage }),
      })
    );
  }, [dispatch, businessId, type, limit, currentPage]);

  return {
    org_subscriptions,
    org_subscriptions_count,
    loading,
    error,
    currentPage,
    setCurrentPage,
    org_plans_current_page,
  };
};

export default useBusinessSubscriptionPlans;
