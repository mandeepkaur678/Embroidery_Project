import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { RegisterForm } from '../components/auth/RegisterForm';
import workshopImg from '../assets/image1.jpg';

export const Register = () => {
  return (
    <AuthLayout
      imagePosition="right"
      imageSrc={workshopImg}
      imageAlt="Artisan hands crafting delicate embroidery"
      imageBadgeText="Handcrafted With Love"
      imageOverlayTitle="CREATE SOMETHING BEAUTIFUL"
      imageOverlaySubtitle='"Handcrafted with creativity, patience, and love."'
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
