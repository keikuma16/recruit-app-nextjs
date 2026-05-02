import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";

const CATEGORIES = ['事務', 'エンジニア', '営業', 'デザイン', 'マーケティング', '財務・経理', '人事', 'カスタマーサポート', '製造', '医療・介護'];
export default function PostPage() {
    async function createJob(formData: FormData) {
        'use server';
        const title = formData.get('title') as string;
        const category = formData.get('category') as string;
        const salary = Number(formData.get('salary'));

        const { error } = await supabase
            .from('jobs')
            .insert({ title, category, salary });
        if (error) {
            console.error('求人の作成に失敗:', JSON.stringify(error, null, 2));
            throw error;
        }    
        redirect('/');
    }

    return (
        <div className="min-h-screen bg-gray-50 ">
            <header className="bg-slate-800 text-white p-4 shadow-md">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">求人検索アプリ</h1>
                    <Link href="/" className="hover:text-sky-300 trandition-colors">求人一覧</Link>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6 text-slate-800">求人投稿</h2>
                <form action={createJob} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 space-y-6">
                    <div>
                        <label htmlFor="category" className="text-sm font-bold text-gray-700 mb-2">求人カテゴリ選択</label>
                        <select 
                            id="category" 
                            name="category" 
                            required
                            defaultValue=""
                            className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-slate-400"
                        >
                        <option value="" disabled>
                            カテゴリを選択
                        </option>
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="salary" className="text-sm font-bold text-gray-700 mb-2">年収(万円)</label>
                        <input
                            type="number"
                            id="salary"
                            name="salary"
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="title" className="text-sm font-bold text-gray-700 mb-2">求人タイトル</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </div>
                    <div className="pt-4">
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors">
                            求人を投稿
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}