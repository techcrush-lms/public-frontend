'use client';

import { Button, Flex } from '@chakra-ui/react';
import { EXTERNAL_URLS, HEADER_STYLES, BREAKPOINTS } from '@/constants/navigation';

interface AuthButtonsProps {
  isOpen?: boolean;
  onSignIn?: () => void;
  onGetStarted?: () => void;
}

export default function AuthButtons({
  isOpen = false,
  onSignIn,
  onGetStarted,
}: AuthButtonsProps) {
  const handleSignIn = () => {
    if (onSignIn) {
      onSignIn();
    } else {
      window.location.href = process.env.NEXT_PUBLIC_PLATFORM_URL + EXTERNAL_URLS.SIGNIN;
    }
  };

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      window.location.href = process.env.NEXT_PUBLIC_PLATFORM_URL + EXTERNAL_URLS.SIGNUP;
    }
  };

  return (
    <Flex
      display={{ [BREAKPOINTS.mobile]: isOpen ? 'flex' : 'none', [BREAKPOINTS.desktop]: 'flex' }}
      direction={{ [BREAKPOINTS.mobile]: 'column', [BREAKPOINTS.desktop]: 'row' }}
      gap={{ [BREAKPOINTS.mobile]: 2, [BREAKPOINTS.desktop]: 4 }}
      mt={{ [BREAKPOINTS.mobile]: 4, [BREAKPOINTS.desktop]: 0 }}
      align="center"
      width={{ [BREAKPOINTS.mobile]: 'full', [BREAKPOINTS.desktop]: 'auto' }}
    >
      <Button
        variant="ghost"
        fontWeight="semibold"
        w={{ [BREAKPOINTS.mobile]: 'full', [BREAKPOINTS.desktop]: '78px' }}
        fontSize="16px"
        color={HEADER_STYLES.colors.text}
        onClick={handleSignIn}
        backgroundColor={HEADER_STYLES.colors.buttonBg}
        borderRadius={HEADER_STYLES.borderRadius}
        _hover={{
          backgroundColor: HEADER_STYLES.colors.hover,
        }}
      >
        Sign in
      </Button>
      <Button
        bg={HEADER_STYLES.colors.primary}
        fontWeight="semibold"
        color="white"
        borderRadius={HEADER_STYLES.borderRadius}
        w={{ [BREAKPOINTS.mobile]: 'full', [BREAKPOINTS.desktop]: 'auto' }}
        onClick={handleGetStarted}
        _hover={{
          bg: HEADER_STYLES.colors.primary,
          opacity: 0.9,
        }}
      >
        Get Started
      </Button>
    </Flex>
  );
}
