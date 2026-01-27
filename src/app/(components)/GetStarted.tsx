import {
  Button,
  VStack,
  Container,
  Heading,
  Text,
  ButtonGroup,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { FiPlayCircle } from 'react-icons/fi';
import DemoVideoModal from './DemoVideoModal';

export default function GetStarted() {
  // Responsive values
  const buttonDirection = {
    base: 'column',
    md: 'row',
  };
  const buttonWidth = { base: 'full', md: '227px' };
  const textAlign = { base: 'center', md: 'left' };
  const stackAlign = { base: 'center', md: 'start' };
  const paddingX = { base: 4, sm: 6, md: 8, lg: 10 };
  const headingSize = {
    base: '30px',
    sm: '38px',
    md: '42px',
    lg: '46px',
  };

  return (
    <VStack
      minHeight={{ base: '600px', md: '700px', lg: '793px' }}
      width='full'
      align='flex-end'
      justify='center'
      bgImage="url('/images/getStarted.png')"
      bgRepeat='no-repeat'
      bgSize='cover'
      bgPos='center'
      paddingX={paddingX}
    >
      <Container maxW='container.xl'>
        <VStack
          maxW={{ base: 'full', md: '512px' }}
          gap={{ base: '16px', md: '20px' }}
          align={stackAlign}
          textAlign={textAlign}
        >
          <Heading
            as='h3'
            color='rgba(237, 238, 252, 1)'
            fontWeight='600'
            fontSize={headingSize}
            lineHeight='1.2'
          >
            <Text fontWeight='bold'>Turn Chaos into Clarity Effortlessly</Text>
          </Heading>
          <Text
            as='p'
            maxW={{ base: 'full', md: '382px' }}
            color='#D4D5D8'
            fontSize={{ base: 'md', md: 'lg' }}
          >
            Automate the Busywork, Focus on What Matters—Your People.
          </Text>
          <ButtonGroup
            size='lg'
            variant='outline'
            flexDirection={buttonDirection}
            width='full'
          >
            <Button
              color='#4045E1'
              width={buttonWidth}
              height={{ base: '48px', md: '52px' }}
              backgroundColor='#EDEEFC'
              borderRadius='12px'
              _hover={{ opacity: 0.9 }}
              onClick={() =>
                window.open(
                  `${process.env.NEXT_PUBLIC_PLATFORM_URL}/onboard/signup`,
                  '_blank'
                )
              }
            >
              Get Started for Free
            </Button>
            <DemoVideoModal color='#00000' bgHover='#4045E1' border='#ffffff' />
          </ButtonGroup>
        </VStack>
      </Container>
    </VStack>
  );
}
