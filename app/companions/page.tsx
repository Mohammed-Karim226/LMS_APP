import { AlertTriangle } from "lucide-react";
import { GetAllCompanions } from "@/lib/companion.actions";
import CompanionCards from "@/components/dashboard/CompanionCards/CompanionCards";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/dashboard/Filters/SearchInput";
import SubjectFilter from "@/components/dashboard/Filters/SubjectFilter";

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

  return (
    <div className="mt-28 flex flex-col justify-center items-center px-6 gap-2">
      <div className="flex flex-col justify-between w-full">
        <h2 className="font-bold text-3xl max-sm:text-2xl">
          Companion Library
        </h2>
        <div className="flex justify-center items-end gap-2 w-full max-sm:flex-col max-sm:items-start">
          <SearchInput onResultsChange={undefined} />
          <SubjectFilter />
        </div>
      </div>
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
