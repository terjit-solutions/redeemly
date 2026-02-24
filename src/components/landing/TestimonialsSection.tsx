"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/stores/app-store";
import { isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { testimonials } from "@/data/testimonials";

/* ------------------------------------------------------------------ */
/*  Copy — trilingual                                                  */
/* ------------------------------------------------------------------ */

const copy = {
  title: {
    en: "Don\u2019t take our word for it",
    ar: "\u0644\u0627 \u062a\u0623\u062e\u0630 \u0643\u0644\u0627\u0645\u0646\u0627 \u0641\u0642\u0637",
    fr: "Ne nous croyez pas sur parole",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Slight rotation offsets for organic chat-bubble feel               */
/* ------------------------------------------------------------------ */

const rotations = [
  "md:rotate-[-0.5deg]",
  "md:rotate-[0.3deg]",
  "md:rotate-[0.6deg]",
  "md:rotate-[-0.3deg]",
  "md:rotate-[0.4deg]",
  "md:rotate-[-0.6deg]",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function TestimonialsSection() {
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  return (
    <section
      className={cn("grain relative py-24 sm:py-32", isDark ? "bg-[#1A1A1A]" : "bg-sand-light")}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* -------- Header -------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className={cn("font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl", isDark ? "text-sand" : "text-rich-black")}>
            {copy.title[language]}
          </h2>

          {/* Gold decorative rule */}
          <div className="rule-gold mx-auto mt-6 mb-14 max-w-[100px]" />
        </motion.div>

        {/* -------- Testimonial grid -------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial, i) => {
            const comment =
              language === "ar"
                ? testimonial.commentAr
                : language === "fr"
                  ? testimonial.commentFr
                  : testimonial.comment;

            const name =
              language === "ar" ? testimonial.nameAr : testimonial.name;

            const city =
              language === "ar"
                ? testimonial.cityAr
                : language === "fr"
                  ? testimonial.cityFr
                  : testimonial.city;

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className={cn(
                  /* Bubble shape */
                  "p-5 sm:p-6",
                  isDark ? "bg-[#1E1E1E]" : "bg-white",
                  rtl
                    ? "rounded-2xl rounded-tr-sm"
                    : "rounded-2xl rounded-tl-sm",
                  /* Shadow & border */
                  "shadow-sm border",
                  isDark ? "shadow-black/10 border-gold/[0.08]" : "shadow-rich-black/[0.04] border-rich-black/[0.04]",
                  /* Organic rotation + hover reset */
                  rotations[i % rotations.length],
                  "hover:rotate-0 transition-all duration-300"
                )}
              >
                {/* Top row: avatar + name + city */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-copper/10 flex items-center justify-center text-copper text-sm font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="min-w-0">
                    <span className={cn("block text-sm font-semibold truncate", isDark ? "text-sand" : "text-rich-black")}>
                      {name}
                    </span>
                    <span className={cn("block text-xs truncate", isDark ? "text-sand/40" : "text-rich-black/40")}>
                      {city}
                    </span>
                  </div>
                </div>

                {/* Message text */}
                <p className={cn("mt-3 text-sm leading-relaxed", isDark ? "text-sand/70" : "text-rich-black/70")}>
                  &ldquo;{comment}&rdquo;
                </p>

                {/* Bottom row: stars + service */}
                <div className="mt-3 flex items-center justify-between">
                  {/* Star rating */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span
                        key={j}
                        className={cn(
                          "text-xs",
                          j < testimonial.rating
                            ? "text-gold"
                            : isDark ? "text-sand/15" : "text-rich-black/15"
                        )}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>

                  {/* Service name */}
                  <span className={cn("text-xs", isDark ? "text-sand/40" : "text-rich-black/40")}>
                    {testimonial.service}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
