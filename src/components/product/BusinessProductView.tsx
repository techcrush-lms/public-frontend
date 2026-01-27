'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  Badge,
  HStack,
  VStack,
  Container,
  Stack,
  Flex,
  Icon,
  Button,
  NativeSelect,
  Accordion,
  Skeleton,
  SkeletonText,
  CloseButton,
  Portal,
  CardBody,
  Grid,
  GridItem,
  Input,
  IconButton,
} from '@chakra-ui/react';

import { Dialog } from '@chakra-ui/react/dialog';

import {
  extractDominantColor,
  formatMoney,
  formatTo12Hour,
  getFirstAvailablePlan,
  getFirstAvailableTier,
  getProductType,
  isVideo,
  PRIMARY_COLOR,
  ProductType,
  reformatUnderscoreText,
  sortSubPlansByPrice,
  sortTiersByPrice,
} from '@/lib/utils';
import useBusinessProductDetails from '@/hooks/page/useBusinessProductDetails';
import AddToCartButton from '@/app/(components)/page/components/AddToCartButton';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Product, SubscriptionPlanPrice, TicketTier } from '@/types/org';
import { getProductIcon } from '@/app/(components)/page/components/ProductIcon';
import { capitalize } from 'lodash';
import moment from 'moment';
import {
  Calendar,
  Clock,
  Minus,
  PackageX,
  Play,
  Plus,
  TriangleRightIcon,
} from 'lucide-react';
import { RootState } from '@/redux/store';

import { FiVideo, FiImage } from 'react-icons/fi';
import { useColorModeValue } from '../ui/color-mode';
import { useCart } from '@/hooks/useCart';
import { NoProduct } from './NoProduct';
import { ProductLoadingSkeleton } from './ProductLoadingSkeleton';

interface ProductFilesProps {
  product: Product;
  thumbnails: { url: string }[];
  activeFile: string | null;
  setActiveFile: (url: string) => void;
}

