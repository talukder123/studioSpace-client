"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
  FiDollarSign,
  FiInfo,
  FiLoader,
  FiMapPin,
  FiPlus,
  FiTag,
  FiUser,
} from "react-icons/fi";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Art Studio",
  "Sound Stage",
] as const;

const AMENITIES = [
  "Wi-Fi",
  "Air Conditioning",
  "Free Parking",
  "Lighting Equipment",
  "Soundproofing",
  "Photography Equipment",
  "Restroom",
  "Kitchen",
  "Changing Room",
  "Professional Audio Equipment",
  "Furniture",
  "Natural Lighting",
] as const;

export type StudioCategory = (typeof CATEGORIES)[number];
export type Amenity = (typeof AMENITIES)[number];

export type StudioOwner = {
  name: string;
  email: string;
};

export type StudioSubmission = {
  title: string;
  category: StudioCategory;
  overview: string;
  hourlyRate: number;
  securityDeposit: number | null;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  amenities: Amenity[];
  owner: StudioOwner;
};

type AddNewStudioFormProps = {
  onSubmit?: (studio: StudioSubmission) => Promise<void> | void;
};

interface FormValues {
  title: string;
  category: string;
  overview: string;
  hourlyRate: string;
  securityDeposit: string;
  maxCapacity: string;
  location: string;
  imageUrl: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

type Feedback = {
  type: "success" | "error";
  message: string;
};

const INITIAL_VALUES: FormValues = {
  title: "",
  category: "",
  overview: "",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  location: "",
  imageUrl: "",
};

// Placeholder until authentication is integrated.

const inputClass =
  "h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-[#F97316] focus-visible:ring-2 focus-visible:ring-[#F97316]/20 dark:bg-input/30";

const errorInputClass =
  "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20";

const readOnlyInputClass =
  "cursor-not-allowed border-border bg-muted/50 text-muted-foreground focus-visible:ring-0";

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.title.trim()) {
    errors.title = "Studio title is required.";
  }

  if (!values.category) {
    errors.category = "Please select a category.";
  }

  if (!values.overview.trim()) {
    errors.overview = "Overview is required.";
  }

  if (!values.hourlyRate.trim()) {
    errors.hourlyRate = "Hourly rate is required.";
  } else if (!Number.isFinite(Number(values.hourlyRate)) || Number(values.hourlyRate) <= 0) {
    errors.hourlyRate = "Hourly rate must be greater than zero.";
  }

  if (values.securityDeposit.trim()) {
    const deposit = Number(values.securityDeposit);
    if (!Number.isFinite(deposit) || deposit < 0) {
      errors.securityDeposit = "Security deposit cannot be negative.";
    }
  }

  if (!values.maxCapacity.trim()) {
    errors.maxCapacity = "Maximum capacity is required.";
  } else {
    const capacity = Number(values.maxCapacity);
    if (!Number.isInteger(capacity) || capacity <= 0) {
      errors.maxCapacity = "Capacity must be a positive whole number.";
    }
  }

  if (!values.location.trim()) {
    errors.location = "Location is required.";
  }

  if (!values.imageUrl.trim()) {
    errors.imageUrl = "Studio image URL is required.";
  } else {
    try {
      const url = new URL(values.imageUrl.trim());
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("Invalid protocol");
      }
    } catch {
      errors.imageUrl = "Enter a valid http:// or https:// image URL.";
    }
  }

  return errors;
}

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

function Field({ id, label, required, error, children }: FieldProps) {


  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-[#F97316]">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  type?: "text" | "email" | "url" | "number";
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  error?: string;
  min?: string;
  step?: string;
};

function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  readOnly,
  error,
  min,
  step,
}: TextFieldProps) {
  return (
    <Field id={id} label={label} required={required} error={error}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={
          onChange ? (event) => onChange(event.target.value) : undefined
        }
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        aria-readonly={readOnly || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        min={min}
        step={step}
        className={cn(
          inputClass,
          error && errorInputClass,
          readOnly && readOnlyInputClass
        )}
      />
    </Field>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

function SelectField({ id, label, value, onChange, error }: SelectFieldProps) {
  return (
    <Field id={id} label={label} required error={error}>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          inputClass,
          "cursor-pointer",
          !value && "text-muted-foreground",
          error && errorInputClass
        )}
      >
        <option value="">Select a category</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </Field>
  );
}

type TextareaFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
};

function TextareaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
}: TextareaFieldProps) {
  return (
    <Field id={id} label={label} required={required} error={error}>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          inputClass,
          "h-auto min-h-32 resize-y py-3",
          error && errorInputClass
        )}
      />
    </Field>
  );
}

type SectionProps = {
  icon: IconType;
  title: string;
  children: ReactNode;
  className?: string;
};

