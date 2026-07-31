import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required('Product name is required')
    .min(3, 'Name must be at least 3 characters'),
  description: yup
    .string()
    .required('Product description is required')
    .min(10, 'Description must be at least 10 characters'),
  price: yup
    .number()
    .typeError('Price must be a valid number')
    .required('Price is required')
    .positive('Price must be greater than 0'),
  discountPrice: yup
    .number()
    .typeError('Discount price must be a valid number')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  originalPrice: yup
    .number()
    .typeError('Original price must be a valid number')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  category: yup
    .string()
    .required('Please select a category'),
  imageUrl: yup
    .string()
    .url('Must be a valid image URL')
    .optional(),
  stock: yup
    .number()
    .typeError('Stock must be a valid number')
    .required('Stock quantity is required')
    .min(0, 'Stock cannot be negative'),
  material: yup
    .string()
    .required('Material description is required'),
  sizes: yup
    .string()
    .optional(),
  colors: yup
    .string()
    .optional(),
  featured: yup
    .boolean()
    .optional(),
  status: yup
    .string()
    .optional(),
});
