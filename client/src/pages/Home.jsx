import BestSeller from "../components/home/bestSeller/BestSeller";
import BottomBanner from "../components/home/BottomBanner";
import Categories from "../components/home/Categories";
import MainBanner from "../components/home/MainBanner";
import NewsLetter from "../components/home/NewsLetter";

const Home = () => {
  return (
    <div className="mt-10">
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
