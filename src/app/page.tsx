import BannerSection from "@/components/homeCompo/banner";
import CreatorSupport from "@/components/homeCompo/creatorSupport";
import HowBookingWorks from "@/components/homeCompo/howBookingWorks";

export default function Home() {
  return (
    <main>
      <BannerSection />
      <HowBookingWorks />
      <CreatorSupport />
    </main>
  );
}
