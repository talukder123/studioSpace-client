import type { IconType } from "react-icons";
import {
  FiArrowRight,
  FiCalendar,
  FiCamera,
  FiCheckCircle,
  FiCompass,
} from "react-icons/fi";

import { cn } from "@/lib/utils";

type BookingStep = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
};

const bookingSteps: BookingStep[] = [
  {
    id: "discover",
    title: "Discover Spaces",
    description: "Explore creative studios that match your project.",
    icon: FiCompass,
  },
  {
    id: "select-hours",
    title: "Select Shoot Hours",
    description: "Choose your preferred date and booking duration.",
    icon: FiCalendar,
  },
  {
    id: "book",
    title: "Book Instantly",
    description: "Confirm your studio reservation with ease.",
    icon: FiCheckCircle,
  },
  {
    id: "create",
    title: "Create & Produce",
    description: "Arrive at your chosen space and bring your ideas to life.",
    icon: FiCamera,
  },
];

const HowBookingWorks = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-booking-works-heading"
      className="scroll-mt-24 bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/25 bg-[#F97316]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#EA580C] dark:text-[#F97316]">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[#F97316]"
            />
            How It Works
          </span>

          <h2
            id="how-booking-works-heading"
            className="mt-5 text-balance text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Book your studio in four simple steps
          </h2>

          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            From finding the right space to bringing your ideas to life, every
            booking is quick, clear, and built around your creative workflow.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {bookingSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <li key={step.id} className="relative h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm",
                    "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#F97316]/60",
                    "hover:shadow-xl hover:shadow-[#F97316]/10",
                    "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                    "sm:p-7"
                  )}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-4 text-4xl font-bold tabular-nums text-foreground/5 transition-colors duration-300 group-hover:text-[#F97316]/15 sm:text-5xl"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F97316]/10 text-[#F97316] ring-1 ring-inset ring-[#F97316]/20 transition-all duration-300 group-hover:bg-[#F97316] group-hover:text-white group-hover:ring-[#F97316]">
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>

                  <h3 className="mt-6 text-lg font-semibold text-card-foreground">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </article>

                {index < bookingSteps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-full top-14 z-10 hidden w-6 -translate-y-1/2 items-center justify-center lg:flex"
                  >
                    <span className="absolute inset-x-0 border-t border-dashed border-[#F97316]/40" />
                    <FiArrowRight className="relative h-4 w-4 rounded-full bg-background text-[#F97316]" />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default HowBookingWorks;
