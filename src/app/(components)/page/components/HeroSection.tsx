'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Stack,
  HStack,
  Image,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { HERO_SECTION, SOCIAL_LINKS, BUSINESS_PAGE_COLORS } from '../constants';
import useBusinessInfo from '@/hooks/page/useBusinessInfo';
import { FaTiktok, FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export const HeroSection = () => {
  const { business_info, loading, error } = useSelector(
    (state: RootState) => state.onboard
  );

  return (
    <Stack
      minHeight={{ base: 'auto', md: '400px', lg: '500px' }}
      width='full'
      align='center'
      justify='center'
      overflow='hidden'
      pb={{ base: 8, md: 12, lg: 16 }}
      pt={{ base: 24, md: 32, lg: 40 }}
      position='relative'
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: HERO_SECTION.backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxW='container.xl' px={{ md: 20 }}>
        <VStack
          align={{ base: 'left', md: 'start' }}
          gap={{ base: 2, md: 6 }}
          paddingTop={{ base: 10, md: 5 }}
        >
          {/* <Box w='full' display='flex' justifyContent={'start'}>
            <Image
              src={business_info?.logo_url || '/images/header-logo.png'}
              alt={business_info?.business_name || 'Business Logo'}
              width={100}
              style={{ objectFit: 'contain' }}
              mb={4}
              rounded='full'
            />
          </Box> */}

          <Heading
            as='h1'
            fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
            color={BUSINESS_PAGE_COLORS.text.primary}
            fontWeight='bold'
          >
            Welcome to {business_info?.business_name || 'Our Platform'}
          </Heading>

          <Text
            color={BUSINESS_PAGE_COLORS.text.secondary}
            fontSize={{ base: 'md', md: 'lg' }}
            maxW='600px'
          >
            {business_info?.business_description ||
              'Discover amazing content and connect with our community.'}
          </Text>

          {/* Social Media Icons */}
          {business_info?.social_media_handles &&
            business_info.social_media_handles.length > 0 && (
              <HStack gap={6} mt={2}>
                {business_info.social_media_handles.map((social) => {
                  if (!social?.handle || !social?.link) return null;

                  const IconComponent =
                    social.handle.toLowerCase() === 'twitter'
                      ? FaXTwitter
                      : social.handle.toLowerCase() === 'instagram'
                      ? FaInstagram
                      : social.handle.toLowerCase() === 'facebook'
                      ? FaFacebook
                      : social.handle.toLowerCase() === 'tiktok'
                      ? FaTiktok
                      : FaXTwitter;

                  return (
                    <ChakraLink
                      key={`${social.handle}-${social.link}`}
                      href={social.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      color={BUSINESS_PAGE_COLORS.text.secondary}
                      fontSize='2xl'
                      _hover={{
                        color: 'gray',
                      }}
                      aria-label={social.handle}
                    >
                      <IconComponent />
                    </ChakraLink>
                  );
                })}
              </HStack>
            )}
        </VStack>
      </Container>
    </Stack>
  );
};
