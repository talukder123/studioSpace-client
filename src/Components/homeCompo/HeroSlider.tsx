"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
};

type HeroSliderProps = {
  slides: HeroSlide[];
  className?: string;
};

const CTA = {
  explore: {
    label: "Explore Studios",
    href: "/explore-studios",
  },
  host: {
    label: "Host Your Space",
    href: "/add-new-studio",
  },
} as const;

const swiperThemeVars = {
  "--swiper-pagination-color": "#F97316",
  "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
  "--swiper-pagination-bullet-inactive-opacity": "0.45",
  "--swiper-pagination-bullet-size": "8px",
  "--swiper-pagination-bullet-horizontal-gap": "6px",
} as CSSProperties;

// Arrows sit in the bottom corners so they never collide with the copy: between
// the `sm` and `2xl` breakpoints the max-w-7xl container has no outer gutter, so
// a vertically centred arrow would land on top of the headline. The dots drop to
// the bottom edge on mobile (no arrows there) to clear the stacked CTAs on the
// narrowest screens.
const navButtonClass =
  "absolute bottom-6 z-20 hidden h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-sm transition-colors hover:border-[#F97316] hover:bg-[#F97316] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:flex";

export function HeroSlider({ slides, className }: HeroSliderProps) {
  return (
    <section
      aria-label="Featured studio spaces"
      aria-roledescription="carousel"
      className={cn(
        "relative isolate w-full overflow-hidden bg-neutral-950",
        className
      )}
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop
        speed={800}
        slidesPerView={1}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{ prevEl: ".hero-slider-prev", nextEl: ".hero-slider-next" }}
        pagination={{ clickable: true }}
        style={swiperThemeVars}
        className="h-[560px] w-full [--swiper-pagination-bottom:24px] sm:h-[620px] sm:[--swiper-pagination-bottom:42px] lg:h-[680px] xl:h-[720px] [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:w-7 [&_.swiper-pagination-bullet-active]:rounded-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              preload={index === 0}
              sizes="100vw"
              className="object-cover"
            />

            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25"
            />

            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 md:px-8">
              <div className="max-w-2xl pb-16 pt-16 text-white">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[#F97316]"
                  />
                  {slide.eyebrow}
                </span>

                <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>

                <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
                  {slide.description}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href={CTA.explore.href}
                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#F97316] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#EA580C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-base"
                  >
                    {CTA.explore.label}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href={CTA.host.href}
                    className="inline-flex items-center justify-center rounded-lg border border-white/60 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-base"
                  >
                    {CTA.host.label}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button
          type="button"
          slot="container-end"
          aria-label="Previous slide"
          className={cn(navButtonClass, "hero-slider-prev left-4 sm:left-6 md:left-8")}
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          type="button"
          slot="container-end"
          aria-label="Next slide"
          className={cn(navButtonClass, "hero-slider-next right-4 sm:right-6 md:right-8")}
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </Swiper>
    </section>
  );
}

export default HeroSlider;
