'use client';

import { Portal, Select, Stack, createListCollection } from '@chakra-ui/react';
import { CSSProperties } from 'react';

interface SelectBoxProps {
  size: 'xs' | 'sm' | 'md' | 'lg';
  data: Array<{ label: string; value: string }>;
  required?: boolean;
  value: any;
  onChange: any;
  placeholder?: string;
  label?: string;
  style?: CSSProperties | undefined;
}

const SelectBox = ({
  size,
  data,
  required = false,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  style,
}: SelectBoxProps) => {
  return (
    <Stack gap='5'>
      <Select.Root
        key={size}
        size={size}
        collection={createListCollection({ items: data })}
        value={value}
        onValueChange={onChange}
        required={required}
        width='full'
        style={style}
      >
        <Select.HiddenSelect />
        {label && <Select.Label>{label}</Select.Label>}
        <Select.Control>
          <Select.Trigger
            bg='#F7F8F8'
            borderRadius='8px'
            border='1px solid #D4D5D8'
            borderColor='#D4D5D8'
            _hover={{ borderColor: '#D4D5D8' }}
            _focus={{
              borderRadius: '8px',
              border: '1px solid #D4D5D8',
              borderColor: '#D4D5D8',
            }}
          >
            <Select.ValueText
              placeholder={placeholder}
              color={value ? '#000' : 'gray'}
            />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator
            // color='gray.500'
            />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content
              bg='white'
              border='1px solid'
              borderColor='gray.200'
              // boxShadow=''
              // color=''
              borderRadius='md'
              maxH='200px'
              overflow='auto'
            >
              {data.map((item) => (
                <Select.Item
                  item={item}
                  key={item.value}
                  _hover={{ bg: 'gray.100' }}
                  _selected={{ bg: 'blue.50', color: 'blue.600' }}
                  // color='gray.900'
                >
                  {item.label}
                  <Select.ItemIndicator color='blue.500' />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Stack>
  );
};

export default SelectBox;
