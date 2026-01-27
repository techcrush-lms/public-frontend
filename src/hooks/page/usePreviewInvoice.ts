import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchInvoicePublic } from '@/redux/slices/invoiceSlice';
import { useParams } from 'next/navigation';

export const usePreviewInvoice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  const { invoice, loading, error } = useSelector(
    (state: RootState) => state.invoice
  );

  console.log(invoice);

  useEffect(() => {
    dispatch(
      fetchInvoicePublic({
        id: params?.id as string,
      })
    );
  }, [dispatch]);

  return {
    invoice,
    loading,
    error,
  };
};
