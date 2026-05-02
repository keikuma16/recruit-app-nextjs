export const dynamic = 'force-dynamic';
export const revalidate = 0;
import JobList from "@/components/JobList";
import JobSearch from "@/components/JobSearch";
import { supabase } from"@/lib/supabase";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const categories = resolvedParams.category
    ? Array.isArray(resolvedParams.category)
      ? resolvedParams.category
      : [resolvedParams.category]
    : [];
  const salary = resolvedParams.salary ? Number(resolvedParams.salary) : 0;
  let query = supabase.from('jobs').select('*');
  if (categories.length > 0) {
    query = query.in('category', categories);
  }
  if (salary > 0) {
    query = query.gte('salary', salary);
  }
  const { data: jobs } = await query;
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-800 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">求人検索アプリ</h1>
          <Link href="/post" className="hover:text-sky-300 transition-colors">求人投稿</Link>
        </div>
      </header>
      <main className="max-w-6xl mx-auto py-8 px-4  flex gap-8">
        <aside className="w-30 flex-shrink-0">
          <JobSearch/>
        </aside>

        <section className="flex-1 max-w-2xl">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-slate-800">求人一覧</h2>
            <p className="text-gray-500 font-medium">該当件数:{jobs?.length || 0}件</p>
          </div>
          <JobList jobs={jobs || []}/>
        </section>
      </main>
    </div>
  );
}
