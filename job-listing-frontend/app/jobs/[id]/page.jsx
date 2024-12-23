import Link from 'next/link';
import JobDetails from "@/components/JobDetails";

const JobDetailPage = async ({ params }) => {
    let jobData;
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/jobs/${params.id}`);
        jobData = await response.json();
    } catch (error) {
        console.error("Error fetching job:", error);
        jobData = null;
    }

    if (!jobData) {
        return (
            <div className="text-center text-gray-500 mt-10">
                <p>Job not found.</p>
            </div>
        );
    }

    return (
        <>
            <div className='flex flex-col p-10'>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black">Manage Job (1)</h2>
                    <Link href="/" className='bg-teal-600 text-white px-3 py-2 rounded'>
                        Show All Jobs
                    </Link>
                </div>
                <div className="flex flex-col mt-5">
                    <JobDetails job={jobData} />
                </div>
            </div>
        </>
    );
}

export default JobDetailPage;
