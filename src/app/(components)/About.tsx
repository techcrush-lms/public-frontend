import { DiamondIcon } from '@/components/svgs';
import {
  Box,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Button,
  CloseButton,
  Dialog,
  Portal,
} from '@chakra-ui/react';
import Image from 'next/image';
import { Suspense } from 'react';

export default function About() {
  const headingSize = {
    base: '2xl',
    sm: '3xl',
    md: '4xl',
    lg: '5xl',
  };

  const subHeadingSize = {
    base: 'xl',
    sm: '2xl',
    md: '3xl',
  };

  return (
    <Stack
      minHeight={{ base: 'auto', md: '706px', lg: '906px' }}
      width='full'
      align='center'
      justify='center'
      overflow='hidden'
      // px={{ base: 4, md: 6, lg: 8 }}
      py={{ base: 16, md: 12, lg: 16 }}
      backgroundColor='#F7F8F8'
    >
      <Container maxW='container.xl'>
        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 2 }}
          alignItems='center'
          // spaceX={{ base: 8, md: 10 }}
        >
          <VStack
            align={{ base: 'center', md: 'start' }}
            // spaceX={{ base: 8, md: 12, lg: 16 }}
            gap={10}
          >
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
                fontWeight='medium'
              >
                <DiamondIcon />
                About
              </Text>
            </Box>

            {/* Main Heading Section */}
            <VStack align={{ base: 'center', md: 'start' }}>
              <Heading
                as='h1'
                color='#080930'
                fontSize={headingSize}
                lineHeight={1.2}
                fontWeight='bold'
                textAlign={{ base: 'center', md: 'start' }}
              >
                Where Simplicity Meets Impact
              </Heading>

              <Text
                color='#434453'
                fontSize={{ base: 'md', md: 'lg' }}
                display={{ mdDown: 'none', lg: 'block' }}
                lineHeight={1.6}
                textAlign={{ base: 'center', md: 'start' }}
              >
                At Doexcess, we believe digital work shouldn&apos;t feel
                disorganized or overwhelming. We&apos;ve seen people experience
                the stress of juggling scattered tools, missing tasks, and
                managing important workflows with systems that simply
                didn&apos;t scale. So we decided to build something more
                efficient.
              </Text>

              {/* Mobile */}
              <Text
                color='#434453'
                fontSize={{ base: 'md', md: 'lg' }}
                display={{ mdDown: 'block', lg: 'none' }}
                lineHeight={1.6}
                textAlign={{ base: 'center', md: 'start' }}
              >
                At Doexcess, we&apos;re building a platform that helps
                individuals, teams, and organizations simplify tasks, reduce
                chaos, and stay organized — all in one place. We&apos;ve seen
                people experienced the stress of switching between tools,
                missing deadlines, and managing scattered workflows. So we
                created a smarter way to work. Doexcess is a system built to
                help you optimize how you work — with more clarity, more
                control, and less stress.
              </Text>
            </VStack>

            {/* Our Story Section */}
            <VStack align={{ base: 'center', md: 'start' }}>
              <Heading
                as='h2'
                color='#080930'
                fontSize={subHeadingSize}
                lineHeight={1.2}
                fontWeight='bold'
                textAlign={{ base: 'center', md: 'start' }}
              >
                Our Story
              </Heading>

              <Text
                color='#434453'
                fontSize={{ base: 'md', md: 'lg' }}
                lineHeight={1.6}
                textAlign={{ base: 'center', md: 'start' }}
              >
                It all started early 2024 when I began working on a project I
                initially called SkillUp. The idea was simple: make practical
                knowledge affordable and accessible to as many people as
                possible. But when I discovered the name was already taken, I
                rebranded it to Learnexcess and kept building—layer by layer.
                <br />
                I&apos;ve always had a passion for creating things, especially
                tools that solve real problems. And over time, I noticed
                something: many creators were struggling to manage their digital
                offerings effectively. There were too many moving parts—too many
                tools that didn&apos;t quite fit together. That&apos;s when it
                hit me: "What if we build an all-in-one solution that could
                solve this specific problem?"...
              </Text>
              <ViewStoryModal />
            </VStack>
          </VStack>

          {/* Image - Hidden on mobile, visible on md and up */}
          <Box
            display={{ base: 'none', md: 'none', lg: 'flex' }}
            width='full'
            height='full'
            justifyContent='center'
            alignItems='center'
          >
            <Image
              src='/images/org.png'
              alt='Doexcess about section illustration'
              width={600}
              height={500}
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '600px',
              }}
              priority
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Stack>
  );
}

const ViewStoryModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {/* <Box
          as='span'
          color='#4045E1'
          fontWeight='bold'
          fontSize={{ base: 'md', md: 'lg' }}
          _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
          
        >
          Read more
        </Box> */}
        <Button
          bg='#4045E1'
          color='white'
          marginTop={3}
          fontSize={{ base: 14, md: 15 }}
          borderRadius={10}
          padding={{ base: 4, md: 5 }}
        >
          Read More
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content backgroundColor='white'>
            <Dialog.Header>
              <Dialog.Title>The Birth of Doexcess</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box
                color='gray.700'
                fontSize={{ base: 'md', md: 'lg' }}
                lineHeight={1.7}
              >
                <Text mb={4}>
                  It all started early 2024 when I began working on a project I
                  initially called SkillUp. The idea was simple: make practical
                  knowledge affordable and accessible to as many people as
                  possible. But when I discovered the name was already taken, I
                  rebranded it to LearnExcess and kept building—layer by layer.
                </Text>
                <Text mb={4}>
                  I've always had a passion for creating things, especially
                  tools that solve real problems. And over time, I noticed
                  something: many creators were struggling to manage their
                  digital offerings effectively. There were too many moving
                  parts—too many tools that didn't quite fit together. That's
                  when it hit me: "What if we build an all-in-one solution that
                  can solve this specific problem?"
                </Text>
                <Text mb={4}>
                  So, after a lot of ideation, conviction, and planning, I
                  decided to take LearnExcess in a new direction—and that's how
                  Doexcess was born.
                </Text>
                <Text mb={4}>
                  The goal is to build a platform that helps creators and
                  businesses streamline processes, automate tasks, and manage
                  digital products seamlessly.
                </Text>
                <Text mb={4}>
                  Once I had the foundation set, I reached out to{' '}
                  <a
                    href='https://www.linkedin.com/in/oluwatofunmi-ishola-5900a5282/'
                    target='blank'
                    style={{ textDecoration: 'underline' }}
                  >
                    Tofunmi
                  </a>
                  , who believed in the vision and jumped in to help. Starting
                  with the logo design,{' '}
                  <a
                    href='https://www.linkedin.com/in/benjamin-okunowo-393336179/'
                    target='blank'
                    style={{ textDecoration: 'underline' }}
                  >
                    Ben
                  </a>
                  , a longtime friend, was also quick to get on board.
                </Text>
                <Text mb={4}>
                  Now, we're building something we truly believe in—a powerful,
                  easy-to-use solution that takes the hassle out of work,
                  empowers creators, and puts cutting-edge technology into
                  people's hands.
                </Text>
                <Text>
                  At its core, Doexcess is about making tasks easier. We're here
                  to help people focus less on the busywork and more on what
                  really matters—creating, growing, and delivering value.
                </Text>
                <Text mt={8} color='gray.500' fontSize='md' textAlign='left'>
                  Emmanuel Olaleye
                  <br />
                  Co-Founder/Software Engineer
                </Text>
              </Box>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton
                size='sm'
                color='black'
                _hover={{ bg: 'transparent', color: '#4045E1' }}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
