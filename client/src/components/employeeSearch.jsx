import { useState, useEffect } from "react";
import { useQuery } from "react-router-dom";
import { GET_EMPLOYEES } from "../utils/queries";
/* import addEmployeeModal from './addEmployeeModal' */

const styles = {
  searched: {
    background: "#FBE802",
  },
};

const EmployeeSearch = () => {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const { data } = useQuery(GET_EMPLOYEES);
  let employeeArray = data?.employees;
  const [results, setResults] = useState(employeeArray || []);
  const [showModal,setShowModal] = useState(false)

  useEffect(() => {
    //if searchby is set to name set results to the data that includes the letters in that order in the name
    //if if searchby is set to employee id set results to the data that includes the characters in that order in the employee id
    //else ?
    if (!search.length) {
      setResults(employeeArray || []);
      employeeArray.forEach((employee) => {
        employee.isFirst = false;
        employee.isLast = false;
        employee.isId = false;
      });
      return;
    }
    let newResults;
    const pattern = new RegExp(String.raw`\b${search.trim()}`, "i");
    switch (searchBy) {
      case "name":
        newResults = employeeArray.filter(
          (employee) =>
            employee.lastFirst.match(pattern) ||
            employee.firstLast.match(pattern)
        );
        setResults(newResults);
        //go through results check firstname and lastname for the pattern once found remove the number of characters of the trimmed search
        //from the name and map on the html
        employeeArray.map((result) => {
          result.isFirst = false;
          result.isLast = false;
          const searchArray = search.trim().toLowerCase().split(" ");
          console.log(searchArray);
          searchArray.forEach((s) => {
            const searchChar = s.length;
            let compareFirst = "";
            let compareLast = "";
            for (let i = 0; i < searchChar; i++) {
              compareFirst += result.firstname[i];
              compareLast += result.lastname[i];
            }
            console.log(
              s,
              compareFirst.toLocaleLowerCase(),
              compareLast.toLowerCase()
            );
            if (compareFirst.toLowerCase() === s) {
              if (
                result.firstname.toLowerCase() === searchArray[0] &&
                search.includes(" ")
              ) {
                result.isFirst = true;
              } else {
                const splitFirstName = result.firstname.split("");
                const sansSearchFirst = [...splitFirstName].splice(searchChar);
                const searchFirst = [...splitFirstName].splice(0, searchChar);

                result.searchFirst = searchFirst.join("");
                result.sansSearchFirst = sansSearchFirst.join("");
                result.isFirst = true;
              }
            }
            if (compareLast.toLowerCase() === s) {
              if (
                result.lastname.toLowerCase() === searchArray[0] &&
                search.includes(" ")
              ) {
                result.isLast = true;
              } else {
                const splitLastName = result.lastname.split("");
                const sansSearchLast = [...splitLastName].splice(searchChar);
                const searchLast = [...splitLastName].splice(0, searchChar);
                (result.searchLast = searchLast.join("")),
                  (result.sansSearchLast = sansSearchLast.join("")),
                  (result.isLast = true);
              }
            }
          });
          return;
        });
        break;
      case "employee-id":
        newResults = employeeArray.filter((employee) =>
          employee.employeeId.match(pattern)
        );
        setResults(newResults);
        employeeArray.map((result) => {
          const searchChar = search.length;
          const splitId = result.employeeId.toLowerCase().split("");
          const sansSearchId = [...splitId].splice(searchChar);
          const searchId = [...splitId].splice(0, searchChar);
          return (
            (result.searchId = searchId.join("")),
            (result.sansSearchId = sansSearchId.join("")),
            (result.isId = true)
          );
        });
        break;
      default:
        newResults = employeeArray.filter(
          (employee) =>
            employee.lastFirst.match(pattern) ||
            employee.firstLast.match(pattern) ||
            employee.employeeId.match(pattern)
        );
        setResults(newResults);
        employeeArray.map((result) => {
          result.isFirst = false;
          result.isLast = false;
          result.isId = false;
          const searchArray = search.trim().toLowerCase().split(" ");
          searchArray.forEach((s) => {
            const searchChar = s.length;
            let compareFirst = "";
            let compareLast = "";
            let compareId = "";
            for (let i = 0; i < searchChar; i++) {
              compareFirst += result.firstname[i];
              compareLast += result.lastname[i];
              compareId += result.employeeId[i];
            }
            if (compareFirst.toLowerCase() === s) {
              if (
                result.firstname.toLowerCase() === searchArray[0] &&
                search.includes(" ")
              ) {
                result.isFirst = true;
              } else {
                const splitFirstName = result.firstname.split("");
                const sansSearchFirst = [...splitFirstName].splice(searchChar);
                const searchFirst = [...splitFirstName].splice(0, searchChar);

                result.searchFirst = searchFirst.join("");
                result.sansSearchFirst = sansSearchFirst.join("");
                result.isFirst = true;
              }
            }
            if (compareLast.toLowerCase() === s) {
              if (
                result.lastname.toLowerCase() === searchArray[0] &&
                search.includes(" ")
              ) {
                result.isLast = true;
              } else {
                const splitLastName = result.lastname.split("");
                const sansSearchLast = [...splitLastName].splice(searchChar);
                const searchLast = [...splitLastName].splice(0, searchChar);
                (result.searchLast = searchLast.join("")),
                  (result.sansSearchLast = sansSearchLast.join("")),
                  (result.isLast = true);
              }
            }
            if (compareId.toLowerCase() === s) {
              if (searchArray.length === 1) {
                const splitId = result.employeeId.split("");
                const sansSearchId = [...splitId].splice(searchChar);
                const searchId = [...splitId].splice(0, searchChar);

                (result.searchId = searchId.join("")),
                  (result.sansSearchId = sansSearchId.join("")),
                  (result.isId = true);
              }
            }
          });
          return;
        });
        break;
    }
  }, [search, searchBy]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSearchBy = (e) => {
    const { value } = e.target;
    setSearchBy(value);
  };

  return (
    <>
      <form id="employee-search">
        <select name="search-by" id="search-by" onChange={handleSearchBy}>
          <option value="">Search By</option>
          <option value="name">Name</option>
          <option value="employee-id">Employee ID</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          id="employee-search-bar"
          onChange={handleSearch}
        />
      </form>
      <form id="add-employee">
          <button id="add-employee-button" onClick={() => setShowModal(true)}>Add Employee</button>
      </form>
      <div id="results">
        <table id="results-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {results.map(
              ({
                _id,
                isFirst,
                isLast,
                searchFirst,
                searchLast,
                sansSearchFirst,
                sansSearchLast,
                firstname,
                lastname,
                employeeId,
                isId,
                searchId,
                sansSearchId,
              }) => {
                return (
                  <tr key={_id}>
                    <td>
                      {isLast ? (
                        <span id="lastname">
                          <span className="searched" style={styles.searched}>
                            {searchLast}
                          </span>
                          {sansSearchLast}
                        </span>
                      ) : (
                        lastname
                      )}
                      ,
                      {isFirst ? (
                        <span id="firstname">
                          <span className="searched" style={styles.searched}>
                            {searchFirst}
                          </span>
                          {sansSearchFirst}
                        </span>
                      ) : (
                        firstname
                      )}
                    </td>
                    <td>
                      {isId ? (
                        <span id="employeeId">
                          <span className="searched" style={styles.searched}>
                            {searchId}
                          </span>
                          {sansSearchId}
                        </span>
                      ) : (
                        employeeId
                      )}
                    </td>
                    <td>
                      <button id="edit-employee" onClick={() => setShowModal(true)}>Edit</button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
      {/* <addEmployeeModal showModal={showModal} setShowModal={setShowModal}/> */}
    </>
  );
};

export default EmployeeSearch;