function Section({ icon: Icon, title, children, className }: SectionProps) {
  return (
    <section
      aria-label={title}
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6",
        className
      )}
    >
      <h2 className="flex items-center gap-2 text-base font-semibold text-card-foreground">
        <Icon aria-hidden className="h-4 w-4 text-[#F97316]" />
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const AddNewStudioForm = ({
  owner: ownerProp,
  onSubmit,
}: AddNewStudioFormProps) => {

  const { data: session, isPending } = authClient.useSession();

  const owner: StudioOwner = {
    name: session?.user.name || "",
    email: session?.user.email || "",
  };

  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K]
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
    setFeedback(null);
  };

  const toggleAmenity = (amenity: Amenity) => {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity]
    );
    setFeedback(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFeedback({
        type: "error",
        message: "Please fix the highlighted fields before submitting.",
      });
      return;
    }

    setErrors({});
    setFeedback(null);
    setIsSubmitting(true);

    const studio: StudioSubmission = {
      title: values.title.trim(),
      category: values.category as StudioCategory,
      overview: values.overview.trim(),
      hourlyRate: Number(values.hourlyRate),
      securityDeposit: values.securityDeposit.trim()
        ? Number(values.securityDeposit)
        : null,
      maxCapacity: Number(values.maxCapacity),
      location: values.location.trim(),
      imageUrl: values.imageUrl.trim(),
      amenities: selectedAmenities,
      owner,
    };

    try {
      if (onSubmit) {
        await onSubmit(studio);
      }

      setFeedback({
        type: "success",
        message: onSubmit
          ? "Studio added successfully."
          : "Form is valid. Connect the studio API to publish this listing.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error
          ? error.message
          : "Unable to add your studio. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return <p>Loading user information...</p>;
  }

  if (!session?.user) {
    return <p>Please login to add a studio.</p>;
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-label="Add a new studio"
      className="space-y-6"
    >
      <Section icon={FiInfo} title="Basic Information">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <TextField
            id="studio-title"
            label="Studio Title"
            value={values.title}
            onChange={(value) => update("title", value)}
            placeholder="e.g. Sunlit Loft Photo Studio"
            required
            error={errors.title}
          />

          <SelectField
            id="studio-category"
            label="Category"
            value={values.category}
            onChange={(value) => update("category", value)}
            error={errors.category}
          />

          <div className="md:col-span-2">
            <TextareaField
              id="studio-overview"
              label="Detailed Overview"
              value={values.overview}
              onChange={(value) => update("overview", value)}
              placeholder="Describe the space and the productions it suits best."
              required
              error={errors.overview}
            />
          </div>
        </div>
      </Section>

      <Section icon={FiDollarSign} title="Pricing & Capacity">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <TextField
            id="studio-hourly-rate"
            label="Hourly Rate ($)"
            value={values.hourlyRate}
            onChange={(value) => update("hourlyRate", value)}
            type="number"
            placeholder="75"
            min="0.01"
            step="0.01"
            required
            error={errors.hourlyRate}
          />

          <TextField
            id="studio-security-deposit"
            label="Security Deposit ($) (optional)"
            value={values.securityDeposit}
            onChange={(value) => update("securityDeposit", value)}
            type="number"
            placeholder="150"
            min="0"
            step="0.01"
            error={errors.securityDeposit}
          />

          <TextField
            id="studio-capacity"
            label="Maximum Capacity"
            value={values.maxCapacity}
            onChange={(value) => update("maxCapacity", value)}
            type="number"
            placeholder="12"
            min="1"
            step="1"
            required
            error={errors.maxCapacity}
          />
        </div>
      </Section>

      <Section icon={FiMapPin} title="Location & Media">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <TextField
            id="studio-location"
            label="Location / Address"
            value={values.location}
            onChange={(value) => update("location", value)}
            placeholder="e.g. 24 Market Street, Downtown, Los Angeles"
            required
            error={errors.location}
          />

          <TextField
            id="studio-image-url"
            label="Studio Image URL"
            value={values.imageUrl}
            onChange={(value) => update("imageUrl", value)}
            type="url"
            placeholder="https://images.example.com/studio.jpg"
            required
            error={errors.imageUrl}
          />
        </div>
      </Section>

      <Section icon={FiTag} title="Amenities">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((amenity) => {
            const isSelected = selectedAmenities.includes(amenity);

            return (
              <label
                key={amenity}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  isSelected
                    ? "border-[#F97316] bg-[#F97316]/10 text-[#EA580C] dark:text-[#F97316]"
                    : "border-border text-muted-foreground hover:border-[#F97316]/50"
                )}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleAmenity(amenity)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                    isSelected
                      ? "border-[#F97316] bg-[#F97316] text-white"
                      : "border-input"
                  )}
                >
                  {isSelected && <FiCheck className="h-3 w-3" />}
                </span>
                {amenity}
              </label>
            );
          })}
        </div>
      </Section>

      <Section
        icon={FiUser}
        title="Owner Information"
        className="border-[#F97316]/25 bg-[#F97316]/5"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <TextField
            id="owner-name"
            label="Owner Name"
            value={session?.user.name || ""}
            readOnly
          />

          <TextField
            id="owner-email"
            label="Owner Email"
            value={session?.user.email || ""}
            type="email"
            readOnly
          />
        </div>
      </Section>

      {feedback && (
        <div
          role={feedback.type === "error" ? "alert" : "status"}
          className={cn(
            "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm",
            feedback.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          )}
        >
          {feedback.type === "success" ? (
            <FiCheckCircle aria-hidden className="h-4 w-4 shrink-0" />
          ) : (
            <FiAlertCircle aria-hidden className="h-4 w-4 shrink-0" />
          )}
          {feedback.message}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/studios"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/25"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#F97316] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#EA580C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/30 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <FiLoader
                aria-hidden
                className="h-4 w-4 animate-spin motion-reduce:animate-none"
              />
              Saving...
            </>
          ) : (
            <>
              <FiPlus aria-hidden className="h-4 w-4" />
              Add Studio
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddNewStudioForm;
