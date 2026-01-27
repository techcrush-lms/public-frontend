'use client';

import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Icon,
  Stack,
} from '@chakra-ui/react';
import { MdLockOutline } from 'react-icons/md';
import Header from '../Header';
import Footer from '../Footer';

const PrivacyPolicyPage = () => {
  const headingSize = {
    base: '2xl',
    sm: '3xl',
    md: '4xl',
    lg: '5xl',
  };

  return (
    <Box bg='#F7F8F8' minH='100vh'>
      {/* Hero Section */}
      <Stack
        minHeight={{ base: 'auto', md: '200px', lg: '200px' }}
        width='full'
        align='center'
        justify='center'
        overflow='hidden'
        px={{ base: 4, md: 0, lg: 0 }}
        pb={{ base: 8, md: 12, lg: 8 }}
        pt={{ base: 0, md: 0, lg: 0 }}
        position='relative'
        data-aos='fade-down'
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
        <Box pt={{ base: 32, md: 40 }} pb={0} bg='#F7F8F8'>
          <Container maxW='container.xl'>
            <VStack gap={2} mb={10}>
              <Heading
                as='h1'
                fontSize={headingSize}
                color='#080930'
                textAlign='center'
                fontWeight='bold'
                data-aos='fade-up'
                data-aos-delay='200'
              >
                Privacy Policy
              </Heading>
              <Text
                color='#6B6B8B'
                fontSize='md'
                textAlign='center'
                data-aos='fade-up'
                data-aos-delay='300'
              >
                Effective Date: 02/07/2025
              </Text>
            </VStack>
          </Container>
        </Box>
      </Stack>

      <Container
        maxW='container.md'
        py={{ base: 20, md: 10 }}
        minH='70vh'
        data-aos='fade-up'
        data-aos-delay='400'
      >
        <VStack gap={6} align='start' justify='center' h='full'>
          <Heading
            as='h2'
            size='md'
            color='#080930'
            data-aos='fade-up'
            data-aos-delay='500'
          >
            Privacy Policy
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='600'>
            Doexcess (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is
            committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, share, and protect your personal information
            when you use our website, applications, and services (collectively,
            the &quot;Services&quot;).
          </Text>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='700'>
            By accessing or using Doexcess, you agree to the terms of this
            Privacy Policy.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='800'
          >
            1. Information We Collect
          </Heading>
          <Text
            color='#434453'
            fontWeight='bold'
            data-aos='fade-up'
            data-aos-delay='900'
          >
            a. Information You Provide to Us
          </Text>
          <Box pl={4} data-aos='fade-up' data-aos-delay='1000'>
            <Text color='#434453' mb={2}>
              <b>Account Information:</b> This includes your name, email
              address, password, phone number, and other details you provide
              during registration.
            </Text>

            <Text color='#434453' mb={2}>
              <b>Profile Information:</b> Basic details about your business or
              organization, preferences, and any optional information you choose
              to provide.
            </Text>

            <Text color='#434453'>
              <b>Support or Feedback:</b> Any messages, inquiries, or support
              tickets you submit to us.
            </Text>
          </Box>
          <Text
            color='#434453'
            fontWeight='bold'
            data-aos='fade-up'
            data-aos-delay='1100'
          >
            b. Information Collected Automatically
          </Text>
          <Box pl={4} data-aos='fade-up' data-aos-delay='1200'>
            <Text color='#434453'>
              <b>Usage Data:</b> Device information, browser type, IP address,
              pages visited, time spent, and interactions with our Services.
            </Text>
            <Text color='#434453'>
              <b>Cookies and Tracking Technologies:</b> We use cookies and
              similar technologies to enhance user experience, track usage, and
              manage sessions. You can manage cookie preferences through your
              browser settings.
            </Text>
          </Box>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='1300'
          >
            2. How We Use Your Information
          </Heading>
          <Box
            as='ul'
            pl={6}
            color='#434453'
            data-aos='fade-up'
            data-aos-delay='1400'
          >
            <li>Provide, maintain, and improve our Services</li>
            <li>Personalize your experience and tailor content</li>
            <li>
              Communicate with you about updates, new features, or important
              service-related messages
            </li>
            <li>
              Monitor and analyze platform usage to enhance performance and
              security
            </li>
            <li>Respond to customer service requests and support needs</li>
          </Box>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='1500'
          >
            3. Legal Bases for Processing (for EU Users)
          </Heading>
          <Box
            as='ul'
            pl={6}
            color='#434453'
            data-aos='fade-up'
            data-aos-delay='1600'
          >
            <li>Performance of a contract</li>
            <li>Legitimate interest</li>
            <li>Compliance with legal obligations</li>
            <li>Your consent (where required)</li>
          </Box>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='1700'
          >
            4. Sharing Your Information
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='1800'>
            We do not sell your personal information. However, we may share your
            data in the following circumstances:
          </Text>
          <Box
            as='ul'
            pl={6}
            color='#434453'
            data-aos='fade-up'
            data-aos-delay='1900'
          >
            <li>
              With service providers that help us operate our business (e.g.,
              cloud hosting, analytics, communication tools) under
              confidentiality agreements.
            </li>
            <li>
              In response to legal requests, such as court orders, subpoenas, or
              government investigations.
            </li>
            <li>
              In case of a merger, acquisition, or asset sale, we may transfer
              user information to the involved third party.
            </li>
          </Box>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='2000'
          >
            5. Data Retention
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='2100'>
            We retain your information only for as long as necessary to provide
            the Services and fulfill the purposes outlined in this policy,
            unless a longer retention period is required or permitted by law.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='2200'
          >
            6. Your Rights and Choices
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='2300'>
            Depending on your location, you may have the right to:
          </Text>
          <Box
            as='ul'
            pl={6}
            color='#434453'
            data-aos='fade-up'
            data-aos-delay='2400'
          >
            <li>Access, update, or delete your personal data</li>
            <li>Object to or restrict processing</li>
            <li>Withdraw consent where processing is based on consent</li>
            <li>Lodge a complaint with a data protection authority</li>
          </Box>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='2500'>
            To exercise any of these rights, please contact us at{' '}
            <b>hello@doexcess.com</b>.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='2600'
          >
            7. Security
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='2700'>
            We implement appropriate technical and organizational measures to
            protect your data from unauthorized access, loss, or misuse.
            However, no system is 100% secure, and we cannot guarantee the
            absolute security of your information.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='2800'
          >
            8. Third-Party Links
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='2900'>
            Our Services may contain links to third-party websites or tools. We
            are not responsible for the privacy practices or content of those
            third-party sites.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='3000'
          >
            9. Children&apos;s Privacy
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='3100'>
            Doexcess is not intended for children under the age of 13 (or 16 in
            the EU). We do not knowingly collect personal information from
            children. If we discover that we have collected information from a
            child without consent, we will delete it.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='3200'
          >
            10. Changes to This Policy
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='3300'>
            We may update this Privacy Policy from time to time. If we make
            material changes, we will notify you via email or through the
            platform. The updated policy will always be available on our website
            with the &quot;Effective Date&quot; noted above.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='3400'
          >
            11. Contact Us
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='3500'>
            If you have any questions or concerns about this Privacy Policy, or
            would like to exercise your rights, please contact us at:
          </Text>
          <Box pl={4} color='#434453' data-aos='fade-up' data-aos-delay='3600'>
            <Text>
              Email: <b>hello@doexcess.com</b>
            </Text>
            <Text>Business Name: Doexcess</Text>
            <Text>Website: https://doexcess.com</Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default PrivacyPolicyPage;
