'use client';

import React, { useState } from 'react';
import { Box, Button, VStack, HStack, Text } from '@chakra-ui/react';

interface CountryCode {
  code: string;
  flag: string;
  name: string;
  dialCode: string;
}

const countryCodes: CountryCode[] = [
  { code: 'US', flag: '🇺🇸', name: 'United States', dialCode: '+1' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom', dialCode: '+44' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada', dialCode: '+1' },
  { code: 'NG', flag: '🇳🇬', name: 'Nigeria', dialCode: '+234' },
  { code: 'IN', flag: '🇮🇳', name: 'India', dialCode: '+91' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany', dialCode: '+49' },
  { code: 'FR', flag: '🇫🇷', name: 'France', dialCode: '+33' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia', dialCode: '+61' },
  { code: 'BR', flag: '🇧🇷', name: 'Brazil', dialCode: '+55' },
  { code: 'MX', flag: '🇲🇽', name: 'Mexico', dialCode: '+52' },
  { code: 'ZA', flag: '🇿🇦', name: 'South Africa', dialCode: '+27' },
  { code: 'KE', flag: '🇰🇪', name: 'Kenya', dialCode: '+254' },
  { code: 'GH', flag: '🇬🇭', name: 'Ghana', dialCode: '+233' },
  { code: 'EG', flag: '🇪🇬', name: 'Egypt', dialCode: '+20' },
  { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia', dialCode: '+966' },
  { code: 'AE', flag: '🇦🇪', name: 'UAE', dialCode: '+971' },
  { code: 'SG', flag: '🇸🇬', name: 'Singapore', dialCode: '+65' },
  { code: 'JP', flag: '🇯🇵', name: 'Japan', dialCode: '+81' },
  { code: 'KR', flag: '🇰🇷', name: 'South Korea', dialCode: '+82' },
  { code: 'CN', flag: '🇨🇳', name: 'China', dialCode: '+86' },
];

interface CountryCodeSelectorProps {
  selectedCountry: CountryCode;
  onCountryChange: (country: CountryCode) => void;
}

const CountryCodeSelector: React.FC<CountryCodeSelectorProps> = ({
  selectedCountry,
  onCountryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box position='relative'>
      <Button
        variant='outline'
        size='lg'
        minW='120px'
        onClick={() => setIsOpen(!isOpen)}
        borderColor='#e6e9f5'
        _hover={{ borderColor: '#4045E1' }}
        _focus={{ borderColor: '#4045E1', boxShadow: '0 0 0 1px #4045E1' }}
      >
        <HStack gap={2}>
          <Text fontSize='lg'>{selectedCountry.flag}</Text>
          <Text fontSize='sm' fontWeight='medium'>
            {selectedCountry.dialCode}
          </Text>
        </HStack>
      </Button>

      {isOpen && (
        <Box
          position='absolute'
          top='100%'
          left={0}
          w='300px'
          maxH='400px'
          overflowY='auto'
          bg='white'
          border='1px solid'
          borderColor='gray.200'
          borderRadius='md'
          boxShadow='lg'
          zIndex={1000}
          mt={1}
        >
          <VStack gap={0} align='stretch'>
            {countryCodes.map((country) => (
              <Button
                key={country.code}
                variant='ghost'
                size='sm'
                justifyContent='flex-start'
                onClick={() => {
                  onCountryChange(country);
                  setIsOpen(false);
                }}
                _hover={{ bg: 'gray.50' }}
                borderRadius={0}
                h='50px'
              >
                <HStack gap={3} w='full'>
                  <Text fontSize='lg'>{country.flag}</Text>
                  <Text fontSize='sm' fontWeight='medium'>
                    {country.dialCode}
                  </Text>
                  <Text fontSize='sm' color='gray.600' flex={1}>
                    {country.name}
                  </Text>
                </HStack>
              </Button>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default CountryCodeSelector;
