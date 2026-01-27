import { DiamondIcon } from '@/components/svgs';
import {
  VStack,
  Container,
  Box,
  HStack,
  Text,
  Heading,
  Stack,
  Accordion,
  Span,
} from '@chakra-ui/react';
import { useState } from 'react';
import Link from 'next/link';

interface FaqsPageProps {
  currentPage?: boolean;
}
export default function Faq({ currentPage = false }: FaqsPageProps) {
  const [openItems, setOpenItems] = useState<string[]>(['a']);

  const toggleItem = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [value]
    );
  };

  const isOpen = (value: string) => openItems.includes(value);

  const faqs = {
    General: [
      {
        title: 'What is Doexcess?',
        value: 'a',
        text: 'Doexcess is an all-in-one platform that helps individuals, teams, and organizations optimize tasks, streamline workflows, and work more efficiently — all from a single app.',
      },
      {
        title: 'Who is Doexcess for?',
        value: 'b',
        text: 'Doexcess is designed for anyone looking to manage their tasks better — from entrepreneurs and creators to small teams and large organizations. If you handle recurring processes or digital operations, Doexcess is built for you.',
      },
      {
        title: '⁠Is Doexcess free to use?',
        value: 'c',
        text: 'We offer a free plan with essential features and flexible paid plans with advanced tools and automations. You can choose what best fits your workflow.',
      },
      {
        title: 'What kind of tasks can I manage on Doexcess?',
        value: 'd',
        text: "Everything from content planning, customer communication, order tracking, project timelines, document sharing, to internal workflows. It's flexible to suit your use case.",
      },
      {
        title: 'Can I collaborate with others on Doexcess?',
        value: 'e',
        text: 'Yes! Doexcess allows real-time collaboration with teammates, clients, or partners — helping you stay in sync without the clutter.',
      },
      {
        title: 'How secure is my data on Doexcess?',
        value: 'f',
        text: (
          <>
            We take data privacy seriously. Your information is stored securely
            and managed in line with global data protection standards. See our{' '}
            <Link href='/privacy-policy'>
              <b>Privacy Policy</b>
            </Link>{' '}
            for full details.
          </>
        ),
      },
    ],
  };

  // Responsive values
  const headingSize = {
    base: '24px',
    sm: '30px',
    md: '36px',
    lg: '46px',
  };

  return (
    <VStack
      minHeight={{
        base: '500px',
        md: '600px',
        lg: '100px',
      }}
      width='full'
      align='center'
      justify='center'
      overflow='hidden'
      spaceX={{ base: 6, md: 10 }}
      py={{ base: 8, md: 12 }}
    >
      <Container maxW='container.xl' px={{ base: 4, md: 6 }}>
        <VStack>
          {!currentPage && (
            <>
              <HStack justify='center'>
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
                    FAQs
                  </Text>
                </Box>
              </HStack>

              <Heading
                as='h3'
                color='#080930'
                fontSize={headingSize}
                textAlign='center'
                px={{ base: 2, sm: 0 }}
                lineHeight='tall'
                fontWeight='bold'
              >
                Frequently Asked Questions
              </Heading>

              <Text
                textAlign='center'
                color='#6B6B8B'
                fontSize='md'
                maxWidth='603px'
              >
                Browse frequently asked questions about Doexcess. Learn how to
                set up, automate, and manage your business operations with ease
              </Text>
            </>
          )}

          <Box
            pt={8}
            width='100%'
            maxWidth='800px'
            background="url('/images/faqGrid.png')"
            backgroundSize='contain'
            backgroundPosition='center top'
            backgroundRepeat='no-repeat'
          >
            {Object.entries(faqs).map(([category, items]) => (
              <Stack gap='2' key={category} mb={8} color='#000'>
                <Accordion.Root
                  size='sm'
                  variant='subtle'
                  collapsible
                  defaultValue={['a']}
                >
                  {items.map((item, index) => (
                    <Accordion.Item
                      key={index}
                      value={item.value}
                      backgroundColor='rgba(247, 248, 248, 1)'
                      mb='2'
                      borderRadius='8px'
                      paddingX={{ base: 2, md: 5 }}
                    >
                      <Accordion.ItemTrigger
                        onClick={() => toggleItem(item.value)}
                        padding={5}
                      >
                        <Text
                          flex='1'
                          fontSize={{ base: '18px', md: '22px' }}
                          fontWeight='semibold'
                        >
                          {item.title}
                        </Text>
                        <Text
                          fontSize='25px'
                          fontWeight='semibold'
                          color='gray.500'
                        >
                          {isOpen(item.value) ? '−' : '+'}
                        </Text>
                      </Accordion.ItemTrigger>
                      <Accordion.ItemContent paddingX={5} paddingBottom={5}>
                        <Text fontSize={{ base: '13px', md: '16px' }}>
                          {item.text || 'Answer to be added...'}
                        </Text>
                      </Accordion.ItemContent>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </Stack>
            ))}
          </Box>
        </VStack>
      </Container>
    </VStack>
  );
}
