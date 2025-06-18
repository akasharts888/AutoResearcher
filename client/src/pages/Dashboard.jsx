import Navbar from "../components/Navbar";
import PlannerCard from "../components/SourceList";

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlannerCard />
        {/* Add more components like ResearcherCard, CriticCard */}
      </div>
    </div>
  );
};

export default Dashboard;
