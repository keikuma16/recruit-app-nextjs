import { Job } from '@/types/job';
interface JobListProps {
    jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
    return (
        <div>    
            <main className="flex-1">
                <div className="space-y-4">
                    {jobs.map(job => (
                        <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                            <div className="text-gray-600 space-y-1">
                            <p>カテゴリ:{job.category}</p>
                            <p>年収:{job.salary}万円</p>
                        </div>
                </div>
                    ))}
                </div>
            </main>
        </div>
    )
}