export const ProductFiles = React.memo(
  ({ product, thumbnails, activeFile, setActiveFile }: ProductFilesProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [imgBgColor, setImgBgColor] = useState('');

    // Combine all image sources into one array
    const allImages = useMemo(() => {
      const physicalImages =
        product.physical_product?.media?.map((m) => m?.multimedia?.url) || [];
      return [...physicalImages, ...thumbnails.map((t) => t.url)].filter(
        Boolean,
      ) as string[];
    }, [product, thumbnails]);

    const handleFileClick = (url: string) => {
      console.log(url);

      setSelectedFile(url);
      setActiveFile(url);
    };

    const previewImage = (url: string) => {
      setSelectedFile(url);
      setActiveFile(url);
      setIsOpen(true);
    };

    const fileContent = () => {
      const _isVideo = isVideo(activeFile || product.multimedia?.url || '');

      let html;
      if (_isVideo) {
        html = (
          <video
            src={activeFile || product.multimedia.url}
            controls
            className='w-full rounded-md border object-cover bg-black'
            // width='70px'
            // height='400px'
          />
        );
      } else {
        html = (
          <Image
            src={activeFile || product.multimedia.url}
            alt={product.title}
            borderRadius='xl'
            w='full'
            h={{ base: 'full', md: '400px' }}
            objectFit='cover'
          />
        );
      }

      return html;
    };

    useEffect(() => {
      const fetchColor = async () => {
        if (activeFile) {
          const color = await extractDominantColor(activeFile);
          setImgBgColor(color);
        }
      };

      fetchColor();
    }, [activeFile]);

    return (
      <>
        <Box
          position={{ base: 'relative', md: 'sticky' }}
          top={{ base: '0', md: '32px' }}
          alignSelf='flex-start'
          alignItems='center'
          flex='1'
          h='100%'
        >
          <HStack
            flex='1'
            gap={4}
            align='flex-start'
            alignItems={'center'}
            h='100%'
            borderRadius='xl'
          >
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <VStack gap={3} align='stretch' maxH='400px' overflowY='auto'>
                {allImages.map((url, idx) => {
                  const _isVideo = isVideo(url);

                  return (
                    <Box
                      key={idx}
                      position='relative' // ⬅️ IMPORTANT: allows us to overlay the icon
                      borderWidth={activeFile === url ? '2px' : '1px'}
                      borderColor={activeFile === url ? 'blue.500' : 'gray.200'}
                      borderRadius='md'
                      overflow='hidden'
                      cursor='pointer'
                      transition='all 0.2s ease'
                      _hover={{
                        borderColor:
                          activeFile === url ? 'blue.500' : 'gray.400',
                        boxShadow: 'sm',
                      }}
                      onClick={() => handleFileClick(url)}
                      w='80px'
                      h='80px'
                      bg='gray.800'
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                    >
                      {_isVideo ? (
                        <>
                          <video
                            src={url}
                            className='w-full h-full object-cover'
                            onClick={() => handleFileClick(url)}
                          />

                          {/* 🔥 Play Icon Overlay */}
                          <Box
                            position='absolute'
                            top='50%'
                            left='50%'
                            transform='translate(-50%, -50%)'
                            bg='rgba(0,0,0,0.5)'
                            borderRadius='full'
                            p='2'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                          >
                            <Play color='white' size={15} />
                          </Box>
                        </>
                      ) : (
                        <Image
                          src={url}
                          alt={`Thumbnail ${idx + 1}`}
                          w='100%'
                          h='100%'
                          objectFit='cover'
                          bg='gray.800'
                        />
                      )}
                    </Box>
                  );
                })}
              </VStack>
            )}

            {/* Main Image */}
            <Box
              flex='1'
              display='flex'
              justifyContent='center'
              alignItems={{ sm: 'center' }}
              borderWidth='1px'
              borderColor='gray.200'
              borderRadius='xl'
              bgColor={imgBgColor}
              overflow='hidden'
              cursor='pointer'
              height={'50vh'}
              onClick={() =>
                previewImage(activeFile || product.multimedia?.url || '')
              }
            >
              {(activeFile || product.multimedia?.url) && fileContent()}
            </Box>
          </HStack>
        </Box>

        {/* Lightbox Dialog */}
        <Dialog.Root
          open={isOpen}
          onEscapeKeyDown={() => setIsOpen(false)}
          onInteractOutside={() => setIsOpen(false)}
          placement='center'
        >
          <Portal>
            <Dialog.Backdrop bg='blackAlpha.800' backdropFilter='blur(3px)' />
            <Dialog.Positioner>
              <Dialog.Content
                bg='transparent'
                boxShadow='none'
                maxW='80vw'
                display='flex'
                justifyContent='center'
                alignItems='center'
              >
                {/* {selectedFile} */}
                {isVideo(selectedFile!) ? (
                  <video
                    src={selectedFile!}
                    className='w-full h-[80vh] object-contain rounded-lg'
                    controls
                  />
                ) : (
                  <Image
                    src={selectedFile!}
                    alt='Selected product image'
                    borderRadius='lg'
                    maxH='80vh'
                    objectFit='contain'
                  />
                )}

                <Dialog.CloseTrigger asChild>
                  <CloseButton
                    size={{ base: 'xs', lg: 'sm' }}
                    color='black'
                    position='absolute'
                    top='8px'
                    right='8px'
                    _hover={{ color: { base: 'black', lg: 'black' } }}
                    backgroundColor={{ base: 'white', lg: 'transparent' }}
                    padding={{ base: 1, lg: 0 }}
                    rounded={{ base: 'full', lg: 'none' }}
                    onClick={() => setIsOpen(false)}
                  />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </>
    );
  },
);

export const SizeSelector = ({
  availableSizes,
  selectedSize,
  setSelectedSize,
}: {
  availableSizes: string[];
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
}) => {
  if (!availableSizes.length) return null;

  return (
    <HStack gap={3} wrap='wrap'>
      {availableSizes.map((size) => {
        const isSelected = selectedSize === size;
        return (
          <Button
            key={size}
            onClick={() => setSelectedSize(size)}
            size='sm'
            variant={isSelected ? 'solid' : 'outline'}
            colorScheme={isSelected ? 'blue' : 'gray'}
            borderColor={isSelected ? 'blue.500' : 'gray.300'}
            bg={isSelected ? PRIMARY_COLOR : 'white'}
            color={isSelected ? 'white' : 'gray.700'}
            _hover={{
              bg: isSelected ? 'blue.600' : 'gray.100',
            }}
            _active={{
              transform: 'scale(0.98)',
            }}
            borderRadius='md'
            fontWeight='medium'
            minW='50px'
          >
            {size}
          </Button>
        );
      })}
    </HStack>
  );
};

// --- Bespoke Measurement Form ---
interface MeasurementField {
  label: string;
  key: string;
}

