import React, { useState } from 'react';
import { DiamondIcon } from '@/components/svgs';
import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Container,
  HStack,
  Heading,
  Portal,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Dialog } from '@chakra-ui/react';
import Image from 'next/image';
import { BsArrowRight } from 'react-icons/bs';
import { FiPlayCircle } from 'react-icons/fi';
import DemoVideoModal from './DemoVideoModal';
import { buttonWidth } from '@/lib/utils';

export default function Home() {
  const buttonDirection = { base: 'column', lg: 'row' };

  const headingSize = {
    base: '2xl',
    sm: '3xl',
    md: '4xl',
    lg: '4xl',
    xl: '62px',
  };

  return (
    <Stack
      minHeight={{ base: 'auto', md: '600px', lg: '700px' }}
      width='full'
      align='center'
      justify='center'
      overflow='hidden'
      px={{ base: 4, md: 0, lg: 0 }}
      pb={{ base: 8, md: 12, lg: 16 }}
      pt={{ base: 130, md: 100, lg: 200 }}
      position='relative'
      data-aos='fade-up'
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(104deg, rgba(255, 255, 255, 0.55) 0%, rgba(199, 202, 255, 1) 100%),
          url('/images/home-grid.png')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxW='container.xl'>
        <SimpleGrid columns={{ base: 1, md: 2 }} alignItems='center' gap={10}>
          <VStack align={{ base: 'center', md: 'start' }}>
            <HStack
              maxWidth={{ base: 'full', lg: '550px', xl: '603px' }}
              height={{ base: 'auto', md: '33px' }}
              py={{ base: 1, md: 1 }}
              px={{ base: 2, md: 3 }}
              border='1px solid #8C8FED'
              borderRadius='30px'
              backgroundColor='#d9dbff'
              backgroundImage='linear-gradient(23deg,rgba(217, 219, 255, 0.55) 0%, rgba(199, 202, 255, 0.55) 32%, rgba(185, 250, 216, 0.55) 100%)'
              overflow='hidden'
              display='none'
              whiteSpace='nowrap'
              data-aos='fade-down'
              data-aos-delay='100'
            >
              <Box
                backgroundColor='#4045E1'
                borderRadius='24px'
                width={{ base: '80px', md: '88px' }}
                height={{ base: '22px', md: '25px' }}
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexShrink={0}
              >
                <Text
                  display='flex'
                  gap='1'
                  alignItems='center'
                  color='#EDEEFC'
                  fontSize={{ base: '10px', md: 'xs' }}
                >
                  <DiamondIcon />
                  Blog Post
                </Text>
              </Box>
              <Text
                color='#080930'
                fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                overflow={{ base: 'hidden', md: 'hidden' }}
                textOverflow='ellipsis'
                px={1}
              >
                We built Doexcess after struggling with messy tools ourselves
              </Text>
              <BsArrowRight color='#080930' size={16} />
            </HStack>

            <Heading
              as='h1'
              color='#080930'
              fontSize={headingSize}
              lineHeight={1.2}
              textAlign={{ base: 'center', md: 'left' }}
              fontWeight='bold'
              m={0}
              data-aos='fade-up'
              data-aos-delay='200'
            >
              Automate Onboarding, Messaging & Events—All in One Place
            </Heading>

            <Text
              as='p'
              color='#434453'
              width={{ base: 'full', md: '382px' }}
              fontSize={{ base: 'sm', md: 'md' }}
              textAlign={{ base: 'center', md: 'left' }}
              m={2}
              data-aos='fade-up'
              data-aos-delay='300'
            >
              Save hours with automated email workflows, course management, and
              ticketing—no coding needed.
            </Text>

            <ButtonGroup
              size='lg'
              variant='outline'
              width='sm'
              maxWidth={{ base: 'full', md: 'auto' }}
              //   spaceX={{ base: 4, md: 6 }}
              flexDirection={buttonDirection}
              alignItems={{ base: 'left', md: 'left', lg: 'center' }}
              m={0}
              data-aos='fade-up'
              data-aos-delay='400'
            >
              <Button
                color='white'
                width={buttonWidth}
                height={{ base: '48px', md: '52px' }}
                backgroundColor='#4045E1'
                borderRadius='12px'
                _hover={{ opacity: 0.9 }}
                border='none'
                onClick={() =>
                  window.open(
                    `${process.env.NEXT_PUBLIC_PLATFORM_URL}/onboard/signup`,
                    '_blank'
                  )
                }
              >
                Get Started for Free
              </Button>
              <DemoVideoModal />
            </ButtonGroup>
          </VStack>

          <Box
            width='full'
            height='full'
            display='flex'
            justifyContent='center'
            alignItems='center'
            order={{ base: -1, md: 1 }}
            data-aos='fade-left'
            data-aos-delay='500'
          >
            <Image
              src='/images/home.png'
              alt='doexcess-home'
              width={598}
              height={500}
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '598px',
              }}
              priority
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Stack>
  );
}
