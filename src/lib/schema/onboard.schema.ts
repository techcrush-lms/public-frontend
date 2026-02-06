import { MeasurementData } from '@/components/product/BusinessProductView';
import { MeasurementMetadata } from '@/types/cart';
import Joi from 'joi';

type InferType<T> = T extends Joi.ObjectSchema ? Joi.Schema<T> : never;

export const AddCustomerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  business_id: Joi.string().required(),
});
export interface AddCustomerProps {
  name: string;
  email: string;
  phone: string;
  country: string;
  country_code: string;
  business_id: string;
  items?: AddItemsProps[];
  additional_note?: string;
  metadata?: MeasurementMetadata[];
}

export const SendContactMessageSchema = Joi.object({
  inquiry: Joi.string().required(),
  description: Joi.string().required(),
  name: Joi.string().required(),
  organization: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  message: Joi.string().required(),
  captcha_token: Joi.string().required(),
});
export interface SendContactMessageProps {
  inquiry: string;
  description: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  message: string;
  captcha_token: string;
}

export const SubscribeToNewsletterSchema = Joi.object({
  email: Joi.string().required(),
});
export interface SubscribeToNewsletterProps {
  email: string;
}

export interface AddItemsProps {
  product_id: string;
  product_type: string;
  quantity: number;
  metadata: MeasurementMetadata[];
}
