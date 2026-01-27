'use client';

import {
  Box,
  Image,
  Text,
  Heading,
  Stack,
  Input,
  Select,
  Button,
  Flex,
  Field,
  NativeSelect,
  Badge,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SelectBoxForm } from '../../SelectBoxForm';
import { PhoneNumberInput } from '../PhoneNumberInput';
import { Label } from '@/components/ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useBusinessSlug } from '@/hooks/useBusinessSlug';
import useBusinessProductDetails from '@/hooks/page/useBusinessProductDetails';
import { ProductLoadingSkeleton } from '@/components/product/ProductLoadingSkeleton';
import { PackageX } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerCustomer } from '@/redux/slices/onboardSlice';
import {
  CreatePayment,
  PaystackPaymentResponse,
  Purchase,
} from '@/types/payment';
import {
  Currency,
  formatMoney,
  getPriceForCurrency,
  PaymentMethod,
} from '@/lib/utils';
import { createPayment, verifyPayment } from '@/redux/slices/paymentSlice';

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { NoProduct } from '@/components/product/NoProduct';
import { SuccessAlertModal } from '@/components/SuccessAlertModal';

const COURSE_PRICES: Record<string, number> = {
  NGN: 50000,
  GHS: 450,
  EGP: 3200,
  XOF: 60000,
  UGX: 180000,
  ZAR: 1200,
  TZS: 750000,
};

type Country = {
  code: 'NGN' | 'GHS' | 'EGP' | 'XOF' | 'UGX' | 'ZAR' | 'TZS';
  name: string;
  currency: string;
  price: number;
};

export const COUNTRIES: Country[] = [
  { code: 'NGN', name: 'Nigeria', currency: 'NGN', price: 50000 },
  { code: 'GHS', name: 'Ghana', currency: 'GHS', price: 450 },
  { code: 'EGP', name: 'Egypt', currency: 'EGP', price: 3200 },
  { code: 'XOF', name: 'West Africa', currency: 'XOF', price: 60000 },
  { code: 'UGX', name: 'Uganda', currency: 'UGX', price: 180000 },
  { code: 'ZAR', name: 'South Africa', currency: 'ZAR', price: 1200 },
  { code: 'TZS', name: 'Tanzania', currency: 'TZS', price: 750000 },
];

