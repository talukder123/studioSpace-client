import BannerSection from "@/components/homeCompo/banner";
import BrowseCategories from "@/components/homeCompo/browseCategories";
import CreatorSupport from "@/components/homeCompo/creatorSupport";
import FeaturedStudios from "@/components/homeCompo/featuredStudios";
import HowBookingWorks from "@/components/homeCompo/howBookingWorks";

export default function Home() {
  return (
    <main>
      <BannerSection />
      <FeaturedStudios />
      <BrowseCategories />
      <HowBookingWorks />
      <CreatorSupport />
    </main>
  );
}
