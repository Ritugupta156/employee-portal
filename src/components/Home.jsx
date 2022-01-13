import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getEmployees } from "../services/employee-services";
import EmployeeList from "./EmployeeList";
import SearchBar from "./SearchBar";

export const EmployeeContext=React.createContext();

class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            employees : props.employees,
            filteredResult:props.employees
        }
        this.handleSearch=this.handleSearch.bind(this);
        //console.log(this.state);

    }


    //lifecycle method called automatically after constructor
    static getDerivedStateFromProps(newProps,state){
        if (newProps.employees.length != state.employees.length){
            return {
                employees:newProps.employees,
                filteredResult:newProps.employees
            }
        }
       return null;
    }

    async componentDidMount(){
        /* let employees=await getEmployees()
            .catch(err=>console.log("Error in loading response data"));
        this.setState({employees,filteredResult:employees}); */
        }


    handleSearch(searchText){
        if(searchText && searchText.length>0){
            searchText=searchText.toUpperCase();
            let filteredResult=this.state.employees.filter((item)=>item.Name.toUpperCase().indexOf(searchText) >=0||item.Location.toUpperCase().indexOf(searchText) >=0)
            this.setState({filteredResult})
        }else{
            this.setState({filteredResult:this.state.employees})
        }
    }

    render() {
        return <EmployeeContext.Provider value={{employees:this.state.employees,data:this.state.filteredResult,doSearch:this.handleSearch}}>
        <Container>
            <Row>
                <Col>
                   <h2> Employee List</h2>
                   <SearchBar doSearch={this.handleSearch}/>
                   <EmployeeList />
                </Col>
            </Row>
        </Container>
        </EmployeeContext.Provider>
    }
}

function mapStateToProps(state){
    return{
    employees:state.employeeState.employees
    }
}

/* function mapDispatchToProps(dispatch){

} */

export default connect(mapStateToProps)(Home);