import { Box, Stack, Text } from '@chakra-ui/react';
import { PackageX } from 'lucide-react';

export const NoProduct = () => {
  return (
    <Box
      w='full'
      py={40}
      textAlign='center'
      border='1px solid'
      borderColor='gray.200'
      borderRadius='xl'
      bg='gray.50'
    >
      <Stack gap={4} align='center'>
        <PackageX size={80} strokeWidth={1.5} color='gray' />

        <Text fontSize='xl' fontWeight='bold' color='gray.700'>
          No product found
        </Text>
        <Text color='gray.500'>
          The product you’re looking for does not exist or is unavailable.
        </Text>
      </Stack>
    </Box>
  );
};
