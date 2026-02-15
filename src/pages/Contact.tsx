import { useState, useRef } from 'react';
import { Mail, Send, User, MessageSquare, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { z } from 'zod';
import emailjs from '@emailjs/browser';

const contactSchema = z.object({
  user_name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be under 100 characters'),
  user_email: z.string().trim().email('Please enter a valid email').max(255, 'Email must be under 255 characters'),
  subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject must be under 200 characters'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be under 2000 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;
type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<ContactForm>({ user_name: '', user_email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus('sending');

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        formRef.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );
      setStatus('success');
      setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
      setForm({ user_name: '', user_email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setStatusMessage('Failed to send message. Please try again or email directly.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputClass = (field: keyof ContactForm) =>
    `bg-card border-border/50 focus:border-accent/50 text-foreground placeholder:text-muted-foreground/50 ${errors[field] ? 'border-destructive/50 focus:border-destructive' : ''}`;

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
          <Mail className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold text-accent tracking-wide uppercase">Get In Touch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground mb-4">
          Let's <span className="gradient-text">Connect</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto text-base">
          Have a question, collaboration idea, or just want to say hi? Drop me a message and I'll get back to you.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-xl mx-auto">
        <form ref={formRef} onSubmit={handleSubmit} className="glass-card-enhanced rounded-2xl p-6 sm:p-8 space-y-5" noValidate>
          {/* Name */}
          <div>
            <label htmlFor="user_name" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <User className="w-4 h-4 text-accent" /> Name
            </label>
            <Input id="user_name" name="user_name" value={form.user_name} onChange={handleChange} placeholder="Your name" className={inputClass('user_name')} maxLength={100} autoComplete="name" />
            {errors.user_name && <p className="text-xs text-destructive mt-1">{errors.user_name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="user_email" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Mail className="w-4 h-4 text-accent" /> Email
            </label>
            <Input id="user_email" name="user_email" type="email" value={form.user_email} onChange={handleChange} placeholder="you@example.com" className={inputClass('user_email')} maxLength={255} autoComplete="email" />
            {errors.user_email && <p className="text-xs text-destructive mt-1">{errors.user_email}</p>}
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <MessageSquare className="w-4 h-4 text-accent" /> Subject
            </label>
            <Input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" className={inputClass('subject')} maxLength={200} />
            {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Send className="w-4 h-4 text-accent" /> Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me what's on your mind..."
              rows={5}
              maxLength={2000}
              className={`w-full rounded-md border px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring ${inputClass('message')}`}
            />
            <div className="flex justify-between mt-1">
              {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              <p className="text-[10px] text-muted-foreground ml-auto">{form.message.length}/2000</p>
            </div>
          </div>

          {/* Status message */}
          {status === 'success' && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
              <p className="text-sm text-accent">{statusMessage}</p>
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{statusMessage}</p>
            </motion.div>
          )}

          {/* Submit */}
          <Button type="submit" disabled={status === 'sending'} className="w-full h-11 font-semibold bg-accent text-accent-foreground hover:bg-accent/80 transition-all">
            {status === 'sending' ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
            ) : (
              <><Send className="w-4 h-4 mr-2" /> Send Message</>
            )}
          </Button>

          <p className="text-[10px] text-muted-foreground/60 text-center">
            Powered by EmailJS · Your data is never stored
          </p>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
