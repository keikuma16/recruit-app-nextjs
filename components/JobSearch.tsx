'use client'
import { useRouter, useSearchParams, usePathname } from "next/navigation"

export default function JobSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const CATEGORIES = ['事務', 'エンジニア', '営業', 'デザイン', 'マーケティング', '財務・経理', '人事', 'カスタマーサポート', '製造', '医療・介護']
    const currentCategories = searchParams.getAll('category');
    const currentSalary = searchParams.get('salary') || '0';
    
    const handleCategoryChange = (category:string) => {
       const params = new URLSearchParams(searchParams.toString());
       const categories = params.getAll('category');
       if(categories.includes(category)) {
        const newCategories = categories.filter(c => c !== category);
        params.delete('category');
        newCategories.forEach((c) => params.append('category', c));
        }else{
            params.append('category', category);
        }
        router.push(`${pathname}?${params.toString()}`);
    }

    const handleMinSalaryChange = (value: string) =>{
        const params = new URLSearchParams(searchParams.toString());
        if(value == '0'){
            params.delete('salary');
        }else{
            params.set('salary', value);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }
    
    return (
        <div>            
            <section>
                <h2 className="font-bold mb-4 border-b pb-2 text-black">求人カテゴリ</h2>
                <div className="space-y-2">
                {CATEGORIES.map(c => (
                    <label key={c} className="flex items-center gap-2 cursor-pointer text-black">
                        <input 
                        className="accent-slate-700" 
                        type="checkbox" 
                        checked={currentCategories.includes(c)}
                        onChange={() => handleCategoryChange(c)} 
                        />
                        {c}
                    </label>
                ))}
                </div>
            </section>
            <section>
                <h2 className="font-bold mb-4 border-b pb-2 text-black">年収</h2>
                <select
                className="w-full border border-slate-300 rounded p-2 " 
                onChange={(e) => handleMinSalaryChange(e.target.value)}
                value={currentSalary}
                >
                <option value="0" className="text-black">全選択</option>
                <option value="300" className="text-black">300万円以上</option>
                <option value="500" className="text-black">500万円以上</option>
                <option value="700" className="text-black">700万円以上</option>
                </select>
            </section>
        
        </div>
    )
}