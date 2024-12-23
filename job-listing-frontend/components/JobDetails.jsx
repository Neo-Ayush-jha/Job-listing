import React from 'react';
import { MapPin, Briefcase, Globe } from 'lucide-react';

const JobDetails = ({ job }) => {
    if (!job) {
        return (
            <p className="text-center text-gray-500 mt-10">Loading job details...</p>
        );
    }

    let workplaceTypes = [];
    if (job.workplace_types) {
        try {
            workplaceTypes = JSON.parse(job.workplace_types.replace(/'/g, '"'));
        } catch (error) {
            console.error("Failed to parse workplace_types:", error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <img
                        src={job.company_logo_url || "/default-logo.png"}
                        alt={job.company_name || "Company Logo"}
                        height={16}
                        width={16}
                        className="w-16 h-16 rounded-full"
                    />
                    <h1 className="text-3xl font-bold text-gray-800">
                        {job.title || "Job Title Not Available"}
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
                        {job.company_name || "Company Name Not Available"}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <div className="text-center">
                    <Globe className="mx-auto text-gray-500 mb-2" />
                    <p className="text-sm text-gray-500">Workplace</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {workplaceTypes.length > 0 ? workplaceTypes.join(", ") : "Not Specified"}
                    </p>
                </div>
                <div className="text-center">
                    <MapPin className="mx-auto text-gray-500 mb-2" />
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {job.location || "Location Not Available"}
                    </p>
                </div>
                <div className="text-center">
                    <Briefcase className="mx-auto text-gray-500 mb-2" />
                    <p className="text-sm text-gray-500">Employment Type</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {job.employment_type || "Not Specified"}
                    </p>
                </div>
            </div>

            <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">The Opportunity</h2>
                <p className="text-gray-700 leading-relaxed">
                    {job.summary || "No description available."}
                </p>
            </section>

            <div className="flex justify-center mt-8">
                {job.apply_link ? (
                    <a
                        href={job.apply_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Apply Now
                    </a>
                ) : (
                    <p className="text-gray-500">Apply link not available.</p>
                )}
            </div>
        </div>
    );
};

export default JobDetails;
