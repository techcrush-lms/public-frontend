'use client';

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  HStack,
  Image,
  Avatar,
  Flex,
  Button,
} from '@chakra-ui/react';
import Header from '../Header';
import Footer from '../Footer';
import GetStarted from '../GetStarted';
import { useRef } from 'react';
import { headingSize } from '@/lib/utils';

const whyItems = [
  {
    icon: '/images/🛠️.png',
    title: 'Accessible Automation',
    desc: "Automation should be accessible, even if you're not tech-savvy.",
  },
  {
    icon: '/images/🔄.png',
    title: 'Workflow First',
    desc: 'Tools should adapt to your workflow—not force you to change.',
  },
  {
    icon: '/images/🚀.png',
    title: 'Big-League Tools',
    desc: 'Small teams deserve big-league tools (without the complexity)!',
  },
];

const team = [
  {
    name: 'Emmanuel Olaleye',
    role: 'Co-Founder & CEO',
    img: '/images/emmanuel.jpeg',
    lead: true,
  },
  {
    name: 'Oluwatofunmi Ishola',
    role: 'Co-Founder/Product Designer',
    img: '/images/tofunmi.jpg',
  },
  {
    name: 'Benjamin Okunowo',
    role: 'Co-Founder/Creative Designer',
    img: '/images/bgraphics.jpg',
  },
];

