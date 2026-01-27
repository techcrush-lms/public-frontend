'use client';

import React, { Suspense } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import ContactForm from './ContactForm';

const infoCards = [
  {
    icon: MdPhone,
    label: 'Phone',
    value: '+234 707 218 2999',
    sub: '',
  },
  {
    icon: MdEmail,
    label: 'Email',
    value: 'hello@doexcess.com',
    sub: '',
  },
  {
    icon: MdLocationOn,
    label: 'Address',
    value: '18, Oke Aro Road, Agbado Station, Lagos State',
    sub: '',
  },
];

const ContactPage = () => {
  const headingSize = { base: '2xl', md: '4xl' };

  return (
    <Box bg='#fff' minH='100vh'>
      <Container maxW='container.xl' pt={{ base: 32, md: 40 }} pb={8}>
        <Heading
          as='h1'
          fontSize={headingSize}
          color='#1A1A2E'
          fontWeight='bold'
          mb={8}
          textAlign={{ base: 'center', md: 'left' }}
          data-aos='fade-up'
        >
          Let's Get in Touch
        </Heading>

        {/* Info Cards */}
        <SimpleGrid columns={{ base: 2, md: 3 }} gap={6} mb={10}>
          {infoCards.map((card, index) => (
            <VStack
              key={index}
              bg='#fff'
              p={0}
              align='left'
              gap={2}
              data-aos='fade-up'
              data-aos-delay={100 + index * 100}
            >
              <Box border='1px solid #4045E1' p={2} mb={2} width={10}>
                <Icon as={card.icon} color='#4045E1' boxSize={6} />
              </Box>

              <Text color='#080930' fontSize='sm'>
                {card.value}
              </Text>
              {card.sub && (
                <Text color='#080930' fontSize='sm'>
                  {card.sub}
                </Text>
              )}
            </VStack>
          ))}
        </SimpleGrid>

        {/* Divider */}
        <HStack
          w='full'
          align='center'
          mb={8}
          data-aos='fade-up'
          data-aos-delay='400'
        >
          <Box height='1px' bg='#C0C1C6' flex='1' />
        </HStack>

        {/* Form Title */}
        <HStack
          w='full'
          align='start'
          mb={8}
          data-aos='fade-up'
          data-aos-delay='500'
        >
          <Text color='#000' fontWeight='bold' fontSize={20}>
            Or fill out the form below
          </Text>
        </HStack>

        {/* Contact Form */}
        <ContactForm />
      </Container>
    </Box>
  );
};

const ContactPageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPage />
    </Suspense>
  );
};

export default ContactPageWithSuspense;
