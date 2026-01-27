'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchInvoice, fetchInvoicePublic } from '@/redux/slices/invoiceSlice';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Separator,
  Heading,
  Flex,
  Spinner,
  Grid,
  GridItem,
  Icon,
  Circle,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { Table } from '@chakra-ui/react';
import { Card } from '@chakra-ui/react';
import { Alert } from '@chakra-ui/react';
import { formatMoney } from '@/lib/utils';
import { InvoiceStatus, PaymentMethod } from '@/lib/schema/invoice.schema';
import type { Invoice, InvoiceItem } from '@/types/invoice';
import toast from 'react-hot-toast';
import { usePreviewInvoice } from '@/hooks/page/usePreviewInvoice';
import {
  Calendar,
  DollarSign,
  FileText,
  CreditCard,
  Building2,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Package,
} from 'lucide-react';
import { SuccessAlertModal } from '@/components/SuccessAlertModal';

// Skeleton loader component for better UX
const InvoiceSkeleton = () => (
  <Container maxW='4xl' py={8}>
    <VStack gap={6} align='stretch'>
      {/* Header Skeleton */}
      <Card.Root>
        <Card.Header>
          <Flex justify='space-between' align='center'>
            <Box>
              <Skeleton height='32px' width='200px' mb={2} />
              <HStack gap={4}>
                <Skeleton height='16px' width='120px' />
                <Skeleton height='16px' width='100px' />
                <Skeleton height='24px' width='80px' rounded='full' />
              </HStack>
            </Box>
            <Box textAlign='right'>
              <Skeleton height='60px' width='60px' rounded='full' mb={2} />
              <Skeleton height='20px' width='150px' mb={1} />
              <Skeleton height='16px' width='120px' />
            </Box>
          </Flex>
        </Card.Header>
      </Card.Root>

      {/* Bill To Skeleton */}
      <Card.Root>
        <Card.Header>
          <Skeleton height='24px' width='80px' />
        </Card.Header>
        <Card.Body>
          <Skeleton height='20px' width='140px' mb={1} />
          <Skeleton height='16px' width='160px' />
        </Card.Body>
      </Card.Root>

      {/* Items Table Skeleton */}
      <Card.Root>
        <Card.Header>
          <Skeleton height='24px' width='60px' />
        </Card.Header>
        <Card.Body p={0}>
          <Box p={6}>
            <SkeletonText noOfLines={5} />
          </Box>
        </Card.Body>
      </Card.Root>

      {/* Payment Breakdown Skeleton */}
      <Card.Root>
        <Card.Header>
          <Skeleton height='24px' width='150px' />
        </Card.Header>
        <Card.Body>
          <VStack gap={3} align='stretch'>
            <Flex justify='space-between'>
              <Skeleton height='18px' width='80px' />
              <Skeleton height='18px' width='100px' />
            </Flex>
            <Flex justify='space-between'>
              <Skeleton height='18px' width='100px' />
              <Skeleton height='18px' width='120px' />
            </Flex>
            <Skeleton height='1px' width='full' />
            <Flex justify='space-between'>
              <Skeleton height='20px' width='60px' />
              <Skeleton height='20px' width='110px' />
            </Flex>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  </Container>
);

