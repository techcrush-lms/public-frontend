import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import { HEADER_STYLES } from '@/constants/navigation';

interface NavigationLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}

export default function NavigationLink({
  href,
  label,
  isActive,
  onClick,
  isMobile = false,
}: NavigationLinkProps) {
  return (
    <Box
      position="relative"
      _hover={{
        '&::after': {
          width: '100%',
        },
      }}
      css={{
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: isMobile ? '0' : '-5px',
          left: 0,
          width: isActive ? '100%' : '0%',
          height: '2px',
          backgroundColor: HEADER_STYLES.colors.primary,
          transition: 'width 0.3s ease',
        },
        borderBottom: isActive && !isMobile ? `1px solid ${HEADER_STYLES.colors.primary}` : '',
      }}
    >
      <Link
        href={href}
        onClick={onClick}
        style={{
          display: isMobile ? 'block' : 'inline-block',
          padding: '8px 0',
          color: isActive ? HEADER_STYLES.colors.primary : HEADER_STYLES.colors.text,
          fontWeight: isActive ? '500' : '400',
          textDecoration: 'none',
        }}
      >
        {label}
      </Link>
    </Box>
  );
}
