import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <a href="/" className="flex items-center space-x-2">
                        <div className="bg-purple-600 text-white w-8 h-8 flex items-center justify-center rounded-full">
                            R
                        </div>
                    </a>
                </div>
                <div className="flex items-center space-x-4">
                    <a href="/" className="flex items-center space-x-2">

                        <span className="text-2xl text-gray-800"><span className='font-bold'>remote</span>.com/jobs</span>
                    </a>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    <a href="/job-seekers" className="text-gray-600 hover:text-gray-800">For job seekers</a>
                    <a href="/employers" className="text-gray-600 hover:text-gray-800">For employers</a>
                    <a href="/pricing" className="text-gray-600 hover:text-gray-800">Pricing</a>
                    <a href="/post-job" className="text-blue-500 hover:bg-blue-300 px-3 py-2 rounded-full">+ Post a job</a>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 text-blue-500 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
                        Sign up
                    </button>
                    <button className="px-4 py-2 text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                        Log in
                    </button>
                </div>
            </div>
        </nav>
    );
};


export default Navbar