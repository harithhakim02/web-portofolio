import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { useLanguage } from "../contexts/LanguageContext";

const schema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter."),
  email: z.string().trim().email("Masukkan alamat email yang valid."),
  subject: z.string().trim().min(3, "Subjek minimal 3 karakter."),
  message: z.string().trim().min(10, "Pesan minimal 10 karakter."),
});

const fieldClass =
  "contact-field mt-2 w-full rounded-xl border bg-white/50 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 dark:bg-zinc-900/40";

export default function Contact() {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    setStatus("idle");
    setSubmitError("");
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setSubmitError(
        language === "id"
          ? "Formulir belum terhubung ke layanan email. Silakan hubungi saya melalui alamat email di samping."
          : "The email service has not been configured yet. Please contact me using the email address shown beside this form.",
      );
      return;
    }

    try {
      // Load EmailJS only when the visitor actually submits the contact form.
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          from_email: values.email,
          reply_to: values.email,
          subject: values.subject,
          message: values.message,
          to_email: "harithhakim66@gmail.com",
        },
        { publicKey },
      );
      setStatus("success");
      reset();
    } catch (error) {
      console.error("EmailJS contact form error:", error);
      setStatus("error");
      setSubmitError(
        language === "id"
          ? "Pesan belum berhasil dikirim. Silakan coba lagi atau kirim email langsung ke saya."
          : "Your message could not be sent. Please try again or email me directly.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="section-space border-t border-zinc-100/70 dark:border-zinc-900 section-alt"
    >
      <div className="container-width grid gap-12 md:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionTitle
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            description={t.contact.description}
          />
          <a
            href="mailto:harithhakim66@gmail.com"
            className="mt-8 inline-flex items-center gap-3 font-semibold text-[var(--accent)]"
          >
            <Mail size={19} /> harithhakim66@gmail.com
          </a>
          <p className="muted mt-2 text-xs">{t.contact.emailNote}</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="surface rounded-2xl p-6 sm:p-8"
          noValidate
        >
          {status === "success" && (
            <p
              role="status"
              className="mb-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
            >
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              {t.contact.success}
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50/80 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              {submitError}
            </p>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">
              {t.contact.name}
              <input
                {...register("name")}
                className={fieldClass}
                placeholder={t.contact.namePlaceholder}
                autoComplete="name"
              />
              {errors.name && (
                <small className="text-red-500">
                  {language === "id"
                    ? errors.name.message
                    : "Please enter a name (at least 2 characters)."}
                </small>
              )}
            </label>
            <label className="text-sm font-medium">
              {t.contact.email}
              <input
                {...register("email")}
                type="email"
                className={fieldClass}
                placeholder={t.contact.emailPlaceholder}
                autoComplete="email"
              />
              {errors.email && (
                <small className="text-red-500">
                  {language === "id"
                    ? "Masukkan alamat email yang valid."
                    : "Please enter a valid email address."}
                </small>
              )}
            </label>
          </div>
          <label className="mt-5 block text-sm font-medium">
            {t.contact.subject}
            <input
              {...register("subject")}
              className={fieldClass}
              placeholder={t.contact.subjectPlaceholder}
            />
            {errors.subject && (
              <small className="text-red-500">
                {language === "id"
                  ? errors.subject.message
                  : "Please enter a subject (at least 3 characters)."}
              </small>
            )}
          </label>
          <label className="mt-5 block text-sm font-medium">
            {t.contact.message}
            <textarea
              {...register("message")}
              rows="5"
              className={`${fieldClass} resize-y`}
              placeholder={t.contact.placeholder}
            />
            {errors.message && (
              <small className="text-red-500">
                {language === "id"
                  ? errors.message.message
                  : "Please write a message (at least 10 characters)."}
              </small>
            )}
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary mt-6 inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? t.contact.sending : t.contact.send}{" "}
            <Send size={16} />
          </button>
          <p className="muted mt-4 text-xs">{t.contact.privacyNote}</p>
        </form>
      </div>
    </section>
  );
}
