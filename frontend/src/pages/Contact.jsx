import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  MessageCircleHeart,
  Flower2,
  Send,
  CircleAlert,
  ChevronRight,
  Scissors,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { contactSchema } from '../schemas/contactSchema';
import { submitContactMessage } from '../services/contactService';

const contactInfoItems = [
  {
    icon: Mail,
    title: 'Email Us',
    info: 'hello@artfulstitches.com',
    description: 'Send us an email and we will get back to you soon.',
    href: 'mailto:hello@artfulstitches.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    info: '+91 (987) 654-3210',
    description: 'We are happy to help with your questions.',
    href: 'tel:+919876543210',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    info: 'Artisan Village, New Delhi',
    description: 'Come and explore our world of handmade embroidery.',
    href: 'https://maps.google.com',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    info: 'Mon–Sat • 10:00 AM – 7:00 PM',
    description: 'We are available for consultations and custom requests.',
    href: '#',
  },
];

const faqItems = [
  {
    question: 'How can I contact you about my order?',
    answer: 'You can reach our studio by phone, email, or the contact form on this page. We will be happy to help with updates, shipping questions, or custom requests.',
  },
  {
    question: 'Do you accept custom embroidery requests?',
    answer: 'Absolutely. We love creating personalized designs for special occasions, gifts, and meaningful keepsakes.',
  },
  {
    question: 'How long does a custom embroidery order take?',
    answer: 'Custom pieces usually take between 7 and 14 business days, depending on complexity and the current production schedule.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, we share a tracking update and delivery details by email.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept secure online payments through the available checkout options on the website.',
  },
  {
    question: 'Do you offer returns or exchanges?',
    answer: 'We review returns and exchanges on a case-by-case basis for damaged or incorrect items. Please contact us with your order details so we can assist.',
  },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
  { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
];

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await submitContactMessage(values);
      toast.success('Your message has been sent successfully!');
      reset();
    } catch (error) {
      const message = error?.response?.data?.message || 'We could not send your message right now.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Navbar cartCount={3} wishlistCount={2} />
      <main className="flex-grow">
        <section className="relative overflow-hidden border-b border-beige/80 bg-[linear-gradient(135deg,rgba(250,248,243,0.96),rgba(243,235,221,0.9))]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-6 top-8 h-24 w-24 rounded-full border border-sage/20" />
            <div className="absolute right-10 top-14 h-20 w-20 rounded-full border border-terracotta/20" />
            <div className="absolute bottom-8 left-1/3 h-16 w-16 rounded-full border border-gold/20" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] text-sage">
                <Flower2 className="h-3.5 w-3.5" />
                Get In Touch
              </div>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-earth sm:text-5xl lg:text-6xl">
                We&apos;d Love to Hear From You
              </h1>
              <p className="mt-5 text-lg leading-8 text-charcoal/80">
                Have a question about our handmade embroidery, need help with an order, or have a custom design in mind? We&apos;d love to hear from you.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/shop">
                  <Button variant="default" size="lg" className="w-full sm:w-auto">
                    Explore Collection
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/custom-embroidery">
                  <Button variant="outline" size="lg" className="w-full border-sage/50 text-sage-dark hover:bg-sage/10 sm:w-auto">
                    Request Custom Embroidery
                  </Button>
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[32px] border border-beige/70 bg-white/80 p-3 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.22)]">
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
                alt="Handmade embroidery detail with floral threadwork"
                className="h-[420px] w-full rounded-[24px] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {contactInfoItems.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.title} href={item.href} className="group block">
                  <Card className="h-full border-beige/70 bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-lg">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 text-sage transition-colors group-hover:bg-sage group-hover:text-cream">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="mt-4">{item.title}</CardTitle>
                      <CardDescription className="mt-2">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium text-earth">{item.info}</p>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-beige/70 bg-white/85 p-0 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.16)]">
              <CardHeader className="px-6 py-8 sm:px-8">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-terracotta">
                  <MessageCircleHeart className="h-3.5 w-3.5" />
                  Send Us a Message
                </div>
                <CardTitle className="mt-3 text-3xl sm:text-4xl">Tell us about your project</CardTitle>
                <CardDescription className="mt-3 max-w-2xl text-base">
                  Whether you are looking for a custom gift, a consultation, or a quick order question, we are here to help with care.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-8 sm:px-8">
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-semibold text-earth">Full Name</label>
                      <input id="name" type="text" placeholder="Enter your full name" className="w-full rounded-2xl border border-beige/80 bg-cream/70 px-4 py-3 text-sm text-earth outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20" {...register('name')} />
                      {errors.name && <p className="mt-2 text-sm text-error">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-earth">Email Address</label>
                      <input id="email" type="email" placeholder="Enter your email address" className="w-full rounded-2xl border border-beige/80 bg-cream/70 px-4 py-3 text-sm text-earth outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20" {...register('email')} />
                      {errors.email && <p className="mt-2 text-sm text-error">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-earth">Phone Number</label>
                      <input id="phone" type="tel" placeholder="Enter your phone number" className="w-full rounded-2xl border border-beige/80 bg-cream/70 px-4 py-3 text-sm text-earth outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20" {...register('phone')} />
                      {errors.phone && <p className="mt-2 text-sm text-error">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-earth">Subject</label>
                      <input id="subject" type="text" placeholder="What can we help you with?" className="w-full rounded-2xl border border-beige/80 bg-cream/70 px-4 py-3 text-sm text-earth outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20" {...register('subject')} />
                      {errors.subject && <p className="mt-2 text-sm text-error">{errors.subject.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-earth">Message</label>
                    <textarea id="message" rows="6" placeholder="Tell us how we can help..." className="w-full rounded-2xl border border-beige/80 bg-cream/70 px-4 py-3 text-sm text-earth outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20" {...register('message')} />
                    {errors.message && <p className="mt-2 text-sm text-error">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting ? <Send className="h-4 w-4" /> : null}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-beige/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(245,241,232,0.92))] shadow-[0_20px_60px_-24px_rgba(0,0,0,0.14)]">
                <CardHeader className="px-6 py-8 sm:px-8">
                  <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-sage">
                    <Sparkles className="h-3.5 w-3.5" />
                    Custom Embroidery
                  </div>
                  <CardTitle className="mt-3 text-2xl">Have a Custom Design in Mind?</CardTitle>
                  <CardDescription className="mt-3 text-base">
                    From personalized names to meaningful motifs, we would love to help bring your embroidery idea to life.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-8 sm:px-8">
                  <Link to="/custom-embroidery">
                    <Button variant="outline" size="lg" className="w-full border-sage/50 text-sage-dark hover:bg-sage/10">
                      Request Custom Embroidery
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-beige/70 bg-white/85 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.14)]">
                <CardHeader className="px-6 py-8 sm:px-8">
                  <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-terracotta">
                    <Scissors className="h-3.5 w-3.5 rotate-45" />
                    Follow Our Journey
                  </div>
                  <CardTitle className="mt-3 text-2xl">Stay connected with our studio</CardTitle>
                  <CardDescription className="mt-3 text-base">
                    Discover new designs, handmade creations, and embroidery inspiration from our creative community.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-8 sm:px-8">
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-beige/70 bg-cream/70 px-4 py-2.5 text-sm font-semibold text-earth transition hover:-translate-y-0.5 hover:bg-sage hover:text-cream">
                          <Icon className="h-4 w-4" />
                          {link.label}
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="rounded-[32px] border border-beige/70 bg-white/80 p-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.16)] sm:p-8 lg:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-sage">
                <CircleAlert className="h-3.5 w-3.5" />
                Frequently Asked Questions
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-earth sm:text-4xl">Helpful answers before you reach out</h2>
            </div>
            <div className="mt-8 space-y-3">
              {faqItems.map((item, index) => (
                <details key={item.question} className="group rounded-2xl border border-beige/80 bg-cream/70 p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-base font-semibold text-earth">
                    <span>{item.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 transition group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-charcoal/80">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
          <div className="relative overflow-hidden rounded-[36px] border border-beige/80 bg-[linear-gradient(135deg,#2F3329_0%,#53604B_100%)] px-6 py-12 text-cream shadow-[0_20px_60px_-24px_rgba(0,0,0,0.25)] sm:px-8 lg:px-12">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/20" />
            <div className="absolute bottom-0 left-6 h-24 w-24 rounded-full border border-white/10" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">Crafted with care</p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Let&apos;s Create Something Beautiful Together</h2>
                <p className="mt-4 text-base leading-8 text-cream/80">
                  Whether you are looking for a unique handmade piece or have a special design in mind, we are here to help.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/shop">
                  <Button variant="beige" size="lg" className="w-full bg-cream text-earth hover:bg-beige-dark sm:w-auto">
                    Shop Our Collection
                  </Button>
                </Link>
                <Link to="/custom-embroidery">
                  <Button variant="outline" size="lg" className="w-full border-white/60 bg-transparent text-cream hover:bg-white/10 sm:w-auto">
                    Request Custom Embroidery
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
