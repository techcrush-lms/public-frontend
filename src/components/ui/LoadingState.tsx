import { Flex, Spinner } from '@chakra-ui/react';

export const LoadingState = () => (
  <Flex justify='center' align='center' h='300px'>
    <Spinner size='lg' />
  </Flex>
);
