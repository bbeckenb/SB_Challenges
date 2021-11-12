import React, {useState} from 'react';
import {Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button} from 'reactstrap';

function JobSearchForm({filterJobs}) {
    const INIT_STATE = {title: '', minSalary:0, hasEquity:false}
    const [formData, setFormData] = useState(INIT_STATE);
    const [isChecked, setIsChecked] = useState(false);
    
    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData(currFormData => ({...currFormData, [name]: value}));
    };

    function handleChangeCheckBox() {
        setFormData(currFormData => ({...currFormData, hasEquity: !isChecked}))
        setIsChecked(!isChecked);
    }

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
        filterJobs(outputObj);
        setFormData(INIT_STATE);
        setIsChecked(false);
    }

    return (
        <section className="col-md-4">
          <Card>
            <CardBody>
              <CardTitle className="font-weight-bold text-center">
                Filter Jobs
              </CardTitle>
              <Form onSubmit={handleSubmit}>
                  <FormGroup>
                      <Label htmlFor="title">Includes Term:</Label>
                      <Input
                          id="title"
                          name="title"
                          placeholder="search term.."
                          value={formData.title}
                          onChange={handleChange}
                      />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="minSalary">Min Salary:</Label>
                      <Input
                          id="minSalary"
                          name="minSalary"
                          type="number"
                          placeholder="Minimum Employees"
                          value={formData.minSalary}
                          onChange={handleChange}
                      />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="hasEquity">Has Equity: </Label>
                      <Input
                          id="hasEquity"
                          name="hasEquity"
                          type="checkbox"
                          checked={isChecked}
                          value={formData.hasEquity}
                          onChange={handleChangeCheckBox}
                      />
                  </FormGroup>
                  <Button>Filter</Button>
              </Form>
            </CardBody>
          </Card>
        </section>
      );
}

export default JobSearchForm;