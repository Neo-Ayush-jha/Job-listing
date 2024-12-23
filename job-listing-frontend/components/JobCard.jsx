import Link from "next/link";

const JobCard = ({ job }) => {
  return (
    <Link href={`/jobs/${job.id}`} passHref className="px-2xl"> 
      <div className="border rounded-lg shadow-sm p-4 mb-4 bg-white cursor-pointer hover:shadow-md transition ">
        <div className="flex items-center space-x-4">
          <img
            src={job.company_logo_url}
            alt={job.company_name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company_name}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            <p>{job.location}</p>
            <p>{job.employment_type}</p>
          </div>
          <p className="text-sm font-bold text-blue-500">{job.salary || "N/A"}</p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
