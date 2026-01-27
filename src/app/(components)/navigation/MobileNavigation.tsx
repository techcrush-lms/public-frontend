'use client';

import { Box, Stack } from '@chakra-ui/react';
import { NAVIGATION_ITEMS } from '@/constants/navigation';
import NavigationLink from './NavigationLink';

interface MobileNavigationProps {
  isOpen: boolean;
  currentHash: string;
  onLinkClick: (item: string) => void;
  onClose: () => void;
}

export default function MobileNavigation({
  isOpen,
  currentHash,
  onLinkClick,
  onClose,
}: MobileNavigationProps) {
  if (!isOpen) return null;

  const handleLinkClick = (path: string) => {
    onLinkClick(path);
    onClose();
  };

  return (
    <Box display={{ md: 'none' }} pt={4} width='full'>
      <Stack gap={0}>
        {NAVIGATION_ITEMS.map(({ path, label }) => (
          <NavigationLink
            key={path}
            href={path}
            label={label}
            isActive={currentHash === path}
            onClick={() => handleLinkClick(path)}
            isMobile
          />
        ))}
      </Stack>
    </Box>
  );
}
