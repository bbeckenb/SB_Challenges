import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JobSearchForm from "./JobSearchForm";
import JoblyAPI from '../JoblyAPI';

function JobsList() {
  const [jobs, setJobs] = useState([]);

  async function getJobsList(query) {
    let jobsList = await JoblyAPI.getJobs(query);
    setJobs(jobsList);
    console.log(jobsList)
  }

  useEffect(() => {
    getJobsList();
  }, [])

    return (
        <div>
          <JobSearchForm filterJobs={getJobsList}/>
            {jobs.map(job => <JobCard key={job.id} id={job.id} title={job.title} salary={job.salary} equity={job.equity} company={job.companyName}/>)}
        </div>
    )
}

export default JobsList;