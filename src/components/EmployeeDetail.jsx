import { getByText } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getEmployee } from '../actions/action-creators';


function EmployeeDetail({getEmployee,employee}) {

    const { locId, ecode } = useParams();
   // const [employee, setEmployee] = useState();

    useEffect(() => {
        async function fetchEmployee() {
            let result = await getEmployee(locId, ecode);
            //setEmployee(result);
        }
        fetchEmployee();
    }, [locId, ecode]);


    return (<React.Fragment>
        {employee && createTable()}
    </React.Fragment>)

    function createTable() {
        return (

            /*  <div>
                 <h2>Employee Details for Location {locId} and Ecode {ecode} </h2>
                     {employee && <p>Name: {employee.Name}</p>}
                     {employee && <p>Employee Code: {employee.EmpCode}</p>}
                     {employee && <p>Designation: {employee.Designation}</p>}
                     {employee && <p>LocationID: {employee.LocationID}</p>}
                     {employee && <p>Location: {employee.Location}</p>}
                     {employee && <p>Department: {employee.Department}</p>}
                     {employee && <p>Age: {employee.Age}</p>}
     
             </div> */
            <Container>
                <Row>
                    <Col className="col-md-6 mx-auto">
                        <Table bordered striped hover>
                            <thead>
                                <tr>
                                    <th colSpan="2"><h3>Employee Details</h3></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{employee.Name}</td>
                                </tr>
                                <tr>
                                    <th>Employee Code</th>
                                    <td>{employee.EmpCode}</td>
                                </tr>
                                <tr>
                                    <th>Age</th>
                                    <td>{employee.Age}</td>
                                </tr>
                                <tr>
                                    <th>Department</th>
                                    <td>{employee.Department}</td>
                                </tr>
                                <tr>
                                    <th>Designation</th>
                                    <td>{employee.Designation}</td>
                                </tr>
                                <tr>
                                    <th>Location</th>
                                    <td>{employee.Location}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

        )
    }

}

function mapStateToProps(state){
    return{
        employee:state.employeeState.employee
    }
}

function mapDispatchToProps(dispatch){
    let actionMap={
        getEmployee
    }
    return bindActionCreators(actionMap,dispatch);

}

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeDetail);