import Dashboard from "@/components/dashboard/Dashboard";
import { GetAllCompanions } from "@/lib/companion.actions";

export default async function Home({ searchParams }: SearchParams) {
  const filter = await searchParams;

  const topic = filter.topic ? filter.topic : "";
  const subject = filter.subject ? filter.subject : "";

  const { companions, error } = await GetAllCompanions({ subject, topic });
  if (error) return;

  return <Dashboard companions={companions} />;
}
