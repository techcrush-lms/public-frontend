'use client';

import React from 'react';
import { Box, Container, Heading, Text, VStack, Stack } from '@chakra-ui/react';

const TermsPage = () => {
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
                Terms of Service
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
            Terms of Service
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='600'>
            Welcome to Doexcess! These Terms of Service (&quot;Terms&quot;)
            govern your use of the Doexcess platform, including our website,
            app, tools, and all related services (collectively, the
            &quot;Services&quot;). By using our Services, you agree to these
            Terms. If you do not agree, please do not use the platform.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='700'
          >
            1. Acceptance of Terms
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='800'>
            By accessing or using Doexcess, you agree to be bound by these Terms
            and our Privacy Policy. If you are using the Services on behalf of a
            company or organization, you represent that you have the authority
            to bind them to these Terms.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='900'
          >
            2. Eligibility
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='1000'>
            To use Doexcess, you must be at least 18 years old or have legal
            capacity to form a binding agreement in your jurisdiction. The
            platform is not intended for use by children.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='1100'
          >
            3. Account Registration
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='1200'>
            You may be required to create an account to use certain features.
            You agree to:
          </Text>
          <Box
            as='ul'
            pl={6}
            color='#434453'
            data-aos='fade-up'
            data-aos-delay='1300'
          >
            <li>Provide accurate and complete information</li>
            <li>Keep your login credentials confidential</li>
            <li>Be responsible for any activity under your account</li>
          </Box>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='1400'>
            We reserve the right to suspend or terminate accounts that violate
            these Terms.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='1500'
          >
            4. Use of the Services
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='1600'>
            You agree to use Doexcess:
          </Text>
          <Box
            as='ul'
            pl={6}
            color='#434453'
            data-aos='fade-up'
            data-aos-delay='1700'
          >
            <li>In compliance with all applicable laws and regulations</li>
            <li>Only for lawful and authorized purposes</li>
            <li>
              Without violating the rights of others or disrupting the platform
            </li>
          </Box>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='1800'>
            <b>Prohibited actions include, but are not limited to:</b>
          </Text>
          <Box
            as='ul'
            pl={6}
            color='#434453'
            data-aos='fade-up'
            data-aos-delay='1900'
          >
            <li>
              Reverse engineering, duplicating, or exploiting the platform
            </li>
            <li>Uploading harmful or malicious content</li>
            <li>Engaging in unauthorized data scraping or harvesting</li>
          </Box>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='4000'
          >
            5. KYC and Verification Requirements
          </Heading>

          <Text color='#434453' data-aos='fade-up' data-aos-delay='4100'>
            To maintain the security, integrity, and compliance of the Services,
            Doexcess may require users to complete identity and business
            verification as part of our Know Your Customer (“KYC”) procedures.
            This may include providing basic business details, proof of
            identity, or other documentation necessary to confirm account
            ownership and prevent misuse of the platform.
          </Text>

          <Text color='#434453' data-aos='fade-up' data-aos-delay='4200'>
            You agree to provide accurate, current, and complete information
            when requested, and to promptly update such information if it
            changes. Doexcess may use trusted third-party verification partners
            to facilitate KYC checks, and you authorize us to share the
            necessary information with those providers solely for verification
            and compliance purposes.
          </Text>

          <Text color='#434453' data-aos='fade-up' data-aos-delay='4300'>
            Completion of the required KYC process is a prerequisite for
            receiving any payouts, withdrawals, or disbursements through the
            platform. Doexcess may delay or withhold payouts until verification
            is successfully completed.
          </Text>

          <Text color='#434453' data-aos='fade-up' data-aos-delay='4400'>
            Failure to complete required KYC steps or providing false or
            incomplete information may result in limitations on your account,
            restricted access to certain features, delayed payouts, or
            suspension of Services until verification is completed.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='2000'
          >
            6. Payments & Transaction Fees
          </Heading>

          <Text color='#434453' data-aos='fade-up' data-aos-delay='2100'>
            Doexcess does not charge a subscription fee for using the platform.
            Instead, billing is based strictly on transactions processed through
            the system:
          </Text>

          <Box
            as='ul'
            pl={6}
            color='#434453'
            data-aos='fade-up'
            data-aos-delay='2200'
          >
            <li>
              A fee of 3% + ₦100 applies to all NGN transactions processed via
              Doexcess
            </li>
            <li>
              Fees are automatically deducted at the point of transaction before
              payout
            </li>
            <li>
              Doexcess may update or adjust fees, but users will receive prior
              notice before changes take effect
            </li>
            <li>
              In the event of chargebacks, fraud, or disputed transactions,
              payouts may be held temporarily pending review and resolution
            </li>
          </Box>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='2300'
          >
            7. Intellectual Property
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='2400'>
            All content, software, design, and branding on Doexcess are the
            property of Doexcess or its licensors and are protected by
            intellectual property laws. You are granted a limited,
            non-transferable license to use the Services in accordance with
            these Terms.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='2500'
          >
            8. Termination
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='2600'>
            We reserve the right to suspend or terminate your account and access
            to the Services at our discretion, especially if:
          </Text>
          <Box
            as='ul'
            pl={6}
            color='#434453'
            data-aos='fade-up'
            data-aos-delay='2700'
          >
            <li>You violate these Terms</li>
            <li>You engage in misuse or abuse of the platform</li>
            <li>Required payments are not made</li>
          </Box>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='2800'>
            You may also terminate your account at any time by contacting us.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='2900'
          >
            9. Disclaimers
          </Heading>

          <Text color='#434453' data-aos='fade-up' data-aos-delay='3000'>
            We use commercially reasonable measures to provide reliable and
            secure Services. However, the Services are provided on an “as is”
            and “as available” basis. We do not warrant that the platform will
            be uninterrupted, error-free, or free from vulnerabilities, and you
            acknowledge that use of Doexcess involves inherent technical risks.
          </Text>

          <Text color='#434453' data-aos='fade-up' data-aos-delay='3100'>
            To the fullest extent permitted by law, we disclaim all warranties,
            whether express, implied, or statutory—including but not limited to
            implied warranties of merchantability, fitness for a particular
            purpose, title, and non-infringement. No advice or information
            obtained from us creates any warranty unless expressly stated in
            writing.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='3500'
          >
            10. Modifications
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='3600'>
            We may modify these Terms from time to time. When we do, we will
            update the &quot;Effective Date&quot; at the top and notify you of
            material changes. Continued use of the Services after such updates
            constitutes acceptance of the new terms.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='3700'
          >
            11. Third-Party Services
          </Heading>

          <Text color='#434453' data-aos='fade-up' data-aos-delay='3800'>
            The Services may integrate with, rely on, or provide access to
            third-party platforms, applications, or services. These third-party
            providers operate independently, and their content, policies, and
            practices are not controlled by Doexcess.
          </Text>

          <Text color='#434453' data-aos='fade-up' data-aos-delay='3900'>
            We do not endorse or assume responsibility for third-party services,
            and we make no representations regarding their availability,
            accuracy, or compliance. Your interactions with any third-party
            platforms are governed by their respective terms and policies.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='3900'
          >
            12. Governing Law
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='4000'>
            These Terms shall be governed by and interpreted in accordance with
            the laws of Lagos, Nigeria without regard to its conflict of law
            principles.
          </Text>

          <Heading
            as='h3'
            size='sm'
            color='#2326a3'
            mt={6}
            data-aos='fade-up'
            data-aos-delay='4100'
          >
            13. Contact Us
          </Heading>
          <Text color='#434453' data-aos='fade-up' data-aos-delay='4200'>
            If you have any questions about these Terms, please contact us:
          </Text>
          <Box pl={4} color='#434453' data-aos='fade-up' data-aos-delay='4300'>
            <Text>
              Email: <b>hello@doexcess.com</b>{' '}
            </Text>
            <Text>Business Name: Doexcess</Text>
            <Text>Website: https://doexcess.com</Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default TermsPage;
