import JustStartedSection from "./components/home/JustStartedSection";
import JustFinishedSection from "./components/home/JustFinishedSection";
import UpcomingSection from "./components/home/UpcomingSection";
import HomeHeader from "./components/home/HomeHeader";

function App() {
  return (
    <div className="h-full w-full">
      <div className="bg-home-page-bg absolute left-0 top-0 z-0 flex h-[540px] w-full bg-cover bg-center bg-no-repeat"></div>
      <div className="z-1 relative flex w-full flex-col p-8 lg:p-12">
        <HomeHeader />
        <UpcomingSection />
        <JustStartedSection />
        <JustFinishedSection />
      </div>
    </div>
  );
}

export default App;
