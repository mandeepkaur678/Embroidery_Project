import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  name: yup.string().trim().required('Full name is required').min(2, 'Please enter at least 2 characters'),
  email: yup.string().trim().required('Email address is required').email('Please enter a valid email address'),
  phone: yup.string().trim().transform((value) => (value ? value : '')).matches(/^[0-9+()\-\s]{7,15}$/, 'Please enter a valid phone number'),
  subject: yup.string().trim().required('Subject is required').min(3, 'Please enter a short subject'),
  message: yup.string().trim().required('Message is required').min(20, 'Please share a little more detail so we can help you better.'),
});
