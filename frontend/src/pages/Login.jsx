import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { LoginForm } from '../components/auth/LoginForm';

export const Login = () => {
  return (
    <AuthLayout
      imagePosition="left"
      imageAlt="Artisan floral embroidery hoop handcrafted with natural thread"
      imageBadgeText="Artisan Embroidery"
      imageOverlayTitle="ARTFUL STITCHES"
      imageOverlaySubtitle='"Where Every Stitch Tells a Story"'
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
