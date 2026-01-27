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

export default function BusinessHeader({ handleNav }: HeaderProps) {
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

  return (
    <Stack
      w='full'
      h={{ base: 'auto', md: '90px' }}
      align='center'
      justify='center'
      mt={{ base: 4, md: '10px' }}
      px={{ base: 4, md: 0 }}
      position='fixed'
      top={0}
      left={0}
      right={0}
      zIndex='sticky'
      background='transparent'
    >
      <Container maxW='container.xl' px={{ base: 0, md: 20 }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'center' }}
          justify='space-between'
          w='full'
          p={{ base: 4, md: '20px' }}
          borderRadius='12px'
          bg='rgba(247, 248, 248, 1)'
          css={{
            border: '1px solid rgba(64, 69, 225, 0.1)',
            boxShadow: '0px 4px 20px 0px rgba(19, 69, 98, 0.1)',
            backdropFilter: 'blur(100px)',
            WebkitBackdropFilter: 'blur(100px)',
          }}
        >
          {/* Logo and Hamburger */}
          <Flex justify='space-between' align='center'>
            <Link
              href={`https://${business_info?.business_slug!}${process.env.NEXT_PUBLIC_STORE_DOMAIN_EXTENSION}`}
            >
              {business_info?.logo_url ? (
                <Image
                  src={business_info?.logo_url}
                  alt={business_info?.business_name}
                  width={100}
                  height={35}
                  className='w-[50px] h-auto md:w-[50px] sm:w-[50px] rounded-full'
                  priority
                />
              ) : (
                <Image
                  src={'/images/header-logo.png'}
                  alt={'Business Logo'}
                  width={300}
                  height={200}
                  className='w-[50px] h-auto md:w-[150px] sm:w-[50px]'
                  priority
                />
              )}

              {/*            
                width={100}
                style={{ objectFit: 'contain' }}
                mb={4}
                rounded='full'
                // priority
              /> */}
            </Link>

            {/* Desktop Nav */}
            <Flex>
              <Flex className='flex justify-between gap-1'>
                {/* Cart Icon with Badge */}
                <Flex
                  position='relative'
                  display={{ base: 'flex', md: 'none' }}
                  gap={1}
                  marginRight={2}
                  alignItems={'center'}
                >
                  <Flex>
                    {/* Currency Select */}

                    <CurrencySwitcher
                      business_id={
                        (params?.business_url as string) ||
                        (product?.business_info?.id as string)
                      }
                    />

                    {/* Cart Icon with Badge - Desktop */}
                    <CartPreview />
                  </Flex>
                </Flex>
              </Flex>
              <Button
                display={{ base: 'flex', md: 'none' }}
                onClick={handleToggle}
                aria-label='Toggle menu'
                variant='ghost'
                _hover={{ backgroundColor: '#ced0ff' }}
                p={2}
              >
                {isOpen ? (
                  <RxCross1 color='#080930' size={24} />
                ) : (
                  <RxHamburgerMenu color='#080930' size={24} />
                )}
              </Button>
            </Flex>
          </Flex>

          {/* Desktop Navigation */}
          <Flex
            display={{ base: 'none', md: 'flex' }}
            color='black'
            gap={{ md: '15px', lg: '15px' }}
            align='center'
            fontWeight='400'
          >
            <Flex gap={1}>
              {/* Currency Select */}

              <CurrencySwitcher
                business_id={
                  (params?.business_url as string) ||
                  (product?.business_info?.id as string)
                }
              />

              {/* Cart Icon with Badge - Desktop */}
              <CartPreview />
            </Flex>

            {/* Auth Buttons */}
            <Flex gap={4} align='center'>
              <Button
                variant='ghost'
                fontWeight='semibold'
                fontSize='16px'
                color='rgba(8, 9, 48, 1)'
                onClick={() => {
                  window.open(
                    process.env.NEXT_PUBLIC_PLATFORM_URL + '/auth/signin',
                    '_blank',
                    'noopener,noreferrer',
                  );
                }}
                backgroundColor='#e7e9f8'
                borderRadius='12px'
              >
                Sign in
              </Button>
              <Button
                bg='rgba(64, 69, 225, 1)'
                fontWeight='semibold'
                color='white'
                borderRadius='12px'
                // target='_blank'
                onClick={() => {
                  // window.location.href =
                  //   '/onboard/signup?business_id=' + 'business';
                  window.open(
                    `/onboard/signup?business_id=${business_info?.id}`,
                    '_blank',
                    'noopener,noreferrer',
                  );
                }}
              >
                Get Started
              </Button>
            </Flex>
          </Flex>

          {/* Mobile Nav */}
          {isOpen && (
            <Box display={{ md: 'none' }} pt={4} width='full'>
              <Stack>
                {/* Auth Buttons */}
                <Stack gap={4}>
                  <Button
                    variant='ghost'
                    fontWeight='semibold'
                    fontSize='16px'
                    color='rgba(8, 9, 48, 1)'
                    onClick={() => {
                      window.location.href =
                        process.env.NEXT_PUBLIC_PLATFORM_URL + '/auth/signin';
                    }}
                    backgroundColor='#e7e9f8'
                    borderRadius='12px'
                  >
                    Sign in
                  </Button>
                  <Button
                    bg='rgba(64, 69, 225, 1)'
                    fontWeight='semibold'
                    color='white'
                    borderRadius='12px'
                    onClick={() => {
                      window.location.href =
                        process.env.NEXT_PUBLIC_PLATFORM_URL +
                        '/onboard/signup';
                    }}
                  >
                    Get Started
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}
        </Flex>
      </Container>
    </Stack>
  );
}
