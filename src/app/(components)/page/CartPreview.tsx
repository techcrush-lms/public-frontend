'use client';

import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Flex,
  Portal,
  Input,
  Stack,
  Field,
  useDisclosure,
  Collapsible,
  NativeSelect,
  Textarea,
  Dialog,
  CloseButton,
  // Select,
} from '@chakra-ui/react';
import { Drawer } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { ChevronLeft } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { createPayment, verifyPayment } from '@/redux/slices/paymentSlice';
import {
  cityOptions,
  countriesData,
  Currency,
  hostslug,
  PaymentMethod,
  PRIMARY_COLOR,
  ProductType,
  stateOptions,
  SUCCESS_RESPONSE,
} from '@/lib/utils';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { formatMoney } from '@/lib/utils';
import { CartItem, MeasurementMetadata } from '@/types/cart';
import CartItemDetails from './components/CartItemDetails';
import { PhoneNumberInput } from './PhoneNumberInput';
import { useRouter } from 'next/navigation';
import { LightDivider } from './LightDivider';
import type {
  CreatePayment,
  PaystackPaymentResponse,
  Purchase,
} from '@/types/payment';
import type { CouponData } from '@/types/coupon';
import toast from 'react-hot-toast';
import { emptyCart, openCart } from '@/redux/slices/cartSlice';
import { applyCoupon, clearCouponData } from '@/redux/slices/couponSlice';
import { registerCustomer } from '@/redux/slices/onboardSlice';
import { AddItemsProps } from '@/lib/schema/onboard.schema';
import { capitalize } from 'lodash';
import { SuccessAlertModal } from '@/components/SuccessAlertModal';
import { LuChevronDown, LuChevronRight } from 'react-icons/lu';
import { useBusinessSlug } from '@/hooks/useBusinessSlug';

