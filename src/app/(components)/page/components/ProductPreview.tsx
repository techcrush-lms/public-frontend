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
// import { NoProduct } from '@/components/product/NoProduct';
import { NoProduct } from '@/components/product/NoProduct';
import { useEffect, useMemo } from 'react';

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

export const currencies = [
  { label: 'Nigeria (NGN)', value: 'NGN' },
  { label: 'Ghana (GHS)', value: 'GHS' },
  { label: 'Egypt (EGP)', value: 'EGP' },
  { label: 'West Africa (XOF)', value: 'XOF' },
  { label: 'Uganda (UGX)', value: 'UGX' },
  { label: 'South Africa (ZAR)', value: 'ZAR' },
  { label: 'Tanzania (TZS)', value: 'TZS' },
];

export default function ProductPreview() {
  const dispatch = useDispatch<AppDispatch>();

  const { product, loading, error } = useBusinessProductDetails();
  // const { store_currencies } = useSelector((state: RootState) => state.currency);
  const [currency, setCurrency] = useState<string>('NGN');

  // const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [showCheckout, setShowCheckout] = useState(false); // keep unused state if needed

  const businessId = useBusinessSlug(product);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<{ code: string; name: string; dialCode: string }>({
    code: 'NG',
    name: 'Nigeria',
    dialCode: '+234'
  });
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

  // Create a unified list of available currencies from the product
  const availableCurrencies = useMemo(() => {
    if (!product) return [];

    const baseKey = product.currency || 'NGN';
    const basePrice = Number(product.price);

    // Start with the base currency
    const list = [
      {
        label: `${baseKey} - ${formatMoney(basePrice, baseKey)}`,
        value: baseKey,
        price: basePrice,
        originalPrice: Number(product.original_price) || 0,
      },
    ];

    // Add other currencies if valid
    if (product.other_currencies && Array.isArray(product.other_currencies)) {
      product.other_currencies.forEach((curr) => {
        // Ensure we don't duplicate the base currency if it happens to be in other_currencies
        if (curr.currency !== baseKey) {
          list.push({
            label: `${curr.currency} - ${formatMoney(curr.price, curr.currency)}`,
            value: curr.currency,
            price: curr.price,
            originalPrice: Number(curr.original_price) || 0,
          });
        }
      });
    }

    return list;
  }, [product]);

  // Find price for selected currency
  const selectedPrice = useMemo(() => {
    const found = availableCurrencies.find((c) => c.value === currency);
    return found ? found.price : Number(product?.price) || 0;
  }, [availableCurrencies, currency, product]);

  const selectedOriginalPrice = useMemo(() => {
    const found = availableCurrencies.find((c) => c.value === currency);
    return found ? found.originalPrice : Number(product?.original_price) || 0;
  }, [availableCurrencies, currency, product]);

  // Ensure currency state is valid when product loads
  useEffect(() => {
    if (product && availableCurrencies.length > 0) {
      // If the currently selected currency is NOT in the available list,
      // default to the product's base currency or the first available one.
      const exists = availableCurrencies.find(c => c.value === currency);
      if (!exists) {
        setCurrency(product.currency || availableCurrencies[0].value);
      }
    }
  }, [product, availableCurrencies, currency]);

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
          country: country.name,
          country_code: country.code,
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
        amount: +selectedPrice!,
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

            // Verify payment using Redux
            await dispatch(
              verifyPayment(String(response.transaction_id)),
            ).unwrap();

            // Empty cart after successful payment
            // dispatch(emptyCart());

            // Clear coupon data
            // dispatch(clearCouponData());

            closePaymentModal(); // this will close the modal programmatically

            // Redirect to success page
            window.location.href = '/payment/success';
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
            align={{ base: 'center', md: 'flex-start' }}
          >
            {/* LEFT: Product Info */}
            <Box flex='1'>
              <Heading size='md' mb={1}>
                Tech For Africans {product?.title}
              </Heading>

              <Badge mb={1}>{product?.cohort.cohort_number}</Badge>

              <Text fontSize='sm' color='gray.600'>
                {product?.description}
              </Text>

              <Image
                src={product?.cohort?.multimedia?.url!}
                alt={product?.title}
                rounded='md'
                mb={4}
                mt={4}
                width='100%'
                height='200px'
                objectFit='cover'
              />

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
                    onCountryChange={setCountry}
                    required={true}
                  />
                  <Field.ErrorText>{errors.phone}</Field.ErrorText>
                </Field.Root>

                <Box>
                  <Label>
                    Currency{' '}
                    <Text as='span' color='red'>
                      *
                    </Text>
                  </Label>

                  <Field.Root>
                    <NativeSelect.Root
                      width='full'
                      onChange={(val: any) => {
                        setCurrency(val.target.value);
                      }}
                    >
                      <NativeSelect.Field placeholder={`Select Currency`}>
                        {availableCurrencies.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                </Box>

                {/* Price */}
                <Box bg='gray.50' p={3} rounded='md'>
                  <Text fontSize='sm' color='gray.600'>
                    Price
                  </Text>
                  <Flex align='baseline' gap={2}>
                    <Text fontSize='xl' fontWeight='bold'>
                      {formatMoney(selectedPrice, currency)}
                    </Text>
                    {selectedOriginalPrice > 0 && (
                      <Text
                        fontSize='sm'
                        color='gray.400'
                        textDecoration='line-through'
                      >
                        {formatMoney(selectedOriginalPrice, currency)}
                      </Text>
                    )}
                  </Flex>
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
                  Claim your scholarship
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>

    </Flex>
  );
}
