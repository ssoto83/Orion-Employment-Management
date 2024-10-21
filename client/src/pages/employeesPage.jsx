// import EmployeeSearch from "../components/employeeSearch";
import Auth from "../utils/auth";

const EmployeesPage = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    window.location.assign("/login");
  }
  const { data } = useQuery(GET_ME);
  const user = data?.me || {};
  return (
    <>
      {user?.role === "admin" ? (
        <EmployeeSearch />
      ) : (
        <p>Add employees minus modal</p>
      )}
    </>
    /*  <h1>emplyees page</h1> */
  );
};

export default EmployeesPage;
