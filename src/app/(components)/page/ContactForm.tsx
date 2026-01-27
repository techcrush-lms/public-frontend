'use client';

import React, { useState } from 'react';
import { Box, SimpleGrid, Input, Textarea, Button } from '@chakra-ui/react';
import SelectBox from '@/components/ui/select-box';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { sendContactMessage } from '@/redux/slices/onboardSlice';
import { SendContactMessageProps } from '@/lib/schema/onboard.schema';
import { AppDispatch } from '@/redux/store';
import dynamic from 'next/dynamic';

// ✅ Load Turnstile only on client
const Turnstile = dynamic(() => import('react-turnstile'), { ssr: false });

const purposes = [
  { label: 'Choose an option that best fits your purpose', value: '' },
  { label: 'General Inquiry', value: 'General Inquiry' },
  { label: 'Support', value: 'Support' },
  { label: 'Partnership', value: 'Partnership' },
  { label: 'Feedback', value: 'Feedback' },
];

const methods = [
  { label: 'Choose one option', value: '' },
  { label: 'Email', value: 'Email' },
  { label: 'Phone', value: 'Phone' },
  { label: 'WhatsApp', value: 'WhatsApp' },
];

const ContactForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    inquiry: [],
    description: [],
    name: '',
    email: '',
    organization: '',
    phone: '',
    message: '',
    captcha_token: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error('Please verify that you are human');
      return;
    }

    if (!formData.inquiry) {
      toast.error('Please select an inquiry purpose');
      return;
    }
    if (!formData.description) {
      toast.error('Please select a description');
      return;
    }
    if (!formData.name.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return;
    }

    setIsSubmitting(true);

    const raw_data: SendContactMessageProps = {
      ...formData,
      inquiry: formData.inquiry[0],
      description: formData.description[0],
      captcha_token: captchaToken,
    };

    try {
      await dispatch(sendContactMessage(raw_data));
      toast.success('Your message has been sent successfully!');

      setFormData({
        inquiry: [],
        description: [],
        name: '',
        email: '',
        organization: '',
        phone: '',
        message: '',
        captcha_token: '',
      });
      setCaptchaToken(null);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box maxW='100%' color='#000' data-aos='fade-up' data-aos-delay='600'>
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
          <div>
            <label>Inquiry Purpose</label>
            <SelectBox
              size='lg'
              data={purposes}
              required
              value={formData.inquiry}
              onChange={(e: any) => handleInputChange('inquiry', e.value)}
              placeholder='Choose an option that best fits your purpose'
            />
          </div>
          <div>
            <label>Description that fits you</label>
            <SelectBox
              size='lg'
              data={methods}
              required
              value={formData.description}
              onChange={(e: any) => handleInputChange('description', e.value)}
              placeholder='Choose an option that best fits your description'
            />
          </div>
          <div>
            <label>Full Name</label>
            <Input
              placeholder='Enter your full name'
              size='lg'
              bg='#F7F8F8'
              borderRadius='8px'
              required
              border='1px solid #D4D5D8'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          <div>
            <label>Email Address</label>
            <Input
              placeholder='Enter your email address'
              type='email'
              size='lg'
              bg='#F7F8F8'
              borderRadius='8px'
              required
              border='1px solid #D4D5D8'
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          <div>
            <label>Organization</label>
            <Input
              placeholder='Enter your organization'
              size='lg'
              bg='#F7F8F8'
              borderRadius='8px'
              border='1px solid #D4D5D8'
              value={formData.organization}
              onChange={(e) =>
                handleInputChange('organization', e.target.value)
              }
            />
          </div>
          <div>
            <label>Phone Number</label>
            <Input
              placeholder='Enter your phone number'
              size='lg'
              bg='#F7F8F8'
              borderRadius='8px'
              border='1px solid #D4D5D8'
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
        </SimpleGrid>

        <Box mb={8}>
          <label>Message</label>
          <Textarea
            placeholder='Enter your message here'
            size='lg'
            bg='#F7F8F8'
            borderRadius='8px'
            border='1px solid #D4D5D8'
            rows={5}
            required
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
          />
        </Box>

        {/* ✅ Cloudflare Turnstile Captcha */}
        <Box mb={6}>
          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
            onVerify={(token) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken(null)}
          />
        </Box>

        <Button
          type='submit'
          colorScheme='blue'
          color='white'
          size='lg'
          borderRadius='8px'
          bg='#4045E1'
          w='sm'
          _hover={{ bg: '#2326a3' }}
          data-aos='zoom-in'
          data-aos-delay='1400'
          loading={isSubmitting} // ✅ FIXED
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Submit Form'}
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;
