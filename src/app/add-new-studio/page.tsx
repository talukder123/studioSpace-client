'use client';
import AddNewStudioForm, { StudioSubmission } from "@/components/addNewStudio/addNewStudioForm";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const AddNewStudioPage = () => {

  const handleAddStudio = async (studio: StudioSubmission) => {
    const { data } = await authClient.token();

    if (!data?.token) throw new Error("Please login first.");

    const res = await fetch("http://localhost:8000/add-new-studio", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(studio),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed to add studio.");

    toast.success("Studio added successfully!");
};


  return (
    <main className="flex-1 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EA580C] dark:text-[#F97316]">
            Host with StudioSpace
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Add a new studio
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Share your space with creators, set your rates, and start receiving
            bookings.
          </p>
        </header>

        <div className="mt-8">
          <AddNewStudioForm onSubmit={handleAddStudio} />
        </div>
      </div>
    </main>
  );
};

export default AddNewStudioPage;