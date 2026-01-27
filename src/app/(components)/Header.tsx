'use client';

import {
  Button,
  Flex,
  Stack,
  IconButton,
  Box,
  Container,
  VStack,
  Text,
  HStack,
  Image,
} from '@chakra-ui/react';
// import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx';
import { ChevronDown } from 'lucide-react';
import CartIcon from './page/components/CartIcon';
import { features } from '@/lib/utils';

interface HeaderProps {
  handleNav: (item: string) => void;
}

export default function Header({ handleNav }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] = useState(false);
  const [isMobileFeaturesDropdownOpen, setIsMobileFeaturesDropdownOpen] =
    useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Track hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    // Set initial hash
    setCurrentHash(window.location.hash);

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Route-based active check
  const isActive = (route: string) => {
    // Handle different route patterns
    switch (route) {
      case '/':
        return pathname === '/';
      case '/features':
        return pathname?.startsWith('/features') || false;
      case '/pricing':
        return pathname === '/pricing';
      case '/about':
        return pathname === '/about';
      case '/contact':
        return pathname === '/contact';
      default:
        return false;
    }
  };

  const handleLinkClick = (item: string) => {
    setCurrentHash(item); // Update state immediately
    handleNav(item);
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
      <Container
        maxW='container.xl'
        // px={{ base: 4, md: 6 }}
        px={{ base: 0, md: 6 }}
      >
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
            <Link href={'/'}>
              <Image
                src='/images/header-logo.png'
                alt='doexcess'
                width={150}
                height={35}
                style={{
                  width: 'auto',
                  height: '35px',
                  maxWidth: '150px',
                  objectFit: 'contain',
                }}
              />
            </Link>
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={handleToggle}
              aria-label='Toggle menu'
              variant='ghost'
              _hover={{ backgroundColor: '#ced0ff' }}
            >
              {isOpen ? (
                <RxCross1 color='#080930' />
              ) : (
                <RxHamburgerMenu color='#080930' />
              )}
            </IconButton>
          </Flex>

          {/* Navigation Links - Desktop */}
          <Flex
            display={{ base: 'none', md: 'flex' }}
            color='black'
            gap={{ md: '15px', lg: '30px' }}
            fontWeight='400'
            align='center'
            position='relative'
          >
            {/* Home Link */}
            <Box
              position='relative'
              _hover={{
                '&::after': {
                  width: '100%',
                },
              }}
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '-5px',
                left: 0,
                width: isActive('/') ? '100%' : '0%',
                height: '2px',
                backgroundColor: 'rgba(64, 69, 225, 1)',
                transition: 'width 0.3s ease',
              }}
              // css={{
              //   borderBottom: isActive('/') ? '1px solid #4045E1' : '',
              // }}
            >
              <Link
                href='/'
                onClick={(e) => {
                  handleLinkClick('/');
                }}
                style={{
                  padding: '8px 0',
                  color: isActive('/') ? 'rgba(64, 69, 225, 1)' : '#080930',
                  fontWeight: isActive('/') ? '500' : '400',
                }}
              >
                Home
              </Link>
            </Box>

            {/* Features Dropdown */}
            <Box
              position='relative'
              onMouseEnter={() => setIsFeaturesDropdownOpen(true)}
              onMouseLeave={() => setIsFeaturesDropdownOpen(false)}
            >
              <Box
                position='relative'
                _hover={{
                  '&::after': {
                    width: '100%',
                  },
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '3px',
                  left: 0,
                  width: isActive('/features') ? '100%' : '0%',
                  height: '2px',
                  backgroundColor: 'rgba(64, 69, 225, 1)',
                  transition: 'width 0.3s ease',
                }}
                cursor='pointer'
                style={{
                  padding: '8px 0',
                  // color: '#080930',
                  color: isActive('/features')
                    ? 'rgba(64, 69, 225, 1)'
                    : '#080930',
                  fontWeight: isActive('/features') ? '500' : '400',
                }}
              >
                <HStack gap={1} align='center'>
                  <Text>Features</Text>
                  <ChevronDown
                    size={16}
                    style={{
                      transform: isFeaturesDropdownOpen
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </HStack>
              </Box>

              {/* Dropdown Menu */}
              {isFeaturesDropdownOpen && (
                <Box
                  position='absolute'
                  top='100%'
                  left='-20px'
                  mt={0}
                  bg='white'
                  borderRadius='xl'
                  boxShadow='2xl'
                  border='1px solid'
                  borderColor='gray.100'
                  minW={{ base: '300px', md: '480px' }}
                  maxW={{ base: '350px', md: '520px' }}
                  maxH={{ base: '50vh', md: 'none' }}
                  zIndex={1000}
                  p={6}
                  onMouseEnter={() => setIsFeaturesDropdownOpen(true)}
                  onMouseLeave={() => setIsFeaturesDropdownOpen(false)}
                  overflow='auto'
                  css={{
                    animation: 'fadeIn 0.2s ease-out',
                    '@keyframes fadeIn': {
                      '0%': { opacity: 0, transform: 'translateY(-10px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' },
                    },
                  }}
                >
                  <VStack gap={4} align='stretch'>
                    <VStack gap={2} align='stretch'>
                      {features.map((feature, index) => (
                        <HStack
                          key={feature.title}
                          gap={4}
                          p={4}
                          borderRadius='lg'
                          _hover={{
                            bg: 'blue.50',
                            border: '1px solid',
                            borderColor: 'blue.200',
                            cursor: 'pointer',
                            transform: 'translateX(4px)',
                          }}
                          transition='all 0.2s ease'
                          border='1px solid transparent'
                          onClick={() => {
                            // Scroll to the features section on the home page
                            if (pathname === '/') {
                              const featuresSection =
                                document.getElementById('features-section');
                              featuresSection?.scrollIntoView({
                                behavior: 'smooth',
                              });
                            } else {
                              // Navigate to home page and then scroll to features
                            }
                            setIsFeaturesDropdownOpen(false);

                            router.push(feature.url);
                          }}
                        >
                          <Box
                            w='60px'
                            h='60px'
                            borderRadius='xl'
                            overflow='hidden'
                            flexShrink={0}
                            bg='gray.100'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                          >
                            <Image
                              src={feature.src}
                              alt={feature.title}
                              width={60}
                              height={60}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '12px',
                              }}
                              onError={(e) => {
                                // Fallback if image fails to load - show initials
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const container = target.parentElement;
                                if (container) {
                                  container.innerHTML = `
                                    <div style="
                                      width: 100%;
                                      height: 100%;
                                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                      border-radius: 12px;
                                      display: flex;
                                      align-items: center;
                                      justify-content: center;
                                      color: white;
                                      font-size: 20px;
                                      font-weight: bold;
                                    ">
                                      ${feature.title.charAt(0)}
                                    </div>
                                  `;
                                }
                              }}
                            />
                          </Box>
                          <Box flex={1}>
                            <Text
                              fontWeight='semibold'
                              fontSize='sm'
                              color='gray.900'
                              mb={1}
                              lineHeight='1.3'
                            >
                              {feature.title}
                            </Text>
                            <Text
                              fontSize='xs'
                              color='gray.600'
                              lineHeight='1.4'
                              style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {feature.body}
                            </Text>
                          </Box>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </Box>
              )}
            </Box>

            {/* About and Contact Links */}
            {['/pricing', '/about', '/contact'].map((item) => (
              <Box
                key={item}
                position='relative'
                _hover={{
                  '&::after': {
                    width: '100%',
                  },
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-5px',
                  left: 0,
                  width: isActive(item) ? '100%' : '0%',
                  height: '2px',
                  backgroundColor: 'rgba(64, 69, 225, 1)',
                  transition: 'width 0.3s ease',
                }}
                // css={{
                //   borderBottom: isActive(item) ? '1px solid #4045E1' : '',
                // }}
              >
                <Link
                  href={item}
                  onClick={(e) => {
                    handleLinkClick(item);
                  }}
                  style={{
                    padding: '8px 0',
                    color: isActive(item) ? 'rgba(64, 69, 225, 1)' : '#080930',
                    fontWeight: isActive(item) ? '500' : '400',
                  }}
                >
                  {item.replace('/', '').charAt(0).toUpperCase() +
                    item.replace('/', '').slice(1)}
                </Link>
              </Box>
            ))}
          </Flex>

          {/* Mobile Menu - Collapsible */}
          {isOpen && (
            <Box display={{ md: 'none' }} pt={4} width='full'>
              <Stack>
                {/* Home Link */}
                <Box>
                  <Link
                    href='/'
                    onClick={(e) => {
                      handleLinkClick('/');
                      setIsOpen(false);
                      setIsMobileFeaturesDropdownOpen(false);
                    }}
                    style={{
                      display: 'block',
                      padding: isActive('/') ? '8px 0 8px 16px' : '8px 0',
                      color: isActive('/') ? 'rgba(64, 69, 225, 1)' : '#080930',
                      fontWeight: isActive('/') ? '600' : '400',
                      backgroundColor: isActive('/')
                        ? 'rgba(64, 69, 225, 0.1)'
                        : 'transparent',
                      borderRadius: '6px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Home
                  </Link>
                </Box>

                {/* Features Link - Mobile with Dropdown */}
                <Box>
                  <Box
                    position='relative'
                    onClick={() =>
                      setIsMobileFeaturesDropdownOpen(
                        !isMobileFeaturesDropdownOpen
                      )
                    }
                    cursor='pointer'
                    style={{
                      padding: isActive('/features')
                        ? '8px 0 8px 16px'
                        : '8px 0',
                      color: isActive('/features')
                        ? 'rgba(64, 69, 225, 1)'
                        : '#080930',
                      fontWeight: isActive('/features') ? '600' : '400',
                      backgroundColor: isActive('/features')
                        ? 'rgba(64, 69, 225, 0.1)'
                        : 'transparent',
                      borderRadius: '6px',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text>Features</Text>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: isMobileFeaturesDropdownOpen
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </Box>

                  {/* Mobile Features Dropdown */}
                  {isMobileFeaturesDropdownOpen && (
                    <VStack
                      align='stretch'
                      gap={3}
                      mt={3}
                      pl={6}
                      borderLeft='3px solid'
                      borderColor='rgba(64, 69, 225, 0.1)'
                      css={{
                        animation: 'slideDown 0.3s ease-out',
                        '@keyframes slideDown': {
                          '0%': { opacity: 0, transform: 'translateY(-10px)' },
                          '100%': { opacity: 1, transform: 'translateY(0)' },
                        },
                      }}
                    >
                      {features.map((feature, index) => (
                        <Box
                          key={feature.title}
                          p={3}
                          borderRadius='md'
                          bg='gray.50'
                          cursor='pointer'
                          onClick={() => {
                            // Scroll to the features section on the home page
                            if (pathname === '/') {
                              const featuresSection =
                                document.getElementById('features-section');
                              featuresSection?.scrollIntoView({
                                behavior: 'smooth',
                              });
                            } else {
                              // Navigate to home page and then scroll to features
                            }
                            setIsOpen(false);
                            setIsMobileFeaturesDropdownOpen(false);
                            router.push(feature.url);
                          }}
                          _hover={{
                            bg: 'blue.50',
                            transform: 'translateX(4px)',
                          }}
                          transition='all 0.2s ease'
                        >
                          <HStack align='start' gap={3}>
                            <Box
                              w='40px'
                              h='40px'
                              borderRadius='lg'
                              overflow='hidden'
                              flexShrink={0}
                              bg='gray.100'
                              display='flex'
                              alignItems='center'
                              justifyContent='center'
                            >
                              <Image
                                src={feature.src}
                                alt={feature.title}
                                width={40}
                                height={40}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                }}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const container = target.parentElement;
                                  if (container) {
                                    container.innerHTML = `
                                      <div style="
                                        width: 100%;
                                        height: 100%;
                                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                        border-radius: 8px;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        color: white;
                                        font-size: 16px;
                                        font-weight: bold;
                                      ">
                                        ${feature.title.charAt(0)}
                                      </div>
                                    `;
                                  }
                                }}
                              />
                            </Box>
                            <Box flex={1}>
                              <Text
                                fontWeight='semibold'
                                fontSize='sm'
                                color='gray.900'
                                mb={1}
                              >
                                {feature.title}
                              </Text>
                              <Text
                                fontSize='xs'
                                color='gray.600'
                                lineHeight='1.3'
                              >
                                {feature.body}
                              </Text>
                            </Box>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  )}
                </Box>

                {/* About and Contact Links */}
                {['/pricing', '/about', '/contact'].map((item) => (
                  <Box key={item}>
                    <Link
                      href={item}
                      onClick={(e) => {
                        handleLinkClick(item);
                        setIsOpen(false);
                        setIsMobileFeaturesDropdownOpen(false);
                      }}
                      style={{
                        display: 'block',
                        padding: isActive(item) ? '8px 0 8px 16px' : '8px 0',
                        color: isActive(item)
                          ? 'rgba(64, 69, 225, 1)'
                          : '#080930',
                        fontWeight: isActive(item) ? '600' : '400',
                        backgroundColor: isActive(item)
                          ? 'rgba(64, 69, 225, 0.1)'
                          : 'transparent',
                        borderRadius: '6px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {item.replace('/', '').charAt(0).toUpperCase() +
                        item.replace('/', '').slice(1)}
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* Auth Buttons */}
          <Flex
            display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 2, md: 4 }}
            mt={{ base: 4, md: 0 }}
            align='center'
            width={{ base: 'full', md: 'auto' }}
          >
            {/* <CartIcon variant="button" showText={false} size="md" /> */}
            <Button
              variant='ghost'
              fontWeight='semibold'
              w={{ base: 'full', md: '78px' }}
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
              w={{ base: 'full', md: 'auto' }}
              onClick={() => {
                window.location.href =
                  process.env.NEXT_PUBLIC_PLATFORM_URL + '/onboard/signup';
              }}
            >
              Get Started
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Stack>
  );
}
