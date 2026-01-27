import { Box, HStack, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from 'react-icons/fa6';

const BusinessFooter = () => {
  return (
    <Box
      // color='gray.800'
      // mt={6}
      py={6}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap='2'
      // borderTop='1px solid #eee'
    >
      <Text fontSize='sm' color='gray.500'>
        &copy; Copyright {new Date().getFullYear()} |{' '}
        <Link href='/' color='gray.500'>
          Doexcess
        </Link>
      </Text>
      <HStack gap={6} mt={2} display='none'>
        <ChakraLink
          href='https://x.com/'
          target='_blank'
          rel='noopener noreferrer'
          color='#434453'
          fontSize='2xl'
          _hover={{
            color: 'gray',
          }}
        >
          <FaXTwitter />
        </ChakraLink>
        <ChakraLink
          href='https://instagram.com/'
          target='_blank'
          rel='noopener noreferrer'
          color='#434453'
          fontSize='2xl'
          _hover={{
            color: 'gray',
          }}
        >
          <FaInstagram />
        </ChakraLink>
        <ChakraLink
          href='https://facebook.com/'
          target='_blank'
          rel='noopener noreferrer'
          color='#434453'
          fontSize='2xl'
          _hover={{
            color: 'gray',
          }}
        >
          <FaFacebook />
        </ChakraLink>
        <ChakraLink
          href='https://tiktok.com/'
          target='_blank'
          rel='noopener noreferrer'
          color='#434453'
          fontSize='2xl'
          _hover={{
            color: 'gray',
          }}
        >
          {/* <Button
                  aria-label='TikTok'
                  // p={2}
                  // minW='44px'
                  // minH='44px'
                > */}
          <FaTiktok />
          {/* </Button> */}
        </ChakraLink>
      </HStack>
    </Box>
  );
};

export default BusinessFooter;