export const CartPreview = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { coupon_info } = useSelector((state: RootState) => state.coupon);
  const { isCartDrawerOpen } = useSelector((state: RootState) => state.cart);
  const { currency } = useSelector((state: RootState) => state.currency);
  const { product } = useSelector((state: RootState) => state.org);

  // FINAL business slug resolution
  const businessId = useBusinessSlug(product);

  const {
    cart,
    loading,
    refreshCart,
    count,
    totals,
    items,
    shipping,
    selectedShipping,
    handleSelectedShipping,
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [additionalNote, setAdditionalNote] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('AF');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [coupon, setCoupon] = useState('');
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponInfo, setCouponInfo] = useState<CouponData | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paystackRef, setPaystackRef] = useState<string | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
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

  const prevCountRef = useRef(count);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const { open, onToggle } = useDisclosure();

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

    const isPhysicalProductFound = items.find(
      (item) => item.product_type === ProductType.PHYSICAL_PRODUCT,
    );
    if (isPhysicalProductFound) {
      if (!country.trim()) newErrors.country = 'Country is required';
      if (!state.trim()) newErrors.state = 'State is required';
      if (!city.trim()) newErrors.city = 'City is required';
      if (!address.trim()) newErrors.address = 'Address is required';
      // if (!selectedShipping) newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Paystack Handlers ---
  const onSuccess = async (response: PaystackPaymentResponse) => {
    try {
      // Empty cart & clear coupon
      dispatch(emptyCart());
      dispatch(clearCouponData());

      // Remove stored payment session
      localStorage.removeItem('payment_data');

      // Show success modal
      setIsSuccessModalOpen(true);
    } catch (error: any) {
      toast.error(error.message || 'Payment verification failed');
    } finally {
      setIsPaying(false);
    }
  };

  const onClose = () => {
    // Remove session so popup does NOT reopen after cancellation
    localStorage.removeItem('payment_data');

    console.log('Payment closed');
    setIsPaying(false);
  };

  // --- Triggered when user clicks Checkout ---
  const handleCheckout = async () => {
    if (!validate()) {
      toast.error('All required fields must be filled');
      return;
    }

    if (!items.length) {
      toast.error('Your cart is empty.');
      return;
    }

    setIsPaying(true);

    try {
      // Build cart items for backend
      const cartItems: AddItemsProps[] = items.map((item: CartItem) => ({
        product_id:
          item.product_type === ProductType.TICKET
            ? item.ticket_tier_id!
            : item.product_type === ProductType.SUBSCRIPTION
              ? item.subscription_tier_id!
              : item.product_id,
        quantity: item.quantity,
        product_type: item.product_type,
        metadata: item.metadata,
      }));

      // Register customer
      await dispatch(
        registerCustomer({
          name,
          email,
          phone,
          business_id: businessId as string,
          items: cartItems,
          additional_note: additionalNote,
        }),
      ).unwrap();

      // Prepare purchases
      const purchases: Purchase[] | any = items.map((item) => ({
        purchase_id:
          item.product_type === ProductType.TICKET
            ? item.ticket_tier_id!
            : item.product_type === ProductType.SUBSCRIPTION
              ? item.subscription_tier_id!
              : item.product_id,
        quantity: item.quantity,
        purchase_type: item.product_type as ProductType,
        metadata: item.metadata as MeasurementMetadata[],
      }));

      const currency = items[0]?.currency || 'NGN';

      let amountToPay = coupon_info?.discountedAmount
        ? coupon_info?.discountedAmount
        : totals.subtotal;

      if (selectedShipping) amountToPay += +selectedShipping.price;

      const payload: CreatePayment = {
        email,
        purchases,
        amount: totals.grandTotal,
        currency: currency as Currency,
        business_id: businessId! as string,
        ...(coupon && { coupon_code: coupon }),
        payment_method: PaymentMethod.PAYSTACK,
        ...(selectedShipping && { shipping_id: selectedShipping.id }),
        additional_note: additionalNote,
        ...(items.some(
          (i) => i.product_type === ProductType.PHYSICAL_PRODUCT,
        ) && {
          metadata: {
            delivery_details: { address, country, state, city },
          },
        }),
      };

      // Create payment
      const createRes = await dispatch(createPayment(payload)).unwrap();

      const reference = createRes.data?.payment_id;
      if (!reference) throw new Error('Payment creation failed.');

      // Prepare Paystack config
      const config = {
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        reference,
        amount: amountToPay * 100,
        email,
        currency,
      };

      // Store session ONLY for pending payment
      localStorage.setItem('payment_data', JSON.stringify(config));
      dispatch(openCart(false));

      // Load Paystack
      const { usePaystackPayment } = await import('react-paystack');
      const initializePayment = usePaystackPayment(config);

      initializePayment({
        onSuccess,
        onClose,
      });
    } catch (error: any) {
      toast.error(error.message || 'Payment failed.');
      setIsPaying(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!validate()) {
      toast.error('All asterisked(*) fields are required');
      return;
    }

    if (!coupon) {
      toast.error('Enter a coupon code');
      return;
    }
    setIsApplyingCoupon(true);
    try {
      // Register customer
      await dispatch(
        registerCustomer({
          name,
          email,
          phone,
          business_id: businessId as string,
        }),
      ).unwrap();

      const res = await dispatch(
        applyCoupon({ email, code: coupon, amount: String(totals.grandTotal) }),
      ).unwrap();

      toast.success('Coupon applied');
    } catch (err: any) {
      console.log(err);

      toast.error(err || err.message || 'Failed to apply coupon');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const isCartEmpty = !items?.length;

  const isPhysicalProductAvailable = Boolean(
    items.filter((item) => item.type === ProductType.PHYSICAL_PRODUCT).length,
  );

  // --- Re-open popup automatically only if payment is pending ---
  useEffect(() => {
    const resumePayment = async () => {
      if (typeof window === 'undefined') return;

      const saved = localStorage.getItem('payment_data');
      if (!saved) return; // No pending payment → do nothing

      const payload = JSON.parse(saved);

      dispatch(openCart(false));

      const { usePaystackPayment } = await import('react-paystack');
      const initializePayment = usePaystackPayment(payload);

      initializePayment({
        onSuccess: async (response: any) => {
          await onSuccess(response);
          localStorage.removeItem('payment_data');
        },
        onClose, // Cancels and prevents auto-open next time
      });
    };

    resumePayment();
  }, []);

  return (
    <HStack wrap='wrap'>
      <Drawer.Root
        size='sm'
        open={isCartDrawerOpen}
        onOpenChange={(e) => dispatch(openCart(e.open))}
        onEscapeKeyDown={(e) => dispatch(openCart(false))}
        onInteractOutside={(e) => dispatch(openCart(false))}
      >
        <Drawer.Trigger asChild>
          <Box position='relative'>
            <Button
              variant='plain'
              size='md'
              className='text-[#080930]'
              aria-label='Cart'
            >
              <FiShoppingCart className='w-5 h-5 text-[#080930]' />
            </Button>
            {totals.itemCount > 0 && (
              <Box
                position='absolute'
                top='-1'
                right='-1'
                background='#4045E1'
                color='white'
                fontSize='xs'
                fontWeight='bold'
                borderRadius='full'
                px='1.5'
                lineHeight='1.5'
                minW='20px'
                textAlign='center'
              >
                {totals.itemCount > 99 ? '99+' : totals.itemCount}
              </Box>
            )}
          </Box>
        </Drawer.Trigger>

        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content bg='white'>
              <Drawer.Header>
                <Drawer.Title display='flex' gap={2}>
                  {showCheckout ? (
                    <>
                      <button
                        onClick={() => setShowCheckout(false)}
                        className='flex gap-2 m-0 p-0 hover:cursor-pointer'
                      >
                        <ChevronLeft />
                      </button>
                      <Text>Checkout</Text>
                    </>
                  ) : (
                    'Your Shopping Cart'
                  )}
                </Drawer.Title>
                <Drawer.CloseTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    aria-label='Close'
                    color={'black'}
                    _hover={{
                      rounded: 'full',
                      bg: 'transparent',
                    }}
                    onClick={() => dispatch(openCart(false))}
                  >
                    ✕
                  </Button>
                </Drawer.CloseTrigger>
              </Drawer.Header>

              <Drawer.Body padding={0}>
                <Stack padding={6}>
                  {loading ? (
                    <Text textAlign='center' color='gray.500'>
                      Loading cart...
                    </Text>
                  ) : isCartEmpty ? (
                    <VStack gap={4} py={8} textAlign='center' m='auto'>
                      <FiShoppingCart size={48} color='#CBD5E0' />
                      <Text fontSize='lg' color='gray.500'>
                        Your cart is empty
                      </Text>
                      <Text fontSize='sm' color='gray.400'>
                        Add items to get started
                      </Text>
                    </VStack>
                  ) : showCheckout ? (
                    <VStack gap={3} align='stretch'>
                      <Field.Root invalid={!!errors.name}>
                        <Field.Label>
                          Full name <Text color={'red'}>*</Text>
                        </Field.Label>
                        <Input
                          placeholder='Full name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <Field.ErrorText>{errors.name}</Field.ErrorText>
                      </Field.Root>
                      <Field.Root invalid={!!errors.email}>
                        <Field.Label>
                          Email address <Text color={'red'}>*</Text>
                        </Field.Label>
                        <Input
                          type='email'
                          placeholder='Email address'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Field.ErrorText>{errors.email}</Field.ErrorText>
                      </Field.Root>
                      <Field.Root invalid={!!errors.phone}>
                        {/* <Text fontWeight='medium'>Phone number</Text> */}
                        {/* <Input placeholder='Phone number' /> */}
                        <PhoneNumberInput
                          value={phone}
                          onChange={setPhone}
                          required={true}
                        />
                        <Field.ErrorText>{errors.phone}</Field.ErrorText>
                      </Field.Root>

                      {Boolean(isPhysicalProductAvailable) && (
                        <Field.Root>
                          <Field.Label>Additional note (Optional)</Field.Label>
                          <Textarea
                            placeholder='Add an additional note for your order'
                            value={additionalNote}
                            onChange={(e) => setAdditionalNote(e.target.value)}
                          />
                        </Field.Root>
                      )}

                      {/* ======================= DELIVERY DETAILS (COLLAPSIBLE) ======================= */}
                      {Boolean(isPhysicalProductAvailable) && (
                        <Box pt={4} width='100%' border={1}>
                          <Collapsible.Root width='100%' defaultOpen={false}>
                            {/* SINGLE Trigger */}
                            <Collapsible.Trigger width='100%'>
                              <Box
                                width='100%'
                                display='flex'
                                justifyContent='space-between'
                                alignItems='center'
                                fontWeight='semibold'
                                fontSize='md'
                                border='1px solid lightgray'
                                padding={2}
                                rounded={4}
                              >
                                {/* Left side content with label and red asterisk */}
                                <Flex>
                                  <Text>Delivery Details</Text>
                                  <Text color='red'>*</Text>
                                </Flex>

                                {/* Right side content with Chevron icon and 'Click to open' text */}
                                <Flex direction='row' alignItems='flex-end'>
                                  <Text
                                    fontSize='sm'
                                    color='gray.500'
                                    textAlign='center'
                                  >
                                    Click to open
                                  </Text>
                                  <Collapsible.Trigger
                                    transition='transform 0.2s'
                                    _open={{ transform: 'rotate(180deg)' }}
                                  >
                                    <LuChevronDown />
                                  </Collapsible.Trigger>
                                </Flex>
                              </Box>
                            </Collapsible.Trigger>

                            {/* Collapsible Content */}
                            <Collapsible.Content>
                              <VStack
                                align='stretch'
                                gap={4}
                                mt={2}
                                p={4}
                                borderWidth='1px'
                                borderColor='gray.200'
                                borderRadius='lg'
                                bg='gray.50'
                              >
                                {[
                                  {
                                    label: 'Country',
                                    required: true,
                                    value: country,
                                    setter: setCountry,
                                    type: 'select',
                                    options: countriesData,
                                  },
                                  {
                                    label: 'State',
                                    required: true,
                                    value: state,
                                    setter: setState,
                                    type: 'select',
                                    options: stateOptions(country), // THIS NOW WORKS
                                  },
                                  {
                                    label: 'City',
                                    required: true,
                                    value: city,
                                    setter: setCity,
                                    placeholder: 'City',
                                    type: 'select',
                                    options: cityOptions(country, state), // THIS NOW WORKS
                                  },
                                  {
                                    label: 'Address',
                                    required: true,
                                    value: address,
                                    setter: setAddress,
                                    placeholder: 'Delivery address',
                                    type: 'text',
                                  },
                                ].map((field) => (
                                  <Field.Root key={field.label}>
                                    <Field.Label>
                                      {field.label}
                                      {field.required && (
                                        <Text as='span' color='red'>
                                          {' '}
                                          *
                                        </Text>
                                      )}
                                    </Field.Label>

                                    {field.type === 'select' ? (
                                      <Field.Root>
                                        <NativeSelect.Root
                                          size='sm'
                                          width='full'
                                          onChange={(val) => {
                                            // @ts-ignore
                                            field.setter(val.target.value);

                                            // Reset state and city if country changes
                                            if (field.label === 'Country') {
                                              setState(''); // reset state
                                              setCity(''); // reset city
                                            }

                                            // Reset city if state changes
                                            if (field.label === 'State') {
                                              setCity('');
                                            }
                                          }}
                                        >
                                          <NativeSelect.Field
                                            placeholder={`Select ${field.label}`}
                                          >
                                            {field.options?.map((option) => (
                                              <option
                                                key={option.value}
                                                value={option.value}
                                              >
                                                {option.label}
                                              </option>
                                            ))}
                                          </NativeSelect.Field>
                                          <NativeSelect.Indicator />
                                        </NativeSelect.Root>
                                      </Field.Root>
                                    ) : (
                                      <Input
                                        placeholder={field.placeholder}
                                        value={field.value}
                                        onChange={(e) =>
                                          field.setter(e.target.value)
                                        }
                                      />
                                    )}
                                  </Field.Root>
                                ))}
                              </VStack>
                            </Collapsible.Content>
                          </Collapsible.Root>
                        </Box>
                      )}

                      {Boolean(isPhysicalProductAvailable) && (
                        <Box pt={4} width='100%' border={1}>
                          <Collapsible.Root width='100%' defaultOpen={false}>
                            {/* SINGLE Trigger */}
                            <Collapsible.Trigger width='100%'>
                              <Box
                                width='100%'
                                display='flex'
                                justifyContent='space-between'
                                alignItems='center'
                                fontWeight='semibold'
                                fontSize='md'
                                border='1px solid lightgray'
                                padding={2}
                                rounded={4}
                              >
                                <Flex>
                                  <Text>Shipping Method </Text>
                                  <Text color={'red'}>*</Text>
                                </Flex>

                                {/* Chevron icon inside the same trigger */}

                                {/* Right side content with Chevron icon and 'Click to open' text */}
                                <Flex direction='row' alignItems='flex-end'>
                                  <Text
                                    fontSize='sm'
                                    color='gray.500'
                                    textAlign='center'
                                  >
                                    Click to open
                                  </Text>
                                  <Collapsible.Trigger
                                    transition='transform 0.2s'
                                    _open={{ transform: 'rotate(180deg)' }}
                                  >
                                    <LuChevronDown />
                                  </Collapsible.Trigger>
                                </Flex>
                              </Box>
                            </Collapsible.Trigger>
                            {/* Collapsible Content */}
                            <Collapsible.Content>
                              <VStack
                                align='stretch'
                                gap={4}
                                mt={2}
                                p={4}
                                borderWidth='1px'
                                borderColor='gray.200'
                                borderRadius='lg'
                                bg='gray.50'
                                marginX={'auto'}
                              >
                                <Text>
                                  Click the button below to choose a shipping
                                  method
                                </Text>
                                <Dialog.Root
                                  placement={'center'}
                                  motionPreset='slide-in-bottom'
                                >
                                  <Dialog.Trigger asChild>
                                    {/* <Button variant="outline">Open Dialog </Button> */}
                                    <Button
                                      variant='outline'
                                      color={'black'}
                                      _hover={{ color: 'white' }}
                                    >
                                      Select a shipping method
                                    </Button>
                                  </Dialog.Trigger>
                                  <Portal>
                                    <Dialog.Backdrop />
                                    <Dialog.Positioner>
                                      <Dialog.Content background={'white'}>
                                        <Dialog.Header>
                                          <Dialog.Title>
                                            Select Shipping
                                          </Dialog.Title>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                          <VStack align='stretch' gap={3}>
                                            {shipping.map((opt) => (
                                              <Flex
                                                key={opt.id}
                                                p={4}
                                                borderWidth='1px'
                                                rounded='lg'
                                                justify='space-between'
                                                align='center'
                                                cursor='pointer'
                                                bg={
                                                  selectedShipping?.id ===
                                                  opt.id
                                                    ? 'blue.50'
                                                    : 'white'
                                                }
                                                borderColor={
                                                  selectedShipping?.id ===
                                                  opt.id
                                                    ? 'blue.500'
                                                    : 'gray.200'
                                                }
                                                onClick={() =>
                                                  handleSelectedShipping(opt.id)
                                                }
                                              >
                                                <Box>
                                                  <Text fontWeight='semibold'>
                                                    {opt.title}
                                                  </Text>
                                                  <Text
                                                    fontSize='sm'
                                                    color='gray.600'
                                                  >
                                                    {opt.address}
                                                  </Text>
                                                </Box>

                                                <Text fontWeight='semibold'>
                                                  {+opt.price === 0
                                                    ? 'Free'
                                                    : formatMoney(
                                                        +opt.price,
                                                        opt.currency,
                                                      )}
                                                </Text>
                                              </Flex>
                                            ))}
                                          </VStack>
                                        </Dialog.Body>
                                        {/* <Dialog.Footer>
                                          <Dialog.ActionTrigger asChild>
                                            <Button
                                              variant='outline'
                                              color='black'
                                              _hover={{ color: 'white' }}
                                            >
                                              Cancel
                                            </Button>
                                          </Dialog.ActionTrigger>
                                          <Button
                                            bg={PRIMARY_COLOR}
                                            color='white'
                                          >
                                            Save
                                          </Button>
                                        </Dialog.Footer> */}
                                        <Dialog.CloseTrigger asChild>
                                          <CloseButton
                                            size='sm'
                                            color={'#000000'}
                                            _hover={{ color: '#ffffff' }}
                                          />
                                        </Dialog.CloseTrigger>
                                      </Dialog.Content>
                                    </Dialog.Positioner>
                                  </Portal>
                                </Dialog.Root>
                                {selectedShipping && (
                                  <Flex
                                    p={4}
                                    borderWidth='1px'
                                    rounded='lg'
                                    justify='space-between'
                                    align='center'
                                    cursor='pointer'
                                    bg={'blue.50'}
                                    borderColor={'blue.500'}
                                  >
                                    <Box>
                                      <Text fontWeight='semibold'>
                                        {selectedShipping?.title}
                                      </Text>
                                      <Text fontSize='sm' color='gray.600'>
                                        {selectedShipping?.address}
                                      </Text>
                                    </Box>

                                    {selectedShipping && (
                                      <Text fontWeight='semibold'>
                                        {+selectedShipping?.price! === 0
                                          ? 'Free'
                                          : formatMoney(
                                              +selectedShipping?.price!,
                                              selectedShipping?.currency,
                                            )}
                                      </Text>
                                    )}
                                  </Flex>
                                )}
                              </VStack>
                            </Collapsible.Content>
                          </Collapsible.Root>
                        </Box>
                      )}

                      {!showCoupon ? (
                        <HStack gap={2}>
                          <Text fontSize='sm' color='gray.600'>
                            Have a coupon?
                          </Text>
                          <Button
                            variant='plain'
                            p='0'
                            height='auto'
                            color='#4045E1'
                            textDecoration='underline'
                            onClick={() => setShowCoupon(true)}
                          >
                            Apply it
                          </Button>
                        </HStack>
                      ) : (
                        <HStack gap={2} align='center'>
                          <VStack align='stretch' gap={1} w='full'>
                            <Text fontWeight='medium'>Coupon code</Text>
                            <Flex w='full' gap={2}>
                              <Input
                                placeholder='Enter coupon code'
                                value={coupon}
                                w='full'
                                onChange={(e) => setCoupon(e.target.value)}
                              />
                              <Button
                                bg='rgba(64, 69, 225, 1)'
                                color='white'
                                loading={isApplyingCoupon}
                                onClick={handleApplyCoupon}
                              >
                                Apply
                              </Button>
                              <Button
                                variant='outline'
                                color='black'
                                _hover={{ color: 'white' }}
                                onClick={() => {
                                  setShowCoupon(false);
                                  dispatch(clearCouponData());
                                }}
                              >
                                Cancel
                              </Button>
                            </Flex>
                          </VStack>
                        </HStack>
                      )}
                    </VStack>
                  ) : (
                    <VStack gap={4} align='stretch'>
                      {items?.map((item: CartItem) => (
                        <CartItemDetails
                          key={item.id}
                          item={item}
                          compact={true}
                          showQuantityControls={true}
                        />
                      ))}
                    </VStack>
                  )}
                </Stack>

                <Box mt={4} bg='gray.100' p={6}>
                  <VStack gap={2} align='stretch'>
                    <Flex justify='space-between'>
                      <Text color='gray.600'>Items ({totals.itemCount})</Text>
                      <Text fontWeight='medium'>
                        {
                          // coupon_info.discount
                          //   ? `${formatMoney(
                          //       totals.subtotal,
                          //       currency
                          //     )} → ${formatMoney(
                          //       coupon_info?.discountedAmount,
                          //       currency
                          //     )}`
                          //   :
                          formatMoney(totals.subtotal, currency)
                        }
                      </Text>
                    </Flex>

                    {selectedShipping && (
                      <>
                        <LightDivider spacing='2' />
                        <Flex
                          justify='space-between'
                          fontWeight='medium'
                          // fontSize='md'
                        >
                          <Text>Delivery fee:</Text>
                          <Text>
                            {formatMoney(+selectedShipping?.price!, currency)}
                          </Text>
                        </Flex>
                      </>
                    )}

                    {Boolean(coupon_info.discount) && (
                      <>
                        <LightDivider spacing='2' />
                        <Flex
                          justify='space-between'
                          fontWeight='medium'
                          color='green.600'
                          // fontSize='md'
                        >
                          <Text>Discount:</Text>
                          <Text>
                            -&nbsp;
                            {formatMoney(+coupon_info.discount!, currency)}
                          </Text>
                        </Flex>
                      </>
                    )}

                    <LightDivider spacing='2' />
                    <Flex
                      justify='space-between'
                      fontWeight='bold'
                      fontSize='md'
                    >
                      <Text>Total:</Text>
                      <Text>
                        {formatMoney(totals.grandTotal, currency)}
                        {/* {coupon_info.discount
                          ? formatMoney(coupon_info?.discountedAmount, currency)
                          : formatMoney(totals.subtotal, currency)} */}
                      </Text>
                    </Flex>
                  </VStack>
                </Box>
              </Drawer.Body>

              <Drawer.Footer>
                {!isCartEmpty && (
                  <VStack gap={2} w='full'>
                    {showCheckout ? (
                      <HStack gap={2} w='full'>
                        <Button
                          bg='rgba(64, 69, 225, 1)'
                          fontWeight='semibold'
                          color='white'
                          size='lg'
                          flex={1}
                          onClick={handleCheckout}
                          disabled={isPaying || loading}
                        >
                          {isPaying ? 'Processing...' : 'Continue'}
                        </Button>
                      </HStack>
                    ) : (
                      <Button
                        bg='rgba(64, 69, 225, 1)'
                        fontWeight='semibold'
                        color='white'
                        width='full'
                        size='lg'
                        onClick={() => setShowCheckout(true)}
                      >
                        Checkout
                      </Button>
                    )}
                  </VStack>
                )}
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      <SuccessAlertModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title='Payment Successful 🎉'
        description='Your order has been placed successfully! Check your email for details.'
      />
    </HStack>
  );
};
