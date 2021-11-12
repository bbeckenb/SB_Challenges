import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import CompanySearchForm from "./CompanySearchForm";
import JoblyAPI from '../JoblyAPI';




function CompanyList() {
  const [companies, setCompanies] = useState([]);
  
  async function getCompanyList(query) {
    let companyList = await JoblyAPI.getCompanies(query);
    setCompanies(companyList);
    console.log(companyList)
  }

  useEffect(() => {
    getCompanyList();
  }, [])

    return (
        <div>
          <CompanySearchForm filterCompanies={getCompanyList}/>
            {companies.map(company => <CompanyCard key={company.handle} name={company.name} handle={company.handle} description={company.description} numEmployees={company.numEmployees}/>)}
        </div>
    )
}

export default CompanyList;