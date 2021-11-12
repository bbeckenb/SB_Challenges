import React, {useState} from 'react';
import {Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button} from 'reactstrap';

function CompanySearchForm({filterCompanies}) {
    const INIT_STATE = {name: '', minEmployees:0, maxEmployees:0}
    const [formData, setFormData] = useState(INIT_STATE);
    
    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData(currFormData => ({...currFormData, [name]: value}));
    };

    function handleFilterCriteria(inputObj) {
      let outputObj = {};
      let values = Object.values(inputObj);
      let keys = Object.keys(inputObj);
      for (let idx in values) {
        if (values[idx] !== INIT_STATE[keys[idx]]) {
          outputObj[keys[idx]] = values[idx]
        }
      }
      return outputObj === {} ? undefined : outputObj;
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        let outputObj = handleFilterCriteria(formData);
        filterCompanies(outputObj);
        setFormData(INIT_STATE);
    }

    return (
        <section className="col-md-4">
          <Card>
            <CardBody>
              <CardTitle className="font-weight-bold text-center">
                Filter Companies
              </CardTitle>
              <Form onSubmit={handleSubmit}>
                  <FormGroup>
                      <Label htmlFor="name">Includes Term:</Label>
                      <Input
                          id="name"
                          name="name"
                          placeholder="search term.."
                          value={formData.name}
                          onChange={handleChange}
                      />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="minEmployees">Min Employees:</Label>
                      <Input
                          id="minEmployees"
                          name="minEmployees"
                          type="number"
                          placeholder="Minimum Employees"
                          value={formData.minEmployees}
                          onChange={handleChange}
                      />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="maxEmployees">Max Employees:</Label>
                      <Input
                          id="maxEmployees"
                          name="maxEmployees"
                          type="number"
                          placeholder="Maximum Employees"
                          value={formData.maxEmployees}
                          onChange={handleChange}
                      />
                  </FormGroup>
                  <Button>Filter</Button>
              </Form>
            </CardBody>
          </Card>
        </section>
      );
}

export default CompanySearchForm;