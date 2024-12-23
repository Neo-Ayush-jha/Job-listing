'use client';

import JobCard from '@/components/JobCard';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch job data from the backend API
    fetch('http://127.0.0.1:8000/api/jobs/')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Loading job listings...</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">No jobs found. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen  bg-slate-100">
      <div className="relative w-full h-[700px]">
        <Image
          src="/opportunity-image.png"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Opportunity is wherever you are</h1>
          <p className="mt-4 text-lg md:text-xl">We`&apos;`re connecting the best remote talent with the best remote companies.</p>
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">Browse jobs</button>
            <button className="bg-white text-blue-500 hover:text-blue-600 px-6 py-2 rounded-md">Post a job</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-10 px-[180px]">
        <h2 className="text-3xl font-bold mb-6 text-center">Available Jobs</h2>
        <div className="flex flex-col gap-4 px-xl">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}