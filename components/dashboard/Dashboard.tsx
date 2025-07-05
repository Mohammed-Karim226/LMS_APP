import CalledToAction from "./CompanionCards/CalledToAction";
import CompanionCards from "./CompanionCards/CompanionCards";
import CompletedLessonsTable from "./CompanionCards/CompletedLessonsTable";

const Dashboard = () => {
  return (
    <section className="flex flex-col justify-start items-start h-screen mt-20 bg-slate-50 gap-6 px-12 py-6 max-sm:px-4 mx-auto max-sm:items-center">
      <div className="flex justify-start items-start max-sm:w-full">
        <h1 className="font-bold text-3xl max-sm:text-2xl">Dashboard</h1>
      </div>
      <div className="flex flex-wrap justify-start items-start gap-6 max-sm:gap-4 max-sm:justify-center max-sm:items-center w-full">
        <CompanionCards
          id={`1`}
          title="Title"
          name="Subject Name"
          topic="Sample Topic"
          duration={30}
          color="E5D0FF"
        />
        <CompanionCards
          id={`2`}
          title="Title"
          name="Subject Name"
          topic="Sample Topic"
          duration={30}
          color="FFDA6E"
        />
        <CompanionCards
          id={`3`}
          title="Title"
          name="Subject Name"
          topic="Sample Topic"
          duration={30}
          color="BDE7FF"
        />
      </div>
      <div className="flex justify-between items-start w-full max-sm:flex-col max-xl:flex-col max-sm:items-start gap-6 mt-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start items-start flex-col gap-3 w-full px-4 py-3 rounded-2xl border border-black">
          <h1 className="font-bold text-3xl max-sm:text-xl">
            Recently completed lessons
          </h1>
          <CompletedLessonsTable />
        </div>
        <div className="flex justify-center items-center">
          <CalledToAction />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
