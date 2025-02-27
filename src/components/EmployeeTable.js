import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import '../styles/EmployeeTable.css';
import '../styles/MobileStyles.css';
import '../styles/SearchBar.css';

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/employees')
            .then(res => res.json())
            .then(data => {
                setEmployees(data);
                setFilteredEmployees(data);
            })
            .catch(error => console.error("Erro ao buscar dados:", error));
    }, []);

    const handleSearchChange = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
        const filtered = employees.filter(emp => {
            const search = newSearchTerm.toLowerCase();
            return (
                emp.name.toLowerCase().includes(search) ||
                emp.job.toLowerCase().includes(search) ||
                emp.phone.includes(search)
            );
        });
        setFilteredEmployees(filtered);
    };

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const formatPhoneNumber = (phone) => {
        const cleaned = ('' + phone).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return `+${match[1]} (${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone;
    };

    return (
        <div className="employee-container">
            <div className="header-content">
                <h1 className="employee-title">Funcionários</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="search-input"
                    />
                    <FaSearch className="search-icon" />
                </div>
            </div>
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>FOTO</th>
                        <th className="nome-Edit">NOME</th>
                        <th>CARGO</th>
                        <th>DATA DE ADMISSÃO</th>
                        <th>TELEFONE</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(emp => (
                        <tr key={emp.id}>
                            <td><img src={emp.image} alt={emp.name} className="table-image" /></td>
                            <td>{emp.name}</td>
                            <td>{emp.job}</td>
                            <td>{moment(emp.admission_date).format('DD/MM/YYYY')}</td>
                            <td>{formatPhoneNumber(emp.phone)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="accordion-container">
                {filteredEmployees.map((emp, index) => (
                    <div className="accordion" key={emp.id}>
                        <div
                            className={`accordion-header ${openIndex === index ? 'open' : ''}`}
                            onClick={() => toggleAccordion(index)}
                        >
                            <div className="header-left">
                                <img src={emp.image} alt={emp.name} className="employee-img" />
                                <span className="employee-name">{emp.name}</span>
                            </div>
                            <FaChevronDown className={`accordion-icon ${openIndex === index ? 'open' : ''}`} />
                        </div>
                        <div className={`accordion-body ${openIndex === index ? 'open' : ''}`}>
                            <div className="info-item">
                                <span>CARGO:</span> <p>{emp.job}</p>
                            </div>
                            <div className="info-item">
                                <span>DATA DE ADMISSÃO:</span> <p>{moment(emp.admission_date).format('DD/MM/YYYY')}</p>
                            </div>
                            <div className="info-item">
                                <span>TELEFONE:</span> <p>{formatPhoneNumber(emp.phone)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeTable;