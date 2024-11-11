import PortfolioMainNav from "../components/portfolio/PortfolioMainNav";
import PortfolioMainContainer from "../components/portfolio/PortfolioMainContainer";
import HeaderActions from "../components/common/HeaderActions";

const Portfolio = () => {
  return (
    <div className="flex h-auto w-full flex-col gap-4">
      <HeaderActions
        description="Manage all your auction activities in one place. View the auctions you have listed, keep an eye on those you are participating in, and check the status of any pending auctions. Stay organised and in control of your auction journey with ease. Happy bidding and selling!"
        title="Auction Portfolio"
        type="portfolio"
      />
      <PortfolioMainNav />
      <PortfolioMainContainer />
    </div>
  );
};

export default Portfolio;
