import { ProductType } from '@/lib/utils';
import { BookOpen, Download, Calendar, Ticket, Package } from 'lucide-react';

export const getProductIcon = (type: ProductType) => {
  switch (type) {
    case ProductType.COURSE:
      return BookOpen;
    case ProductType.TICKET:
      return Ticket;
    case ProductType.SUBSCRIPTION:
      return Calendar;
    case ProductType.DIGITAL_PRODUCT:
      return Download;
    case ProductType.PHYSICAL_PRODUCT:
      return Package;
    default:
      return BookOpen; // fallback
  }
};
