import { DiamondIcon } from '@/components/svgs';
import {
  VStack,
  Container,
  Box,
  HStack,
  Text,
  Heading,
} from '@chakra-ui/react';

export default function BlogPost() {
  const blogPosts = [
    {
      image: '/images/blog-posts/4th.png',
      body: 'From Chaos to Clarity: How to Centralize Your Workflows in 2025',
    },
    {
      image: '/images/blog-posts/5th.png',
      body: 'The Secret to Member Retention? It’s All About Onboarding.',
    },
    {
      image: '/images/blog-posts/1st.png',
      body: 'Why Nigerian Businesses Are Switching to All-in-One SaaS Platforms',
    },
    {
      image: '/images/blog-posts/2nd.png',
      body: 'How to Double Event Attendance with Smart Ticketing Tools',
    },
    {
      image: '/images/blog-posts/3rd.png',
      body: '10 Time-Saving Automation Hacks for Busy Community Managers',
    },
    {
      image: '/images/blog-posts/4th.png',
      body: 'From Chaos to Clarity: How to Centralize Your Workflows in 2025',
    },
    {
      image: '/images/blog-posts/5th.png',
      body: 'The Secret to Member Retention? It’s All About Onboarding.',
    },
    {
      image: '/images/blog-posts/1st.png',
      body: 'Why Nigerian Businesses Are Switching to All-in-One SaaS Platforms',
    },
    {
      image: '/images/blog-posts/2nd.png',
      body: 'How to Double Event Attendance with Smart Ticketing Tools',
    },
    {
      image: '/images/blog-posts/3rd.png',
      body: '10 Time-Saving Automation Hacks for Busy Community Managers',
    },
  ];

  // Responsive values
  const headingSize = {
    base: '24px',
    sm: '30px',
    md: '36px',
    lg: '48px',
  };

  const cardMinWidth = {
    base: '280px',
    sm: '300px',
    md: '320px',
  };

  const cardHeight = {
    base: '300px',
    md: '340px',
    lg: '360px',
  };

  const textWidth = {
    base: '240px',
    md: '261px',
  };

  const gradientWidth = {
    base: '100px',
    md: '200px',
    lg: '300px',
  };

  return (
    <VStack
      minHeight={{ base: '500px', md: '600px', lg: '700px' }}
      width='full'
      align='center'
      justify='center'
      overflow='hidden'
      // spaceX={{ base: 6, md: 10 }}
      py={{ base: 8, md: 12 }}
    >
      <Container maxW='container.xl' px={{ base: 4, md: 6 }}>
        <VStack spaceX={{ base: 4, md: 6 }}>
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
                Blog Post
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
          >
            Learn More About Us From Our Blogs
          </Heading>
        </VStack>
      </Container>

      <Box position='relative' width='full' mt={{ base: 6, md: 10 }}>
        {/* Left Gradient Shadow */}
        <Box
          position='absolute'
          left='0'
          top='0'
          bottom='0'
          width={gradientWidth}
          zIndex='1'
          background='linear-gradient(to right, #F7F8F8 0%, transparent 100%)'
          pointerEvents='none'
        />

        {/* Right Gradient Shadow */}
        <Box
          position='absolute'
          right='0'
          top='0'
          bottom='0'
          width={gradientWidth}
          zIndex='1'
          background='linear-gradient(to left, #F7F8F8 0%, transparent 100%)'
          pointerEvents='none'
        />

        {/* Scrollable Cards */}
        <HStack
          overflowX='auto'
          spaceX={{ base: 6, md: 8, lg: 10 }}
          // px={{ base: 4, md: 6 }}
          py={2}
          css={{
            '&::-webkit-scrollbar': { display: 'none' },
            '-ms-overflow-style': 'none',
            // "scrollbar-width": "none",
            scrollbarWidth: 'none',
          }}
        >
          {blogPosts.map((post, i) => (
            <Box
              key={i}
              minWidth={cardMinWidth}
              height={cardHeight}
              flexShrink={0}
              backgroundImage={`url('${post.image}')`}
              backgroundSize='cover'
              backgroundPosition='center'
              borderWidth='1px'
              borderColor='#080930'
              borderRadius='24px'
              position='relative'
              overflow='hidden'
            >
              {/* Blur Overlay */}
              <Box
                position='absolute'
                bottom={0}
                left={0}
                right={0}
                height='30%'
                bg='rgba(255, 255, 255, 0.3)'
                backdropFilter='blur(2px)'
                css={{ '-webkit-backdrop-filter': 'blur(8px)' }}
              />

              {/* Content */}
              <Box
                position='absolute'
                bottom={0}
                left={0}
                right={0}
                p={{ base: 4, md: 5 }}
                zIndex={1}
              >
                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  fontWeight='bold'
                  width={textWidth}
                  color='#080930'
                  lineHeight='short'
                >
                  {post.body}
                </Text>
              </Box>
            </Box>
          ))}
        </HStack>
      </Box>
    </VStack>
  );
}
