import { addPossessive } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { BusinessInfo } from '@/types/onboard';
import {
  Box,
  HStack,
  Text,
  Link as ChakraLink,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

const BusinessFooter = () => {
  let { business_info } = useSelector((state: RootState) => state.onboard);
  const { product } = useSelector((state: RootState) => state.org);

  business_info = product?.business_info || business_info;

  const business_details: BusinessInfo = (business_info ||
    product?.business_info) as BusinessInfo;

  return (
    <Box
      py={6}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap='3'
    >
      <Text fontSize='sm' color='gray.500' textAlign='center'>
        &copy; Copyright 2025.{' '}
        <Link href={`/b/${business_details?.business_slug}`}>
          {addPossessive(business_details?.business_name)}
        </Link>{' '}
        Store
      </Text>

      <HStack gap={6} mt={2}>
        {business_info?.social_media_handles &&
          business_info.social_media_handles.length > 0 &&
          business_info.social_media_handles.map((social) => (
            <ChakraLink
              key={social.handle}
              href={social.link}
              target='_blank'
              rel='noopener noreferrer'
              color='#434453'
              fontSize='2xl'
              _hover={{ color: 'gray' }}
              aria-label={social.handle}
            >
              {social.handle.toLowerCase() === 'twitter' ? (
                <FaXTwitter />
              ) : social.handle.toLowerCase() === 'instagram' ? (
                <FaInstagram />
              ) : social.handle.toLowerCase() === 'facebook' ? (
                <FaFacebook />
              ) : social.handle.toLowerCase() === 'tiktok' ? (
                <FaTiktok />
              ) : (
                <FaXTwitter />
              )}
            </ChakraLink>
          ))}
      </HStack>

      {/* Powered by Doexcess */}
      <Text fontSize='xs' color='gray.400' mt={4} textAlign='center'>
        Powered by{' '}
        <ChakraLink
          href='https://doexcess.com'
          target='_blank'
          rel='noopener noreferrer'
          fontWeight='semibold'
          color='blue.500'
          _hover={{ textDecoration: 'underline', color: 'blue.600' }}
        >
          Doexcess
        </ChakraLink>
      </Text>
    </Box>
  );
};

export default BusinessFooter;
