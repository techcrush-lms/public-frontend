import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Input,
  Stack,
} from '@chakra-ui/react';

const orderSummary = [
  { name: 'Product 1', price: 29.99, quantity: 1 },
  { name: 'Product 2', price: 19.99, quantity: 2 },
];
const subtotal = orderSummary.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

export default function CheckoutPage() {
  return (
    <Box bg='#F7F8F8' minH='100vh'>
      <Container maxW='container.md' py={16}>
        <Heading
          as='h1'
          fontSize={{ base: '2xl', md: '3xl' }}
          color='#080930'
          fontWeight='bold'
          mb={8}
        >
          Checkout
        </Heading>
        <Stack direction={{ base: 'column', md: 'row' }} gap={10}>
          {/* Checkout Form */}
          <VStack
            gap={6}
            align='stretch'
            flex={1}
            bg='white'
            p={8}
            borderRadius='xl'
            boxShadow='lg'
          >
            <Box>
              <Text fontWeight={600} mb={1} color='#2326a3'>
                Name
              </Text>
              <Input placeholder='Your Name' required />
            </Box>
            <Box>
              <Text fontWeight={600} mb={1} color='#2326a3'>
                Email
              </Text>
              <Input type='email' placeholder='you@example.com' required />
            </Box>
            <Box>
              <Text fontWeight={600} mb={1} color='#2326a3'>
                Address
              </Text>
              <Input placeholder='Shipping Address' required />
            </Box>
            <Box>
              <Text fontWeight={600} mb={1} color='#2326a3'>
                Payment Info
              </Text>
              <Input placeholder='Card Number' required />
            </Box>
            <Button colorScheme='blue' size='lg' borderRadius='md' mt={4}>
              Place Order
            </Button>
          </VStack>
          {/* Order Summary */}
          <VStack
            gap={6}
            align='stretch'
            flex={1}
            bg='white'
            p={8}
            borderRadius='xl'
            boxShadow='lg'
          >
            <Heading
              as='h2'
              fontSize='xl'
              color='#2326a3'
              fontWeight='bold'
              mb={4}
            >
              Order Summary
            </Heading>
            {orderSummary.map((item, idx) => (
              <HStack key={idx} justify='space-between'>
                <Text>
                  {item.name} x{item.quantity}
                </Text>
                <Text>${(item.price * item.quantity).toFixed(2)}</Text>
              </HStack>
            ))}
            <Box height='1px' bg='#C0C1C6' w='full' />
            <HStack justify='space-between'>
              <Text fontWeight='bold'>Subtotal</Text>
              <Text fontWeight='bold'>${subtotal.toFixed(2)}</Text>
            </HStack>
          </VStack>
        </Stack>
      </Container>
    </Box>
  );
}
