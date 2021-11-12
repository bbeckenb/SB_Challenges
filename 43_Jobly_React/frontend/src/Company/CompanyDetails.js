import React, { useEffect, useState } from "react";
import JobCard from "../Jobs/JobCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import JoblyAPI from "../JoblyAPI";
import { useParams } from "react-router";

function CompanyDetails() {
    const [company, setCompany] = useState({});
    const [isLoading, setLoading] = useState(true);
    // need to handle redirect if handle is not found
    const {handle} = useParams();
    
    useEffect(() => {async function getCompanyDetails() {
        let companyDetails = await JoblyAPI.getCompany(handle);
        setCompany(companyDetails)
        setLoading(false)
        console.log(companyDetails)
    }
    getCompanyDetails();
    }, [handle])

    console.log(company)

    if (isLoading) {
        return <p>Loading &hellip;</p>;
    }
    
    return (
        <Card>
            <CardBody>
                <CardTitle className="font-weight-bold text-center">{company.name}</CardTitle>
                <CardText className="font-italic">{company.description}</CardText>
                <p><i>Number of Employees: {company.numEmployees}</i></p>
                {company.jobs.map(job => <JobCard key={job.id} id={job.id} title={job.title} salary={job.salary} equity={job.equity} company={company.name}/>)}
            </CardBody>
        </Card>
    )
}

export default CompanyDetails;