const units = ['inch', 'cm', 'm'];

const upperBodyFields: MeasurementField[] = [
  { label: 'Bust Circumference', key: 'bust_circumference' },
  { label: 'Shoulder Width', key: 'shoulder_width' },
  { label: 'Armhole Circumference', key: 'armhole_circumference' },
  { label: 'Sleeve Length', key: 'sleeve_length' },
  { label: 'Bicep Circumference', key: 'bicep_circumference' },
  { label: 'Wrist Circumference', key: 'wrist_circumference' },
];

const lowerBodyFields: MeasurementField[] = [
  { label: 'Waist Circumference', key: 'waist_circumference' },
  { label: 'Hip Circumference', key: 'hip_circumference' },
  { label: 'Thigh Circumference', key: 'thigh_circumference' },
  { label: 'Knee Circumference', key: 'knee_circumference' },
  { label: 'Trouser Length', key: 'trouser_length' },
];

const fullBodyFields: MeasurementField[] = [
  { label: 'Height', key: 'height' },
  { label: 'Dress/Gown Length', key: 'dress_length' },
];

export interface MeasurementData {
  customer_name: string;
  [key: string]: string | undefined;
}

interface BespokeMeasurementFormProps {
  onChange?: (data: MeasurementData) => void;
}

const BespokeMeasurementForm = ({ onChange }: BespokeMeasurementFormProps) => {
  const [formData, setFormData] = useState<MeasurementData>({
    customer_name: '',
    unit: 'inch',
  });
  const [activeTab, setActiveTab] = useState<'upper' | 'lower' | 'full'>(
    'upper',
  );
  const [globalUnit, setGlobalUnit] = useState<string>('inch');

  const tabOrder: Array<'upper' | 'lower' | 'full'> = [
    'upper',
    'lower',
    'full',
  ];

  const getFieldsForTab = (tab: 'upper' | 'lower' | 'full') => {
    switch (tab) {
      case 'lower':
        return lowerBodyFields;
      case 'full':
        return fullBodyFields;
      case 'upper':
      default:
        return upperBodyFields;
    }
  };

  const isCurrentTabComplete = useMemo(() => {
    const fields = getFieldsForTab(activeTab);
    return fields.every((field) => {
      const value = formData[field.key];
      return value !== undefined && String(value).trim() !== '';
    });
  }, [activeTab, formData]);

  const hasNextTab = useMemo(() => {
    const idx = tabOrder.indexOf(activeTab);
    return idx > -1 && idx < tabOrder.length - 1;
  }, [activeTab, tabOrder]);

  const goToNextTab = () => {
    const idx = tabOrder.indexOf(activeTab);
    if (idx > -1 && idx < tabOrder.length - 1) {
      setActiveTab(tabOrder[idx + 1]);
    }
  };

  const handleChange = (key: string, value: string) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);

    onChange?.(updated);
  };

  const handleUnitChange = (unit: string) => {
    setGlobalUnit(unit);
    // Update all unit fields in formData
    const allFields = [
      { upper_body: { ...upperBodyFields } },
      { lower_body: { ...lowerBodyFields } },
      { full: { ...fullBodyFields } },
    ];
    const updated = { ...formData, unit };

    setFormData(updated);
    onChange?.(updated);
  };

  const renderGrid = (fields: MeasurementField[]) => (
    <Grid
      templateColumns={{ base: '1fr', md: '1fr', lg: 'repeat(2, 1fr)' }}
      gap={4}
    >
      {fields.map((field) => (
        <GridItem key={field.key}>
          <VStack align='start' gap={1}>
            <Text fontSize='sm' fontWeight='medium' color='gray.700'>
              {field.label}
            </Text>
            <HStack gap={2} w='full'>
              <Input
                placeholder='Enter value'
                type='number'
                value={formData[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                size='sm'
                flex='1'
              />
            </HStack>
          </VStack>
        </GridItem>
      ))}
    </Grid>
  );

  return (
    <Box
      p={6}
      bg='white'
      borderRadius='xl'
      borderWidth='1px'
      borderColor='gray.200'
    >
      <VStack align='start' gap={4} w='full'>
        <Heading size='md' color='gray.800' mb={2}>
          Bespoke Measurement Form
        </Heading>

        <Box w='full'>
          <Text fontSize='sm' fontWeight='medium' color='gray.700' mb={2}>
            Customer Name
          </Text>
          <Input
            placeholder='Enter customer name'
            value={formData.customer_name}
            onChange={(e) => handleChange('customer_name', e.target.value)}
            size='md'
          />
        </Box>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='medium' color='gray.700' mb={2}>
            Unit
          </Text>
          <NativeSelect.Root>
            <NativeSelect.Field
              value={formData[`unit`] || globalUnit}
              onChange={(e) => handleUnitChange(e.target.value)}
            >
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>

        {/* Custom Tabs */}
        <Box w='full'>
          <HStack gap={2} borderBottomWidth='2px' borderColor='gray.200' mb={4}>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setActiveTab('upper')}
              borderBottomWidth={activeTab === 'upper' ? '2px' : '0'}
              borderBottomColor={
                activeTab === 'upper' ? PRIMARY_COLOR : 'transparent'
              }
              borderRadius='0'
              color={activeTab === 'upper' ? PRIMARY_COLOR : 'gray.600'}
              fontWeight={activeTab === 'upper' ? 'semibold' : 'normal'}
              _hover={{ bg: 'gray.50' }}
            >
              Upper Body
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setActiveTab('lower')}
              borderBottomWidth={activeTab === 'lower' ? '2px' : '0'}
              borderBottomColor={
                activeTab === 'lower' ? PRIMARY_COLOR : 'transparent'
              }
              borderRadius='0'
              color={activeTab === 'lower' ? PRIMARY_COLOR : 'gray.600'}
              fontWeight={activeTab === 'lower' ? 'semibold' : 'normal'}
              _hover={{ bg: 'gray.50' }}
            >
              Lower Body
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setActiveTab('full')}
              borderBottomWidth={activeTab === 'full' ? '2px' : '0'}
              borderBottomColor={
                activeTab === 'full' ? PRIMARY_COLOR : 'transparent'
              }
              borderRadius='0'
              color={activeTab === 'full' ? PRIMARY_COLOR : 'gray.600'}
              fontWeight={activeTab === 'full' ? 'semibold' : 'normal'}
              _hover={{ bg: 'gray.50' }}
            >
              Full Body
            </Button>
          </HStack>

          {/* Tab Panels */}
          <Box minH='200px'>
            {activeTab === 'upper' && renderGrid(upperBodyFields)}
            {activeTab === 'lower' && renderGrid(lowerBodyFields)}
            {activeTab === 'full' && renderGrid(fullBodyFields)}
          </Box>

          {hasNextTab && (
            <HStack justify='flex-end' mt={4}>
              <Button
                size='sm'
                bg='black'
                color='white'
                _hover={{ bg: 'gray.800' }}
                _active={{ bg: 'gray.900' }}
                onClick={goToNextTab}
              >
                Proceed to Next Tab
              </Button>
            </HStack>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

interface ProductMetaProps {
  product: Product;
  selectedTier?: TicketTier | null;
  setSelectedTier?: (tier: TicketTier) => void;
  selectedPlanPrice?: SubscriptionPlanPrice | null;
  setSelectedPlanPrice?: React.Dispatch<
    React.SetStateAction<SubscriptionPlanPrice | null>
  >;
  handleTierChange?: (tierId: string) => void;
  displayPrice?: string;
  displayOriginalPrice?: string | null;
  isInCart?: boolean;
  showQuantityControls?: boolean;
}

export const ProductMeta = React.memo(
  ({
    product,
    selectedTier,
    selectedPlanPrice,
    handleTierChange,
    displayPrice,
    displayOriginalPrice,
    showQuantityControls = true,
  }: ProductMetaProps) => {
    const { currency } = useSelector((state: RootState) => state.currency);
    const { items } = useCart();
    const [mounted, setMounted] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [measurementData, setMeasurementData] =
      useState<MeasurementData | null>(null);

    const physical = product.physical_product;
    const isBespoke = physical?.type === 'bespoke';

    const availableSizes = useMemo(
      () => physical?.sizes?.filter(Boolean) || [],
      [physical],
    );
    const availableColors = useMemo(
      () => physical?.colors?.filter(Boolean) || [],
      [physical],
    );

    useEffect(() => {
      setMounted(true);
    }, []);

    const isQuantifiableProduct =
      product.type === ProductType.TICKET ||
      product.type == ProductType.PHYSICAL_PRODUCT;

    const minRequiredQty = useMemo(() => {
      return product.type === ProductType.PHYSICAL_PRODUCT
        ? product.physical_product?.min_required || 1
        : 1;
    }, [product]);

    const [pendingQty, setPendingQty] = useState<number>(minRequiredQty);

    const handleIncrement = () => {
      if (!isQuantifiableProduct) return;
      setPendingQty((q) => q + 1);
    };

    const handleDecrement = () => {
      if (!isQuantifiableProduct) return;
      setPendingQty((q) => Math.max(minRequiredQty, q - 1));
    };

    // Find matching cart item for this product (and tier when applicable)
    const matchingCartItem = useMemo(() => {
      if (!items?.length) return undefined;
      if (product.type === ProductType.TICKET) {
        return items.find(
          (it) =>
            it.product_id === product.id &&
            it.ticket_tier_id === selectedTier?.id,
        );
      }
      return items.find((it) => it.product_id === product.id);
    }, [items, product, selectedTier]);

    const isDecrementDisabled = pendingQty <= minRequiredQty;

    return (
      <VStack flex='1' align='start' gap={6}>
        {/* 🔹 Title & Business */}
        <Box>
          <Heading
            as='h1'
            fontSize='3xl'
            mb='4'
            fontWeight='bold'
            color='gray.800'
          >
            {product.title}
          </Heading>

          <Badge
            display='inline-flex'
            gap={1}
            alignItems='center'
            bg='gray.200'
            color='gray.800'
            mb='4'
          >
            <Icon
              as={getProductIcon(getProductType(product.type))}
              boxSize={3}
            />
            {capitalize(reformatUnderscoreText(product.type))}
          </Badge>

          {product.business_info && (
            <Link
              href={`https://${product.business_info.business_slug!}${process.env.NEXT_PUBLIC_STORE_DOMAIN_EXTENSION}`}
            >
              <Flex gap={2} align='center'>
                {product.business_info.logo_url && (
                  <Image
                    src={product.business_info.logo_url}
                    alt='logo'
                    w='6'
                    h='6'
                    rounded='full'
                  />
                )}
                <Text>{product.business_info.business_name}</Text>
              </Flex>
            </Link>
          )}
        </Box>

        {/* 🔹 Description */}
        {product.description && (
          <Box
            color='gray.700'
            dangerouslySetInnerHTML={{
              __html: product.description.replace(
                /<script[^>]*>.*?<\/script>/gi,
                '',
              ),
            }}
          />
        )}

        {mounted && showQuantityControls && (
          <VStack align='start' gap={1}>
            <Text fontSize='sm' color='#434453'>
              Quantity{pendingQty && '(Yard)'}
            </Text>
            <HStack
              gap={2}
              align='center'
              bg='gray.100'
              border='1px solid gray'
            >
              <IconButton
                aria-label='Decrease quantity'
                size='xs'
                color='#000'
                variant='plain'
                onClick={handleDecrement}
                disabled={
                  !!matchingCartItem ||
                  !isQuantifiableProduct ||
                  isDecrementDisabled
                }
              >
                <Minus size={12} />
              </IconButton>
              <Text
                fontSize='sm'
                fontWeight='medium'
                minW='32px'
                textAlign='center'
              >
                {matchingCartItem?.quantity ?? pendingQty}
              </Text>
              <IconButton
                aria-label='Increase quantity'
                size='xs'
                variant='plain'
                color={
                  matchingCartItem
                    ? 'gray'
                    : isQuantifiableProduct
                      ? '#000'
                      : 'gray'
                }
                onClick={handleIncrement}
                disabled={!!matchingCartItem || !isQuantifiableProduct}
              >
                <Plus size={14} />
              </IconButton>
            </HStack>
          </VStack>
        )}

        {/* 🔹 Subscription Type */}
        {product.type === ProductType.SUBSCRIPTION && (
          <Box w='full'>
            <Text fontWeight='semibold' mb={2}>
              Choose Subscription Plan
            </Text>
            <NativeSelect.Root className='w-full'>
              <NativeSelect.Field
                value={selectedPlanPrice?.id || ''}
                onChange={(e) => handleTierChange?.(e.target.value)}
              >
                {sortSubPlansByPrice(
                  product.subscription_plan?.subscription_plan_prices || [],
                ).map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {capitalize(reformatUnderscoreText(plan.period))} (
                    {formatMoney(+plan.price, currency)})
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>
        )}

        {/* 🔹 Ticket Type */}
        {product.type === ProductType.TICKET && (
          <Box w='full'>
            <Text fontWeight='semibold' mb={3}>
              Event Details
            </Text>
            <VStack align='start' gap={2}>
              <HStack>
                <Calendar size={16} />
                <Text>
                  {moment.utc(product.ticket?.event_start_date).valueOf() !==
                  moment.utc(product.ticket?.event_end_date).valueOf()
                    ? `${moment
                        .utc(product.ticket?.event_start_date)
                        .format('LL')} - ${moment
                        .utc(product.ticket?.event_end_date)
                        .format('LL')}`
                    : moment.utc(product.ticket?.event_start_date).format('LL')}
                </Text>
              </HStack>
              <HStack>
                <Clock size={16} />
                <Text>
                  {product.ticket?.event_time
                    ? formatTo12Hour(product.ticket.event_time)
                    : 'TBD'}
                </Text>
              </HStack>
              <Text color='gray.500' fontSize='sm'>
                Full event details available after purchase.
              </Text>
            </VStack>

            <Box mt={4}>
              <Text fontWeight='semibold' mb={2}>
                Choose Ticket Tier
              </Text>
              <NativeSelect.Root className='w-full'>
                <NativeSelect.Field
                  value={selectedTier?.id || ''}
                  onChange={(e) => handleTierChange?.(e.target.value)}
                >
                  {sortTiersByPrice(product.ticket?.ticket_tiers || []).map(
                    (tier) => (
                      <option value={tier.id} key={tier.id}>
                        {tier.name} ({formatMoney(+tier.amount, currency)})
                      </option>
                    ),
                  )}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Box>
          </Box>
        )}

        {/* 🔹 Physical Product Options */}
        {product.type === ProductType.PHYSICAL_PRODUCT && physical && (
          <Box w='full' gap={2}>
            {/* Show size selector if available (for both bespoke and regular products) */}
            {availableSizes.length > 0 && (
              <Box mb={4} mt={isBespoke ? 2 : 0}>
                <Text fontWeight='semibold' mb={2}>
                  Select Size
                </Text>
                <HStack gap={3} flexWrap='wrap'>
                  <SizeSelector
                    availableSizes={availableSizes}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                  />
                </HStack>
                {selectedSize && (
                  <HStack gap={2} mt={2}>
                    <Text fontSize='sm' color='gray.600'>
                      Selected:
                    </Text>
                    <Badge colorScheme='blue' fontSize='sm' px={2} py={1}>
                      {selectedSize}
                    </Badge>
                  </HStack>
                )}
              </Box>
            )}

            {/* Show color selector if available (for both bespoke and regular products) */}
            {availableColors.length > 0 && (
              <Box mb={isBespoke ? 6 : 2}>
                <Text fontWeight='semibold' mb={2}>
                  Select Color
                </Text>
                <HStack gap={3} flexWrap='wrap'>
                  {availableColors.map((color) => {
                    const isSelected = selectedColor === color;
                    // Convert color name to a valid color for outline
                    const colorValue = color.toLowerCase();
                    // Create a semi-transparent version of the color for the outline
                    const getColorOutline = (colorName: string) => {
                      // For common color names, use a darker/more visible version
                      const colorMap: Record<string, string> = {
                        black: 'rgba(0, 0, 0, 0.4)',
                        white: 'rgba(0, 0, 0, 0.3)',
                        red: 'rgba(239, 68, 68, 0.4)',
                        blue: 'rgba(59, 130, 246, 0.4)',
                        green: 'rgba(34, 197, 94, 0.4)',
                        yellow: 'rgba(234, 179, 8, 0.4)',
                        orange: 'rgba(249, 115, 22, 0.4)',
                        purple: 'rgba(168, 85, 247, 0.4)',
                        pink: 'rgba(236, 72, 153, 0.4)',
                        gray: 'rgba(107, 114, 128, 0.4)',
                        grey: 'rgba(107, 114, 128, 0.4)',
                      };
                      return colorMap[colorName] || 'rgba(0, 0, 0, 0.3)';
                    };
                    return (
                      <Box
                        key={color}
                        w='8'
                        h='8'
                        rounded='full'
                        bg={colorValue}
                        borderWidth={isSelected ? '2px' : '1px'}
                        borderColor={isSelected ? colorValue : 'gray.300'}
                        boxShadow={
                          isSelected
                            ? `0 0 0 2px ${getColorOutline(colorValue)}`
                            : 'none'
                        }
                        cursor='pointer'
                        onClick={() => setSelectedColor(color)}
                        _hover={{
                          borderColor: isSelected ? colorValue : 'gray.400',
                          boxShadow: isSelected
                            ? `0 0 0 2px ${getColorOutline(colorValue)}`
                            : '0 0 0 1px rgba(0, 0, 0, 0.1)',
                        }}
                        transition='all 0.2s ease'
                      />
                    );
                  })}
                </HStack>
                {selectedColor && (
                  <HStack gap={2} mt={2}>
                    <Text fontSize='sm' color='gray.600'>
                      Selected:
                    </Text>
                    <HStack gap={2}>
                      <Box
                        w='4'
                        h='4'
                        rounded='full'
                        bg={selectedColor.toLowerCase()}
                        borderWidth='1px'
                        borderColor='gray.300'
                      />
                      <Text
                        fontSize='sm'
                        fontWeight='medium'
                        textTransform='capitalize'
                      >
                        {selectedColor}
                      </Text>
                    </HStack>
                  </HStack>
                )}
              </Box>
            )}

            {/* Show measurement form for bespoke products */}
            {isBespoke && (
              <Box mb={2}>
                <BespokeMeasurementForm
                  onChange={(data) => setMeasurementData(data)}
                />
              </Box>
            )}
          </Box>
        )}

        {/* 🔹 Pricing */}
        <Flex gap={2} align='center'>
          {displayOriginalPrice && (
            <Text as='s' fontSize='sm' fontWeight='semibold' color='gray.500'>
              {formatMoney(+displayOriginalPrice, currency)}
            </Text>
          )}
          <Text fontSize='lg' fontWeight='bold'>
            {formatMoney(+displayPrice!, currency)}
          </Text>
        </Flex>

        {/* 🔹 Add to Cart Button */}
        <AddToCartButton
          product={product}
          productId={product.id}
          ticketTierId={selectedTier?.id}
          subscriptionTierId={selectedPlanPrice?.id}
          productType={product.type as ProductType}
          quantity={pendingQty}
          size='lg'
          w='full'
          colorScheme='blue'
          borderRadius='md'
          background={PRIMARY_COLOR}
          color='white'
          _hover={{ background: '#9a9df0' }}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          measurementData={measurementData ? [measurementData] : []}
        >
          {product.type === ProductType.TICKET && selectedTier
            ? `Buy ${selectedTier.name} Ticket`
            : 'Add to Cart'}
        </AddToCartButton>
      </VStack>
    );
  },
);

interface CourseModulesPreviewProps {
  modules: Product['modules'];
}

const CourseModulesPreview = ({ modules }: CourseModulesPreviewProps) => {
  if (!modules || modules.length === 0) {
    return (
      <Box textAlign='center' color='gray.500' py={6}>
        No modules available for this course yet.
      </Box>
    );
  }

  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [value],
    );
  };

  const isOpen = (value: string) => openItems.includes(value);

  return (
    <Box
      borderRadius='2xl'
      borderWidth='1px'
      borderColor='gray.200'
      p={10}
      mt={10}
      width={'full'}
    >
      <Text fontSize='xl' fontWeight='bold' mb={4}>
        Course Content
      </Text>

      <Box
        pt={6}
        width='100%'
        maxWidth={'full'}
        background="url('/images/faqGrid.png')"
        backgroundSize='contain'
        backgroundPosition='center top'
        backgroundRepeat='no-repeat'
      >
        <Stack gap={{ base: 2, md: 3 }} mb={{ base: 4, md: 8 }} color='#000'>
          <Accordion.Root variant='subtle' collapsible>
            {modules.map((module, index) => (
              <Accordion.Item
                key={index}
                value={module.title}
                backgroundColor='rgba(247, 248, 248, 1)'
                mb={{ base: 2, md: 3 }}
                borderRadius='8px'
                paddingX={{ base: 2, md: 5 }}
              >
                <Accordion.ItemTrigger
                  onClick={() => toggleItem(module.title)}
                  padding={{ base: 3, md: 5 }}
                >
                  <Text
                    flex='1'
                    display='flex'
                    fontSize={{ base: '16px', md: '20px', lg: '22px' }}
                    fontWeight='semibold'
                    gap={{ base: 2, md: 4 }}
                  >
                    {index + 1}. {module.title}
                  </Text>
                  <Text
                    fontSize={{ base: '20px', md: '24px', lg: '25px' }}
                    fontWeight='semibold'
                    color='gray.500'
                  >
                    {isOpen(module.title) ? '−' : '+'}
                  </Text>
                </Accordion.ItemTrigger>

                {module.contents.map((content, idx) => (
                  <Box key={content.id}>
                    <Accordion.ItemContent
                      paddingX={{ base: 3, md: 5 }}
                      paddingY={{ base: 3, md: 4 }}
                    >
                      <HStack gap={{ base: 2, md: 3 }} align='center'>
                        <Box
                          bg='gray.300'
                          color='gray.700'
                          p={{ base: 1.5, md: 2 }}
                          rounded='lg'
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                        >
                          <Icon
                            as={
                              content.multimedia?.type === 'VIDEO'
                                ? FiVideo
                                : FiImage
                            }
                            boxSize={{ base: 3.5, md: 4 }}
                          />
                        </Box>
                        <Text
                          fontSize={{ base: '13px', md: '15px', lg: '16px' }}
                        >
                          {content.title}
                        </Text>
                      </HStack>
                    </Accordion.ItemContent>
                  </Box>
                ))}
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Stack>
      </Box>
    </Box>
  );
};

// --- Main Component ---
const BusinessProductView = () => {
  const { product, loading, error } = useBusinessProductDetails();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [selectedPlanPrice, setSelectedPlanPrice] =
    useState<SubscriptionPlanPrice | null>(null);

  const handleTierChange = (tierId: string) => {
    if (product?.type === ProductType.TICKET && product?.ticket) {
      const sortedTiers = sortTiersByPrice(product?.ticket?.ticket_tiers);
      const tier = sortedTiers.find((t) => t.id === tierId);
      if (tier) {
        setSelectedTier(tier);
      }
    }
    if (
      product?.type === ProductType.SUBSCRIPTION &&
      product?.subscription_plan
    ) {
      const sortedTiers = sortSubPlansByPrice(
        product?.subscription_plan?.subscription_plan_prices,
      );
      const tier = sortedTiers.find((t) => t.id === tierId);

      if (tier) {
        setSelectedPlanPrice(tier);
      }
    }
  };

  // Calculate prices
  const displayPrice = useMemo(() => {
    const basePrice =
      product?.type === ProductType.TICKET && selectedTier
        ? +selectedTier.amount
        : product?.type === ProductType.SUBSCRIPTION && selectedPlanPrice
          ? +selectedPlanPrice.price
          : +(product?.price || 0);
    return basePrice.toFixed(2);
  }, [product, selectedTier, selectedPlanPrice]);

  const displayOriginalPrice = useMemo(() => {
    const basePrice =
      product?.type === ProductType.TICKET && selectedTier
        ? selectedTier.original_amount
          ? +selectedTier.original_amount
          : null
        : product?.original_price
          ? +product?.original_price
          : null;
    return basePrice ? basePrice.toFixed(2) : null;
  }, [product, selectedTier]);

  useEffect(() => {
    if (product?.type === ProductType.TICKET) {
      const firstTier = getFirstAvailableTier(product);
      if (firstTier) setSelectedTier(firstTier);
    } else if (product?.type === ProductType.SUBSCRIPTION) {
      const firstTier = getFirstAvailablePlan(product);
      if (firstTier) setSelectedPlanPrice(firstTier);
    }
  }, [product]);

  if (error) return <NoProduct />;
  if (loading || !product) return <ProductLoadingSkeleton />;

  const thumbnails = [...(product.multimedia ? [product.multimedia] : [])];

  return (
    <Container py={32} px={{ md: 20 }}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        gap={10}
        borderRadius='2xl'
      >
        <ProductFiles
          product={product}
          thumbnails={thumbnails}
          activeFile={activeImage}
          setActiveFile={setActiveImage}
        />
        <ProductMeta
          product={product}
          selectedTier={selectedTier}
          setSelectedTier={setSelectedTier}
          selectedPlanPrice={selectedPlanPrice}
          setSelectedPlanPrice={setSelectedPlanPrice}
          handleTierChange={handleTierChange}
          displayPrice={displayPrice}
          displayOriginalPrice={displayOriginalPrice}
        />
      </Stack>
      {product.type === ProductType.COURSE &&
        product.modules &&
        product.modules.length > 0 && (
          <CourseModulesPreview modules={product.modules} />
        )}
    </Container>
  );
};

export default BusinessProductView;
