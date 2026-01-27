'use client';

import { Flex } from '@chakra-ui/react';
import { NAVIGATION_ITEMS, BREAKPOINTS } from '@/constants/navigation';
import NavigationLink from './NavigationLink';

interface DesktopNavigationProps {
  currentHash: string;
  onLinkClick: (item: string) => void;
}

export default function DesktopNavigation({
  currentHash,
  onLinkClick,
}: DesktopNavigationProps) {
  return (
    <Flex
      display={{ [BREAKPOINTS.mobile]: 'none', [BREAKPOINTS.desktop]: 'flex' }}
      color="black"
      gap={{ md: '15px', lg: '30px' }}
      fontWeight="400"
      align="center"
    >
      {NAVIGATION_ITEMS.map(({ path, label }) => (
        <NavigationLink
          key={path}
          href={path}
          label={label}
          isActive={currentHash === path}
          onClick={() => onLinkClick(path)}
        />
      ))}
    </Flex>
  );
}
