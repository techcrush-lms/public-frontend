import { DiamondIcon } from '@/components/svgs';
import {
  VStack,
  Container,
  Box,
  HStack,
  Text,
  Heading,
  Stack,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { BsArrowRight } from 'react-icons/bs';
import Image from 'next/image';
import { features } from '@/lib/utils';
import Link from 'next/link';

export default function Features() {
  // Responsive values
  const headingSize = {
    base: '24px',
    sm: '30px',
    md: '36px',
    lg: '46px',
  };

  return (
    <VStack
      minHeight={{ base: '500px', md: '600px', lg: '700px' }}
      width='full'
      align='center'
      justify='center'
      overflow='hidden'
      // spaceX={{ base: 6, md: 10 }}
      py={{ base: 10, md: 40 }}
      backgroundColor='#FFFFFF'
    >
      <Container maxW='container.xl' px={{ base: 4, md: 6 }}>
        <VStack spaceX={{ base: 0, md: 6 }}>
          {/* <HStack justify='center'>
            <Box
              backgroundColor='#4045E1'
              borderRadius='24px'
              width={{ base: '80px', md: '88px' }}
              height={{ base: '22px', md: '25px' }}
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <Text
                display='flex'
                gap='1'
                alignItems='center'
                color='#EDEEFC'
                fontSize={{ base: '10px', md: 'xs' }}
              >
                <DiamondIcon />
                Features
              </Text>
            </Box>
          </HStack> */}

          <Heading
            as='h3'
            color='#080930'
            fontSize={headingSize}
            textAlign='center'
            lineHeight='short'
            width={{ md: 'md', lg: 'full' }}
            marginBottom={10}
            fontWeight='bold'
          >
            Features that make your business easier
          </Heading>
          <Stack gap={{ base: 6, sm: 8 }}>
            <SimpleGrid
              templateColumns={{ base: '1fr', md: 'repeat(2,1fr)' }}
              gap={{ base: 5, sm: 10 }}
            >
              {features.map((feature) => (
                <VStack
                  width='588'
                  height='432'
                  key={feature.title}
                  gap={{ base: 5, md: 10 }}
                  align='center'
                  borderRadius='16px'
                  border='1px solid rgba(237, 238, 252, 1)'
                  p={{ base: 2, md: 5 }}
                  backgroundColor='rgba(247, 248, 248, 1)'
                  color='#000'
                >
                  <Image
                    src={feature.src}
                    alt={feature.title.toLowerCase()}
                    width='401'
                    height='250'
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                    }}
                  />
                  <VStack gap={5} align='start'>
                    <Heading>{feature.title}</Heading>
                    <Text maxWidth='535px' fontWeight='400'>
                      {feature.body}
                    </Text>
                    <Button
                      variant='ghost'
                      colorScheme='blue'
                      size='sm'
                      p={0}
                      h='auto'
                      _hover={{
                        bg: 'blue.50',
                        transform: 'translateX(4px)',
                      }}
                      transition='all 0.2s'
                      onClick={() => {
                        // Navigate to feature details or scroll to relevant section
                        const element = document.getElementById(
                          `feature-${feature.title
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`
                        );
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <HStack gap={2} align='center'>
                        <Link href={feature.url} passHref>
                          <Text
                            fontSize='sm'
                            fontWeight='semibold'
                            color='#4045E1'
                          >
                            Learn More
                          </Text>
                        </Link>
                      </HStack>
                    </Button>
                  </VStack>
                </VStack>
              ))}
            </SimpleGrid>
            {/* <SimpleGrid
              templateColumns={{ base: '1fr', md: 'repeat(2,1fr)' }}
              gap={{ base: 5, sm: 10 }}
              justifyItems='center'
              alignItems='center'
            >
              {features2.map((feature) => (
                <VStack
                  width='588'
                  height='432'
                  key={feature.title}
                  gap={{ base: 5, md: 10 }}
                  align='center'
                  borderRadius='16px'
                  border='1px solid rgba(237, 238, 252, 1)'
                  p={{ base: 2, md: 5 }}
                  backgroundColor='rgba(247, 248, 248, 1)'
                  color='#000'
                >
                  <Image
                    src={feature.src}
                    alt={feature.title.toLowerCase()}
                    width='401'
                    height='250'
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <VStack gap={5} align='start'>
                    <Heading>{feature.title}</Heading>
                    <Text maxWidth='535px' fontWeight='400'>
                      {feature.body}
                    </Text>
                  </VStack>
                </VStack>
              ))}
            </SimpleGrid> */}
          </Stack>
        </VStack>
      </Container>
    </VStack>
  );
}
