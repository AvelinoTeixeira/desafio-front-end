import React from "react";
import "../styles/employee.css";

const EmployeeCard = ({ employee }) => {
  return (
    <div className="employee-card">
      <img src={employee.image} alt={employee.name} />
      <h3>{employee.name}</h3>
      <p>{employee.job}</p>
      <p>Admissão: {new Date(employee.admission_date).toLocaleDateString()}</p>
      <p>📞 {employee.phone}</p>
    </div>
  );
};

export default EmployeeCard;
