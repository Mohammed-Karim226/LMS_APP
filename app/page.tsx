import Dashboard from "@/components/dashboard/Dashboard";
export default async function Home({ searchParams }: SearchParams) {
  const filter = await searchParams;

  const topic = Array.isArray(filter.topic)
    ? filter.topic[0]
    : filter.topic || "";
  const subject = Array.isArray(filter.subject)
    ? filter.subject[0]
    : filter.subject || "";

  return <Dashboard topic={topic} subject={subject} />;
}