export default function AboutPage() {
  const aboutRef = useRef(null);

  return (
    <Box bg='#F7F8F8'>
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
                About Doexcess
              </Heading>
              <Text
                color='#6B6B8B'
                fontSize='md'
                textAlign='center'
                data-aos='fade-up'
                data-aos-delay='300'
              >
                We're Building the Tool We Wish Existed
              </Text>
            </VStack>
          </Container>
        </Box>
      </Stack>

      <Box
        bg='#fff'
        marginTop={-10}
        paddingTop={20}
        boxShadow='0 4px 32px 0 rgba(19, 69, 98, 0.08)'
        data-aos='fade-up'
      >
        <Container
          maxW='container.xl'
          p={{ base: 4, md: 10 }}
          w='full'
          display='flex'
          flexDir={{ base: 'column', md: 'row' }}
          alignItems='center'
          gap={{ base: 8, md: 20 }}
          mt={0}
        >
          <Box
            flex='1'
            w='full'
            mb={{ base: 6, md: 0 }}
            data-aos='fade-right'
            data-aos-delay='100'
          >
            <Image
              src='/images/org.png'
              alt='About Doexcess'
              width={700}
              height={400}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                minHeight: '180px',
                maxHeight: '400px',
              }}
            />
          </Box>
          <Box flex='1' w='full' data-aos='fade-left' data-aos-delay='200'>
            <VStack align='start' gap={4} w='full'>
              <Text color='#434453' fontSize={{ base: 'sm', md: 'md' }}>
                At Doexcess, we believe digital work shouldn't feel disorganized
                or overwhelming. We&apos;ve seen people experience the stress of
                juggling scattered tools, missing tasks, and managing important
                workflows with systems that simply didn&apos;t scale.
                <br />
                <br /> So we decided to build something more efficient. <br />
                <br /> Doexcess is a task optimization platform built to help
                individuals and organizations stay on top of what matters —
                without the patchwork of disconnected apps. From solopreneurs to
                growing teams, we&apos;re creating a space where structure meets
                simplicity, and productivity becomes second nature. We're a team
                of creators, developers, and operators — and we&apos;re building
                this for people who are ready to work smarter.
              </Text>
            </VStack>
          </Box>
        </Container>
      </Box>
      {/* Our Why Section */}
      <Stack
        minHeight={{ base: 'auto', md: '600px', lg: '200px' }}
        width='full'
        align='center'
        justify='center'
        overflow='hidden'
        px={{ base: 4, md: 0, lg: 0 }}
        pb={{ base: 8, md: 12, lg: 16 }}
        pt={{ base: 0, md: 100, lg: 100 }}
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
          linear-gradient(104deg, rgba(255, 255, 255, 0.55) 0%, rgba(199, 202, 255, 1) 100%)
        `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box py={{ base: 16, md: 24 }} bg='#fff'>
          <Container maxW='container.xl'>
            <VStack gap={10}>
              <Heading
                as='h2'
                fontSize={headingSize}
                color='#080930'
                textAlign='center'
                fontWeight='bold'
                data-aos='fade-up'
                data-aos-delay='100'
              >
                Our Why
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={10} w='full'>
                {whyItems.map((item, index) => (
                  <VStack
                    key={item.title}
                    bg='#fff'
                    borderRadius='16px'
                    border='1px solid #EDEEFC'
                    p={8}
                    align='center'
                    gap={6}
                    boxShadow='0 2px 16px 0 rgba(19, 69, 98, 0.06)'
                    data-aos='zoom-in'
                    data-aos-delay={200 + index * 100}
                  >
                    <Image
                      src={item.icon}
                      alt={item.title}
                      boxSize='80px'
                      mb={2}
                    />
                    <Heading
                      as='h3'
                      fontSize='xl'
                      color='#080930'
                      fontWeight='bold'
                      textAlign='center'
                    >
                      {item.title}
                    </Heading>
                    <Text color='#434453' fontSize='md' textAlign='center'>
                      {item.desc}
                    </Text>
                  </VStack>
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>
      </Stack>
      {/* Meet the Team Section */}
      <Box py={{ base: 16, md: 24 }} bg='#F7F8F8' data-aos='fade-up'>
        <Container maxW='container.xl'>
          <VStack gap={10}>
            <Text
              bg='#4045E1'
              color='#EDEEFC'
              borderRadius='24px'
              px={4}
              py={1}
              fontSize='xs'
              fontWeight='medium'
              alignSelf='center'
              data-aos='fade-down'
              data-aos-delay='100'
            >
              The Team
            </Text>
            <Heading
              as='h2'
              fontSize={headingSize}
              color='#080930'
              textAlign='center'
              fontWeight='bold'
              data-aos='fade-up'
              data-aos-delay='200'
            >
              Meet the Great Team
            </Heading>
            <Text
              color='#434453'
              fontSize='md'
              textAlign='center'
              maxW='600px'
              data-aos='fade-up'
              data-aos-delay='300'
            >
              Our philosophy is simple: hire great minds and give them the
              resources and support to do great works.
            </Text>
            <VStack gap={8} w='full' align='center'>
              {/* Lead member centered */}
              <Box display='flex' justifyContent='center' w='full'></Box>

              {/* Other members in a row */}
              <Box w='full' maxW='1000px' mx='auto'>
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3 }}
                  gap={{ base: 4, md: 6 }}
                  w='full'
                  justifyItems='center'
                >
                  {team.map((member, index) => (
                    <Box
                      key={member.name}
                      bg='#fff'
                      borderRadius='16px'
                      border='1px solid #EDEEFC'
                      boxShadow='0 2px 16px 0 rgba(19, 69, 98, 0.06)'
                      overflow='hidden'
                      position='relative'
                      width='100%'
                      height='400px'
                      display='flex'
                      flexDirection='column'
                      alignItems='center'
                      justifyContent='flex-end'
                      data-aos='fade-up'
                      data-aos-delay={400 + index * 100}
                    >
                      <Image
                        src={member.img}
                        alt={member.name}
                        width={400}
                        height={400}
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'top',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                      <Box
                        position='absolute'
                        left='50%'
                        bottom={{ base: '8px', md: '16px' }}
                        transform='translateX(-50%)'
                        bg='#fff'
                        color='#080930'
                        width={{ base: '90%', sm: '80%', md: '90%' }}
                        px={{ base: 2, sm: 3, md: 5 }}
                        py={2}
                        boxShadow='0 2px 8px 0 rgba(19, 69, 98, 0.10)'
                        display='flex'
                        flexDirection='column'
                        alignItems='start'
                        justifyContent='start'
                      >
                        <Text
                          fontWeight='bold'
                          fontSize={{ base: 'sm', md: 'md' }}
                          textAlign='left'
                        >
                          {member.name}
                        </Text>
                        <Text
                          fontSize={{ base: 'xs', md: 'sm' }}
                          opacity={0.85}
                          textAlign='left'
                        >
                          {member.role}
                        </Text>
                      </Box>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </VStack>
          </VStack>
        </Container>
      </Box>
      {/* CTA Section */}
      <GetStarted />
    </Box>
  );
}
