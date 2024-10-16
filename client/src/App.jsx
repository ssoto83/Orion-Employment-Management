import './App.css';
import { Outlet, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { useState } from 'react';

import Nav from './components/Nav';
import Dashboard from './pages/dashboard';
import EmployeeInfoPage from './pages/employeeInfoPage';
import EmployeesPage from './pages/employeesPage';
import LoginPage from './pages/loginPage';
import TimeOffPage from './pages/timeOffPage';

//Import Modals
import AddEmployeeModal from './components/addEmployeeModal';
import EmployeeCredModal from './components/employeeCredModal';


// Link to GraphQL
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql', 
})

// Apollo client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {

    const [isAddEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
    const [isEmployeeCredModalOpen, setEmployeeCredModalOpen] = useState(false);

   return (
    <ApolloProvider client={client}>
       <Router>
        <Nav/>
             
        <AddEmployeeModal
            isOpen={isAddEmployeeModalOpen}
            onClose={() =>setAddEmployeeModalOpen(false)}
        />

        <EmployeeCredModal
            isOpen={isEmployeeCredModalOpen}
            onClose={() =>setEmployeeCredModalOpen(false)}
        />

        <Outlet />
       </Router>
    </ApolloProvider>
  )
}

export default App;