const InvoiceView = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { invoice, loading, error } = usePreviewInvoice();
  const invoiceId = params.id as string;

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [isPaying, setIsPaying] = useState(false);

  const handlePaystackPayment = async () => {
    if (!invoice) return;

    setIsPaying(true);

    try {
      // Import Paystack hook dynamically
      const { usePaystackPayment } = await import('react-paystack');

      const config = {
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        reference: invoice.payment.id,
        amount: parseFloat(invoice.amount) * 100, // Convert to kobo
        email: invoice.user.email,
        currency: invoice.currency,
      };

      const initializePayment = usePaystackPayment(config);

      initializePayment({
        onSuccess: (response) => {
          toast.success('Payment successful!');

          // Remove stored payment session
          localStorage.removeItem('payment_data');

          // Show success modal
          setIsSuccessModalOpen(true);

          // Refresh invoice data to show updated status
          dispatch(fetchInvoicePublic({ id: invoiceId }));
        },
        onClose: () => {
          // Remove session so popup does NOT reopen after cancellation
          localStorage.removeItem('payment_data');

          setIsPaying(false);
        },
      });
    } catch (error: any) {
      toast.error(error.message || 'Payment failed');
    } finally {
      setIsPaying(false);
    }
  };

  const getStatusConfig = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.PAID:
        return { color: 'green', icon: CheckCircle, label: 'Paid' };
      case InvoiceStatus.PUBLISHED:
        return { color: 'blue', icon: Clock, label: 'Published' };
      case InvoiceStatus.DRAFT:
        return { color: 'gray', icon: FileText, label: 'Draft' };
      case InvoiceStatus.CANCELLED:
        return { color: 'red', icon: XCircle, label: 'Cancelled' };
      default:
        return { color: 'gray', icon: AlertCircle, label: 'Unknown' };
    }
  };

  if (loading) {
    return <InvoiceSkeleton />;
  }

  if (error) {
    return (
      <Container maxW='4xl' py={8}>
        <Alert.Root status='error'>
          <Alert.Indicator />
          <Alert.Title mr={2}>Error loading invoice!</Alert.Title>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Root>
      </Container>
    );
  }

  if (!invoice) {
    return (
      <Container maxW='4xl' py={8}>
        <Alert.Root status='info'>
          <Alert.Indicator />
          <Alert.Title mr={2}>Invoice not found!</Alert.Title>
          <Alert.Description>
            The invoice you're looking for doesn't exist.
          </Alert.Description>
        </Alert.Root>
      </Container>
    );
  }

  const subtotal = parseFloat(invoice.subtotal);
  const vatAmount = parseFloat(invoice.vat_amount);
  const discountAmount = parseFloat(invoice.discount);
  const total = parseFloat(invoice.amount);
  const statusConfig = getStatusConfig(invoice.status);

  return (
    <Box bg='gray.50' minH='100vh' py={8}>
      <Container maxW='4xl'>
        <VStack gap={6} align='stretch'>
          {/* Invoice Header - Enhanced */}
          <Card.Root bg='white' shadow='lg' borderColor='gray.200'>
            <Card.Header pb={6}>
              <Grid
                templateColumns={{ base: '1fr', md: '2fr 1fr' }}
                gap={6}
                alignItems='center'
              >
                <GridItem>
                  <VStack align='start' gap={3}>
                    <HStack gap={3}>
                      <Icon as={FileText} boxSize={8} color='blue.500' />
                      <Box>
                        <Heading size='xl' color='gray.900'>
                          Invoice #{invoice.invoice_no}
                        </Heading>
                        <HStack gap={4} mt={1}>
                          <HStack gap={1}>
                            <Icon as={Calendar} boxSize={4} color='gray.500' />
                            <Text fontSize='sm' color='gray.600'>
                              Issued:{' '}
                              {new Date(invoice.issued_at).toLocaleDateString()}
                            </Text>
                          </HStack>
                          <HStack gap={1}>
                            <Icon as={Clock} boxSize={4} color='gray.500' />
                            <Text fontSize='sm' color='gray.600'>
                              Due:{' '}
                              {new Date(invoice.due_at).toLocaleDateString()}
                            </Text>
                          </HStack>
                        </HStack>
                      </Box>
                    </HStack>

                    {/* Enhanced Status Badge */}
                    {/* <Badge
                      colorScheme={statusConfig.color}
                      variant='subtle'
                      px={3}
                      py={1}
                      rounded='full'
                      fontSize='sm'
                      fontWeight='semibold'
                    >
                      <HStack gap={1}>
                        <Icon as={statusConfig.icon} boxSize={3} />
                        <Text>{statusConfig.label}</Text>
                      </HStack>
                    </Badge> */}
                  </VStack>
                </GridItem>

                {/* {invoice.business_info && (
                  <GridItem>
                    <Card.Root bg='white' shadow='sm' borderColor='gray.200'>
                      <Card.Body p={4}>
                        <VStack align='center' gap={3}>
                          <Avatar.Root size='lg'>
                            <Avatar.Image src={invoice.business_info.logo} />
                            <Avatar.Fallback
                              name={invoice.business_info.name}
                            />
                          </Avatar.Root>
                          <VStack gap={1} textAlign='center'>
                            <Text fontWeight='bold' fontSize='lg'>
                              {invoice.business_info.name}
                            </Text>
                            <Text fontSize='sm' color='gray.600'>
                              {invoice.business_info.address}
                            </Text>
                            {invoice.business_info.phone && (
                              <Text fontSize='sm' color='gray.600'>
                                {invoice.business_info.phone}
                              </Text>
                            )}
                          </VStack>
                        </VStack>
                      </Card.Body>
                    </Card.Root>
                  </GridItem>
                )} */}
              </Grid>
            </Card.Header>
          </Card.Root>

          {/* Bill To - Enhanced */}
          <Card.Root bg='white' shadow='md' borderColor='gray.200'>
            <Card.Header pb={4}>
              <HStack gap={2}>
                <Icon as={Building2} boxSize={5} color='blue.500' />
                <Heading size='md' color='gray.900'>
                  Bill To
                </Heading>
              </HStack>
            </Card.Header>
            <Card.Body pt={0}>
              <VStack align='start' gap={2}>
                <Text fontWeight='bold' fontSize='lg' color='gray.900'>
                  {invoice.user.name}
                </Text>
                <Text color='gray.600' fontSize='sm'>
                  {invoice.user.email}
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Invoice Items Table - Enhanced */}
          <Card.Root bg='white' shadow='md' borderColor='gray.200'>
            <Card.Header pb={4}>
              <HStack gap={2}>
                <Icon as={Package} boxSize={5} color='green.500' />
                <Heading size='md' color='gray.900'>
                  Invoice Items
                </Heading>
              </HStack>
            </Card.Header>
            <Card.Body p={0}>
              <Table.Root>
                <Table.Header bg='white'>
                  <Table.Row bg='white'>
                    <Table.ColumnHeader
                      fontWeight='bold'
                      color={'black'}
                      py={4}
                    >
                      Item Description
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      textAlign='end'
                      fontWeight='bold'
                      color={'black'}
                      py={4}
                    >
                      Quantity
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      textAlign='end'
                      fontWeight='bold'
                      color={'black'}
                      py={4}
                    >
                      Unit Price
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      textAlign='end'
                      fontWeight='bold'
                      color={'black'}
                      py={4}
                    >
                      Total
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {invoice.invoice_items.map((item: InvoiceItem, index) => (
                    <Table.Row
                      key={item.id}
                      _hover={{ bg: 'gray.50', transition: 'all 0.2s' }}
                      transition='all 0.2s'
                      bg='white'
                    >
                      <Table.Cell py={4}>
                        <Text fontWeight='medium' color='gray.900'>
                          {item.item}
                        </Text>
                      </Table.Cell>
                      <Table.Cell textAlign='end' py={4}>
                        <Badge
                          variant='subtle'
                          colorScheme='blue'
                          fontSize='sm'
                        >
                          {item.quantity}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell textAlign='end' py={4}>
                        <Text fontWeight='semibold' color='gray.700'>
                          {formatMoney(
                            parseFloat(item.amount),
                            invoice.currency
                          )}
                        </Text>
                      </Table.Cell>
                      <Table.Cell textAlign='end' py={4}>
                        <Text fontWeight='bold' color='gray.900'>
                          {formatMoney(
                            parseFloat(item.amount) * item.quantity,
                            invoice.currency
                          )}
                        </Text>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Card.Body>
          </Card.Root>

          {/* Payment Breakdown - Enhanced */}
          <Card.Root bg='white' shadow='md' borderColor='gray.200'>
            <Card.Header pb={4}>
              <HStack gap={2}>
                <Icon as={CreditCard} boxSize={5} color='purple.500' />
                <Heading size='md' color='gray.900'>
                  Payment Summary
                </Heading>
              </HStack>
            </Card.Header>
            <Card.Body pt={0}>
              <VStack gap={4} align='stretch'>
                {/* Subtotal */}
                <Flex justify='space-between' align='center' py={2}>
                  <Text fontSize='md' color='gray.700'>
                    Subtotal
                  </Text>
                  <Text fontSize='md' fontWeight='semibold' color='gray.900'>
                    {formatMoney(subtotal, invoice.currency)}
                  </Text>
                </Flex>

                {/* VAT */}
                {invoice.is_vat_applied && vatAmount > 0 && (
                  <Flex justify='space-between' align='center' py={2}>
                    <Text fontSize='md' color='gray.700'>
                      VAT ({invoice.vat}%)
                    </Text>
                    <Text fontSize='md' fontWeight='semibold' color='gray.900'>
                      {formatMoney(vatAmount, invoice.currency)}
                    </Text>
                  </Flex>
                )}

                {/* Discount */}
                {discountAmount > 0 && (
                  <Flex justify='space-between' align='center' py={2}>
                    <HStack gap={1}>
                      <Text fontSize='md' color='green.600'>
                        Discount
                      </Text>
                      <Circle size='2' bg='green.500' />
                    </HStack>
                    <Text fontSize='md' fontWeight='semibold' color='green.600'>
                      -{formatMoney(discountAmount, invoice.currency)}
                    </Text>
                  </Flex>
                )}

                {/* Divider */}
                <Separator borderColor='gray.300' />

                {/* Total */}
                <Flex
                  justify='space-between'
                  align='center'
                  py={3}
                  px={4}
                  bg='blue.50'
                  rounded='lg'
                >
                  <Text fontSize='lg' fontWeight='bold' color='gray.900'>
                    Total Amount
                  </Text>
                  <Text fontSize='xl' fontWeight='bold' color='blue.600'>
                    {formatMoney(total, invoice.currency)}
                  </Text>
                </Flex>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Bank Details - Enhanced */}
          {invoice.invoice_payment_details &&
            invoice.payment_methods.includes('BANK_TRANSFER' as any) && (
              <Card.Root bg='white' shadow='md' borderColor='gray.200'>
                <Card.Header pb={4}>
                  <HStack gap={2}>
                    <Icon as={Building2} boxSize={5} color='orange.500' />
                    <Heading size='md' color='gray.900'>
                      Bank Transfer Details
                    </Heading>
                  </HStack>
                  <Text fontSize='sm' color='gray.600' mt={1}>
                    Transfer the exact amount to the account below
                  </Text>
                </Card.Header>
                <Card.Body pt={0}>
                  <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                    gap={4}
                  >
                    <VStack align='start' gap={3}>
                      <Box>
                        <Text
                          fontSize='xs'
                          fontWeight='bold'
                          color='gray.500'
                          textTransform='uppercase'
                          letterSpacing='wide'
                        >
                          Bank Name
                        </Text>
                        <Text
                          fontWeight='semibold'
                          color='gray.900'
                          fontSize='md'
                        >
                          {invoice.invoice_payment_details?.bank_name}
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontSize='xs'
                          fontWeight='bold'
                          color='gray.500'
                          textTransform='uppercase'
                          letterSpacing='wide'
                        >
                          Account Name
                        </Text>
                        <Text
                          fontWeight='semibold'
                          color='gray.900'
                          fontSize='md'
                        >
                          {invoice.invoice_payment_details?.account_name}
                        </Text>
                      </Box>
                    </VStack>
                    <VStack align='start' gap={3}>
                      <Box>
                        <Text
                          fontSize='xs'
                          fontWeight='bold'
                          color='gray.500'
                          textTransform='uppercase'
                          letterSpacing='wide'
                        >
                          Account Number
                        </Text>
                        <HStack gap={2}>
                          <Text
                            fontWeight='bold'
                            color='blue.600'
                            fontSize='lg'
                            fontFamily='mono'
                          >
                            {invoice.invoice_payment_details?.account_number}
                          </Text>
                          <Button
                            size='xs'
                            variant='ghost'
                            colorScheme='blue'
                            onClick={() => {
                              navigator.clipboard.writeText(
                                invoice.invoice_payment_details
                                  ?.account_number || ''
                              );
                              toast.success('Account number copied!');
                            }}
                          >
                            Copy
                          </Button>
                        </HStack>
                      </Box>
                    </VStack>
                  </Grid>
                </Card.Body>
              </Card.Root>
            )}

          {/* Payment Button - Enhanced */}
          {invoice.status !== InvoiceStatus.PAID &&
            invoice.payment_methods.includes('PAYSTACK' as any) && (
              <Card.Root bg='white' shadow='md' borderColor='gray.200'>
                <Card.Body>
                  <VStack gap={6}>
                    <VStack gap={3} textAlign='center'>
                      <Circle size='16' bg='blue.50' color='blue.500'>
                        <Icon as={CreditCard} boxSize={8} />
                      </Circle>
                      <Box>
                        <Heading size='md' color='gray.900' mb={1}>
                          Secure Payment
                        </Heading>
                        <Text color='gray.600' fontSize='sm'>
                          Complete your payment securely using Paystack
                        </Text>
                      </Box>
                    </VStack>

                    <VStack gap={4} width='full'>
                      <Flex
                        width='full'
                        justify='space-between'
                        align='center'
                        p={4}
                        bg='gray.50'
                        rounded='lg'
                        border='1px solid'
                        borderColor='gray.200'
                      >
                        <Text fontWeight='semibold' color='gray.700'>
                          Amount to Pay
                        </Text>
                        <Text fontSize='xl' fontWeight='bold' color='blue.600'>
                          {formatMoney(total, invoice.currency)}
                        </Text>
                      </Flex>

                      <Button
                        colorScheme='blue'
                        size='lg'
                        width='full'
                        height='14'
                        fontSize='lg'
                        fontWeight='semibold'
                        onClick={handlePaystackPayment}
                        loading={isPaying}
                        loadingText='Processing Payment...'
                        disabled={[InvoiceStatus.PAID].includes(
                          invoice?.status!
                        )}
                        _hover={{
                          transform: 'translateY(-1px)',
                          shadow: 'lg',
                          transition: 'all 0.2s',
                        }}
                        _active={{
                          transform: 'translateY(0)',
                        }}
                        transition='all 0.2s'
                      >
                        <HStack gap={2}>
                          <Icon as={CreditCard} boxSize={5} />
                          <Text>Pay Now</Text>
                        </HStack>
                      </Button>

                      <Text fontSize='xs' color='gray.500' textAlign='center'>
                        Your payment is secured by Paystack's 256-bit SSL
                        encryption
                      </Text>
                    </VStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            )}

          {/* Additional Notes - Enhanced */}
          {invoice.additional_notes && (
            <Card.Root bg='white' shadow='md' borderColor='gray.200'>
              <Card.Header pb={4}>
                <HStack gap={2}>
                  <Icon as={FileText} boxSize={5} color='gray.500' />
                  <Heading size='md' color='gray.900'>
                    Additional Notes
                  </Heading>
                </HStack>
              </Card.Header>
              <Card.Body pt={0}>
                <Box
                  p={4}
                  bg='gray.50'
                  rounded='lg'
                  border='1px solid'
                  borderColor='gray.200'
                >
                  <Text
                    whiteSpace='pre-wrap'
                    color='gray.700'
                    lineHeight='1.6'
                    fontSize='sm'
                  >
                    {invoice.additional_notes}
                  </Text>
                </Box>
              </Card.Body>
            </Card.Root>
          )}
        </VStack>
      </Container>

      <SuccessAlertModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title='Payment Successful 🎉'
        description='Your order has been placed successfully! Check your email for details.'
      />
    </Box>
  );
};

export default InvoiceView;
