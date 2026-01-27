import {
  CloseButton,
  Dialog,
  HStack,
  Image,
  Portal,
  Text,
} from '@chakra-ui/react';

interface SuccessAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export const SuccessAlertModal = ({
  isOpen,
  onClose,
  title,
  description,
}: SuccessAlertModalProps) => {
  return (
    <Dialog.Root
      open={isOpen}
      placement='center'
      onEscapeKeyDown={() => onClose()}
      onInteractOutside={() => onClose()}
      onOpenChange={(open) => {
        // Called on escape press, backdrop click, or manual close trigger
        if (!open) onClose();
      }}
      modal // enables escape key + backdrop dismissal
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg='#fff'>
            <Dialog.Header />
            <Dialog.Body
              display='flex'
              flexDir='column'
              alignItems='center'
              gap={4}
              textAlign='center'
            >
              <Image src='/images/verified.png' alt='verified' width='40' />

              <Text as='h3' fontSize={24} fontWeight='semibold'>
                {title ?? 'Thank you for your purchase!'}
              </Text>
              <Text fontSize={17}>
                {description ??
                  `You’re all set! You’ll receive an email with your login details and a link to access your dashboard. If you have any questions, please contact our support team.`}
              </Text>
            </Dialog.Body>
            <Dialog.Footer w='full' />
            <Dialog.CloseTrigger asChild>
              <CloseButton
                size='sm'
                color='#000'
                _hover={{ color: 'white' }}
                onClick={() => onClose()}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
