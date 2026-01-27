'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  Center,
  Icon,
} from '@chakra-ui/react';
import { FaUserPlus } from 'react-icons/fa';

const SignupForm = () => {
  const searchParams = useSearchParams();
  const businessId = searchParams.get('business_id');

  // Optionally, prettify the business name
  const businessName = businessId
    ? businessId.replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : null;

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validate = () => {
    return {
      name: form.name.trim().length < 2,
      email: !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email),
      phone: form.phone.trim().length < 7,
    };
  };
  const errors = validate();
  const isValid = !errors.name && !errors.email && !errors.phone;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });
    setSubmitted(true);
    if (isValid) {
      // Simulate API call
      setTimeout(() => {
        alert('Signup successful!');
        setForm({ name: '', email: '', phone: '' });
        setSubmitted(false);
        setTouched({ name: false, email: false, phone: false });
      }, 1000);
    }
  };

  if (!businessId) {
    return (
      <Container maxW='container.sm' py={32}>
        <Box
          bg='#fff'
          p={8}
          borderRadius='16px'
          boxShadow='0 2px 16px 0 rgba(19, 69, 98, 0.06)'
        >
          <Heading as='h2' size='lg' color='#4045E1' mb={4} textAlign='center'>
            Invalid Access
          </Heading>
          <Text color='#434453' textAlign='center'>
            This signup page requires a valid business ID. Please use the
            correct link provided by your business or organization.
          </Text>
        </Box>
      </Container>
    );
  }

  // Responsive form width
  const formWidth = {
    base: '100%',
    sm: '400px',
    md: '380px',
  };

  return (
    <Box
      minH='100vh'
      position='relative'
      overflow='hidden'
      bgGradient='linear(120deg, #e0e7ff 0%, #a5b4fc 30%, #6366f1 60%, #a21caf 100%)'
    >
      {/* Decorative blurred circles */}
      <Box
        position='absolute'
        top={['-80px', '-140px']}
        left={['-60px', '-100px']}
        w={['260px', '400px']}
        h={['260px', '400px']}
        bg='radial-gradient(circle, #a5b4fc55 0%, #6366f100 80%)'
        filter='blur(70px)'
        zIndex={0}
        pointerEvents='none'
      />
      <Box
        position='absolute'
        bottom={['-80px', '-120px']}
        right={['-40px', '-80px']}
        w={['180px', '320px']}
        h={['180px', '320px']}
        bg='radial-gradient(circle, #a21caf33 0%, #6366f100 80%)'
        filter='blur(70px)'
        zIndex={0}
        pointerEvents='none'
      />
      <Container
        maxW='container.md'
        py={{ base: 16, md: 36 }}
        position='relative'
        zIndex={1}
      >
        {/* Hero Section */}
        <Center flexDir='column' mb={14}>
          <Icon
            as={FaUserPlus}
            boxSize={{ base: 20, md: 24 }}
            color='#4045E1'
            mb={6}
          />
          <Heading
            as='h1'
            fontSize={{ base: '2.5rem', md: '3.2rem' }}
            color='#2326a3'
            mb={4}
            textAlign='center'
            letterSpacing='-1.5px'
            fontWeight='extrabold'
            lineHeight={1.1}
          >
            Join{' '}
            <Box as='span' color='#4045E1' fontWeight='extrabold'>
              {businessName ? businessName : 'the Organization'}
            </Box>
          </Heading>
          <Text
            color='#434453'
            fontSize={{ base: 'lg', md: 'xl' }}
            textAlign='center'
            maxW='2xl'
            mt={2}
            fontWeight={500}
          >
            Welcome! You&apos;re about to become a member of{' '}
            <Box as='span' color='#4045E1' fontWeight='bold'>
              {businessName ? businessName : 'this organization'}
            </Box>
            . Please fill in your details below to complete your registration.
          </Text>
        </Center>
        <Center>
          <Box
            w={formWidth}
            bg='rgba(255,255,255,0.85)'
            p={{ base: 8, md: 12 }}
            borderRadius='3xl'
            boxShadow='0 12px 48px 0 rgba(64, 69, 225, 0.18), 0 2px 12px 0 rgba(19, 69, 98, 0.10)'
            border='2px solid #e0e7ff'
            style={{ backdropFilter: 'blur(22px)' }}
            position='relative'
          >
            <form onSubmit={handleSubmit}>
              <VStack gap={8} align='stretch'>
                <Box>
                  <Text fontWeight={600} mb={1} color='#2326a3'>
                    Full Name
                  </Text>
                  <Input
                    name='name'
                    placeholder='Enter your full name'
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size='lg'
                    bg='#F7F8F8'
                    borderRadius='8px'
                    borderColor={
                      touched.name && errors.name ? 'red.300' : '#e6e9f5'
                    }
                    _focus={{
                      borderColor: '#4045E1',
                      boxShadow: '0 0 0 1px #4045E1',
                    }}
                    required
                  />
                  {touched.name && errors.name && (
                    <Text color='red.500' fontSize='sm' mt={1}>
                      Name must be at least 2 characters.
                    </Text>
                  )}
                </Box>
                <Box>
                  <Text fontWeight={600} mb={1} color='#2326a3'>
                    Email Address
                  </Text>
                  <Input
                    name='email'
                    type='email'
                    placeholder='Enter your email address'
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size='lg'
                    bg='#F7F8F8'
                    borderRadius='8px'
                    borderColor={
                      touched.email && errors.email ? 'red.300' : '#e6e9f5'
                    }
                    _focus={{
                      borderColor: '#4045E1',
                      boxShadow: '0 0 0 1px #4045E1',
                    }}
                    required
                  />
                  {touched.email && errors.email && (
                    <Text color='red.500' fontSize='sm' mt={1}>
                      Enter a valid email address.
                    </Text>
                  )}
                </Box>
                <Box>
                  <Text fontWeight={600} mb={1} color='#2326a3'>
                    Phone Number
                  </Text>
                  <Input
                    name='phone'
                    placeholder='Enter your phone number'
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size='lg'
                    bg='#F7F8F8'
                    borderRadius='8px'
                    borderColor={
                      touched.phone && errors.phone ? 'red.300' : '#e6e9f5'
                    }
                    _focus={{
                      borderColor: '#4045E1',
                      boxShadow: '0 0 0 1px #4045E1',
                    }}
                    required
                  />
                  {touched.phone && errors.phone && (
                    <Text color='red.500' fontSize='sm' mt={1}>
                      Enter a valid phone number.
                    </Text>
                  )}
                </Box>
                <Button
                  type='submit'
                  colorScheme='blue'
                  size='lg'
                  borderRadius='8px'
                  bgGradient='linear(to-r, #4045E1, #a21caf)'
                  boxShadow='0 2px 12px 0 #4045E133'
                  _hover={{
                    bg: '#2326a3',
                    bgGradient: 'linear(to-r, #2326a3, #4045E1)',
                    boxShadow: '0 4px 16px 0 #4045E144',
                  }}
                  w='full'
                  fontWeight={700}
                  fontSize='lg'
                  disabled={submitted && !isValid}
                  mt={2}
                >
                  {submitted && isValid
                    ? 'Submitting...'
                    : `Join ${businessName ? businessName : 'Now'}`}
                </Button>
              </VStack>
            </form>
            <Box
              as='hr'
              my={8}
              border='none'
              borderTop='1.5px solid #e6e9f5'
              opacity={0.7}
              style={{ filter: 'blur(1.5px)' }}
            />
            <Text
              color='gray.500'
              fontSize='sm'
              textAlign='center'
              letterSpacing='0.01em'
              fontWeight={500}
            >
              Your information is kept private and only shared with your
              organization for onboarding purposes.
            </Text>
          </Box>
        </Center>
      </Container>
    </Box>
  );
};

export default SignupForm;
