'use client';

import {
  ListCollection,
  Portal,
  Select,
  Span,
  Stack,
  createListCollection,
} from '@chakra-ui/react';

export const SelectBoxForm = ({
  data,
}: {
  data: ListCollection<{
    label: string;
    value: string;
    description?: string;
  }>;
}) => {
  return (
    <Select.Root
      collection={data}
      size='sm'
      width='320px'
      defaultValue={['pro']}
    >
      <Select.HiddenSelect />
      <Select.Label>Select plan</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder='Select plan' />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {data.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                <Stack gap='0'>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Span color='fg.muted' textStyle='xs'>
                    {item.description}
                  </Span>
                </Stack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

const frameworks = createListCollection({
  items: [
    {
      label: 'Basic Plan',
      value: 'basic',
      description: '$9/month - Perfect for small projects',
    },
    {
      label: 'Pro Plan',
      value: 'pro',
      description: '$29/month - Advanced features',
    },
    {
      label: 'Business Plan',
      value: 'business',
      description: '$99/month - Enterprise-grade solutions',
    },
    {
      label: 'Enterprise Plan',
      value: 'enterprise',
      description: 'Custom pricing - Tailored solutions',
    },
  ],
});
