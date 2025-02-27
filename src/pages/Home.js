import React, { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";
import EmployeeTable from "../components/EmployeeTable";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };

    loadEmployees();
  }, []);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />
      <EmployeeTable employees={filteredEmployees} />
    </div>
  );
};

export default Home;
