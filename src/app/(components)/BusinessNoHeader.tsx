'use client';

import {
  Button,
  Flex,
  Stack,
  Box,
  Container,
  Field,
  NativeSelect,
  Image as ChakraImage,
} from '@chakra-ui/react';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx';
import { CartPreview } from './page/CartPreview';
import useBusinessProducts from '@/hooks/page/useBusinessProducts';
import SelectBox from '@/components/ui/select-box';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import useBusinessInfo from '@/hooks/page/useBusinessInfo';

interface HeaderProps {
  handleNav?: (item: string) => void;
}

export default function BusinessNoHeader({ handleNav }: HeaderProps) {
  const params = useParams();
  const router = useRouter();
  let { business_info } = useBusinessInfo();

  // If product single page is viewed
  const { loading, product, error } = useSelector(
    (state: RootState) => state.org,
  );

  business_info = product?.business_info || business_info;

  const [isOpen, setIsOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const [currency, setCurrency] = useState('NGN');
  const [isCartOpen, setIsCartOpen] = useState(false); // New state for cart drawer

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isActive = (hash: string) => currentHash === hash;

  const handleLinkClick = (item: string) => {
    setCurrentHash(item);
    handleNav?.(item)!;
    router.push(item === '/home' ? '/' : `/${item}`);
  };

  return <></>;
}
