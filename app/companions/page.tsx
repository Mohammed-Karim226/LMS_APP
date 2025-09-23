import { AlertTriangle } from "lucide-react";
import { GetAllCompanions } from "@/lib/companion.actions";
import CompanionCards from "@/components/dashboard/CompanionCards/CompanionCards";
import { getSubjectColor } from "@/lib/utils";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;

  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const { companions, error } = await GetAllCompanions({ subject, topic });

  if (error) {
    return (
      <div className="mt-24 flex justify-center items-center">
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-red-300 bg-red-50 p-4 text-red-700 shadow-sm max-w-lg w-full">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <div>
            <p className="font-semibold">Failed to load companions</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }
const c = getSubjectColor(companions[0].name.toLowerCase())
console.log(c);

  return (
    <div className="mt-24">
      <div className="flex justify-center items-center flex-wrap gap-6 mt-4">
        {companions.map((companion) => (
          <CompanionCards
            key={companion.id}
            id={companion.id}
            title={companion.name}
            name={companion.subject}
            topic={companion.topic}
            duration={companion.duration}
            color={getSubjectColor(companion.name.toLowerCase())}
            isMarked={false}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanionsLibrary;