export default function ProductPreview() {
  const dispatch = useDispatch<AppDispatch>();

  const { product, loading, error } = useBusinessProductDetails();
  const [currency, setCurrency] = useState<keyof typeof COURSE_PRICES>('NGN');

  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [showCheckout, setShowCheckout] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const businessId = useBusinessSlug(product);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    additionalNote?: string;
    address?: string;
    country?: string;
    state?: string;
    city?: string;
    zipcode?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    // Full Name
    if (!name.trim()) newErrors.name = 'Full Name is required';

    // Email
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    // Phone
    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^\+?\d{10,15}$/.test(phone.trim())) {
      newErrors.phone = 'Enter a valid phone number (10–15 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const allPrices = [
  //   { currency, price: Number(product?.price) }, // NGN
  //   ...product?.other_currencies!,
  // ];

  // Find price for selected currency
  const selectedPrice = getPriceForCurrency(
    currency,
    +product?.price!,
    product?.other_currencies!,
  );

  // --- Triggered when user clicks Checkout ---
  const handleCheckout = async () => {
    if (!validate()) {
      toast.error('All required fields must be filled');
      return;
    }

    setIsPaying(true);

    try {
      // Register customer
      await dispatch(
        registerCustomer({
          name,
          email,
          phone,
          business_id: businessId! || (product?.business_info?.id as string),
          items: [],
        }),
      ).unwrap();

      // Prepare purchases
      const purchases: Purchase[] | any = [
        {
          purchase_id: product?.id,
          quantity: 1,
          purchase_type: product?.type,
          cohort_no: product?.cohort.cohort_number,
        },
      ];

      const payload: CreatePayment = {
        email,
        purchases,
        amount: +product?.price!,
        currency: currency as Currency,
        business_id: businessId! || (product?.business_info?.id as string),
        payment_method: PaymentMethod.FLUTTERWAVE,
        cohort_no: product?.cohort.cohort_number,
      };

      // Create payment
      const createRes = await dispatch(createPayment(payload)).unwrap();

      const reference = createRes.data?.payment_id;
      if (!reference) throw new Error('Payment creation failed.');

      const config = {
        public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!, // Replace with your actual public key
        tx_ref: reference,
        amount: payload.amount, // Amount in cents or equivalent
        currency, // Or your desired currency
        customer: {
          email,
          phone_number: phone,
          name,
        },
      };

      // @ts-ignore
      const handleFlutterwavePayment = useFlutterwave(config);

      handleFlutterwavePayment({
        callback: async (response) => {
          try {
            console.log(response);

            // Verify payment using Redux
            await dispatch(
              verifyPayment(String(response.transaction_id)),
            ).unwrap();

            // Empty cart after successful payment
            // dispatch(emptyCart());

            // Clear coupon data
            // dispatch(clearCouponData());

            closePaymentModal(); // this will close the modal programmatically

            // Open the modal instead of just toast
            setIsSuccessModalOpen(true);

            // Redirect to orders page
            // safeRouterPush(router, '/dashboard/orders');
          } catch (error: any) {
            toast.error(error.message || 'Payment verification failed');
          } finally {
            setIsPaying(false);
          }
        },
        onClose: () => {
          // handle when modal is closed
          setIsPaying(false);
          toast('Payment window closed');
        },
      });
    } catch (error: any) {
      toast.error(error.message || 'Payment failed.');
      setIsPaying(false);
    }
  };

  if (error) return <NoProduct />;
  if (loading || !product) return <ProductLoadingSkeleton />;

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      px={4}
      py={20}
      bgGradient='linear(to-br, #FE4A55, #ff7a83)'
    >
      <Box>
        <Box display='flex' justifyContent='center'>
          <Image src='/images/header-logo.png' alt='Logo' h='30px' mb={4} />
        </Box>
        <Box
          w='full'
          maxW={{ base: '100%', md: '100%', lg: '80%', xl: '75%' }}
          m='auto'
          bg='white'
          p={6}
          rounded='xl'
          shadow='xl'
          display='flex'
          flexDirection={{ base: 'column', md: 'row' }}
          gap={8}
        >
          {/* <Box w='full' maxW='420px' bg='white' p={6} rounded='xl' shadow='xl'> */}
          {/* Logo */}

          <Stack
            gap={8}
            direction={{ base: 'column', md: 'row' }}
            align='flex-start'
          >
            {/* LEFT: Product Info */}
            <Box flex='1'>
              <Image
                src={product?.multimedia.url}
                alt={product?.title}
                rounded='md'
                mb={4}
              />

              <Heading size='md' mb={1}>
                {product?.title}
              </Heading>

              <Badge mb={1}>{product?.cohort.cohort_number}</Badge>

              <Text fontSize='sm' color='gray.600'>
                {product?.description}
              </Text>
            </Box>

            {/* RIGHT: Form */}
            <Box flex='1'>
              <Stack gap={4}>
                <Field.Root invalid={!!errors.name} required>
                  <Label>
                    Full Name{' '}
                    <Text as='span' color='red'>
                      *
                    </Text>
                  </Label>
                  <Input
                    placeholder='John Doe'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Field.ErrorText>{errors.name}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.email} required>
                  <Label>
                    Email{' '}
                    <Text as='span' color='red'>
                      *
                    </Text>
                  </Label>
                  <Input
                    type='email'
                    placeholder='john@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Field.ErrorText>{errors.email}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.phone}>
                  <PhoneNumberInput
                    value={phone}
                    onChange={setPhone}
                    required={true}
                  />
                  <Field.ErrorText>{errors.phone}</Field.ErrorText>
                </Field.Root>

                <Field.Root required>
                  <Label>
                    Country{' '}
                    <Text as='span' color='red'>
                      *
                    </Text>
                  </Label>

                  <Box
                    as='select'
                    value={currency}
                    onChange={(e: any) =>
                      setCurrency(e.target.value as keyof typeof COURSE_PRICES)
                    }
                    w='full'
                    px={3}
                    py={2}
                    borderWidth='1px'
                    borderRadius='md'
                    bg='white'
                    _focus={{
                      outline: 'none',
                      borderColor: '#FE4A55',
                      boxShadow: '0 0 0 1px #FE4A55',
                    }}
                  >
                    <option value='NGN'>Nigeria (NGN)</option>
                    <option value='GHS'>Ghana (GHS)</option>
                    <option value='EGP'>Egypt (EGP)</option>
                    <option value='XOF'>West Africa (XOF)</option>
                    <option value='UGX'>Uganda (UGX)</option>
                    <option value='ZAR'>South Africa (ZAR)</option>
                    <option value='TZS'>Tanzania (TZS)</option>
                  </Box>
                </Field.Root>

                {/* Price */}
                <Box bg='gray.50' p={3} rounded='md'>
                  <Text fontSize='sm' color='gray.600'>
                    Price
                  </Text>
                  <Text fontSize='xl' fontWeight='bold'>
                    {formatMoney(selectedPrice, currency)}
                  </Text>
                </Box>

                {/* CTA */}
                <Button
                  bg='#FE4A55'
                  color='white'
                  size='lg'
                  _hover={{ opacity: 0.9 }}
                  onClick={handleCheckout}
                  disabled={isPaying || loading}
                >
                  Checkout
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>

      <SuccessAlertModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title='Payment Successful 🎉'
        description='Your course payment was successful! Check your email for more details.'
      />
    </Flex>
  );
}
