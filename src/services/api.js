export const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3001/employees");
      const data = await response.json();
      console.log("Funcionários carregados:", data); // Verificar no Console do Navegador
      return data;
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      return [];
    }
  };
  