import type { IconType } from "react-icons";
import { FiHeadphones, FiShield, FiTool, FiUserCheck } from "react-icons/fi";

import { cn } from "@/lib/utils";

type Assurance = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
};

const assurances: Assurance[] = [
  {
    id: "liability",
    title: "Liability Protection",
    description:
      "Added peace of mind with protection measures for eligible bookings.",
    icon: FiShield,
  },
  {
    id: "verified",
    title: "Verified Profiles",
    description:
      "Connect with trusted hosts and creators through profile verification.",
    icon: FiUserCheck,
  },
  {
    id: "equipment",
    title: "Equipment Safety",
    description:
      "Help ensure studio equipment is handled responsibly and safely.",
    icon: FiTool,
  },
  {
    id: "support",
    title: "24/7 Host Support",
    description:
      "Get assistance whenever you need help with your hosting experience.",
    icon: FiHeadphones,
  },
];

const CreatorSupport = () => {
  return (
    <section
      aria-labelledby="creator-support-heading"
      className="border-y border-border/60 bg-muted/30 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/25 bg-[#F97316]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#EA580C] dark:text-[#F97316]">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[#F97316]"
            />
            Host Guarantee &amp; Creator Support
          </span>

          <h2
            id="creator-support-heading"
            className="mt-5 text-balance text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Host with confidence. Create without worry.
          </h2>

          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every booking is backed by protections designed to keep hosts,
            creators, and their spaces safe from the first message to the final
            wrap.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {assurances.map((assurance) => {
            const Icon = assurance.icon;

            return (
              <li key={assurance.id} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm",
                    "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#F97316]/60",
                    "hover:shadow-xl hover:shadow-[#F97316]/10",
                    "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                    "sm:p-7"
                  )}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F97316]/10 text-[#F97316] ring-1 ring-inset ring-[#F97316]/20 transition-all duration-300 group-hover:bg-[#F97316] group-hover:text-white group-hover:ring-[#F97316]">
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold text-card-foreground">
                    {assurance.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {assurance.description}
                  </p>

                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#F97316] to-[#EA580C] transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default CreatorSupport;
