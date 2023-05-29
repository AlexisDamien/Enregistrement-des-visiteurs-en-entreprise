import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import jwtDecode from "jwt-decode";
import img from "../assets/delete.png";

export default function Employees() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  if (!jwtDecode(token).roles.includes("ROLE_ADMIN")) {
    window.location.href = "/visits";
  }

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    firstname: "",
    lastname: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.get("http://127.0.0.1:8000/api/employees", config).then(
      (response) => {
        setIsLoaded(true);
        const employees = response.data["hydra:member"];
        console.log(employees);
        setEmployees(employees);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, []);

  if (error) {
    return (
      <>
        <Navbar current="employees" />
        <div className="m-10">
          <div>Error: {error.message}</div>
        </div>
      </>
    );
  } else if (!isLoaded) {
    return (
      <>
        <Navbar current="employees" />
        <div className="m-10">
          <div>Loading...</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar current="employees" />
        <form className="w-full">
          <h1 className="ml-20 mt-20 font-bold text-2xl pb-8">Saisie d'un nouvel employé :</h1>
          <div className="sm:col-span-3 w-full ml-40">
            <label
              htmlFor="firstname"
              className="text-sm font-medium leading-6 text-gray-900 mr-6"
            >
              Prénom :
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={newEmployee.firstname}
              autoComplete="givenname"
              className="mb-5 ml-5 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
            />
          </div>
          <div className="sm:col-span-3 w-full ml-40">
            <label
              htmlFor="lastname"
              className="text-sm font-medium leading-6 text-gray-900 mr-11"
            >
              Nom :
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={newEmployee.lastname}
              autoComplete="name"
              className="mb-5 ml-5 mr-5 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
            />
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Enregistrer
          </button>
          </div>
        </form>
        <div className="w-full">
          <table className="w-3/4 mt-10 ml-auto mr-auto">
            <thead className="border-2 bg-gray-800 text-gray-200">
              <tr>
                <td>Nom</td>
                <td>Prénom</td>
                <td>Suppr.</td>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr>
                  <td className="pl-4 pb-2 font-semibold">{employee.lastname}</td>
                  <td className="pl-4 pb-2 font-semibold">{employee.firstname}</td>
                  <td>
                      
                        <button onClick={()=>handleDelete(employee.id)}><img src={img} width={15}/></button>
                      
                    </td>           
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
  const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post("http://127.0.0.1:8000/api/employees", newEmployee, config)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
  }
  function handleChange(event) {
    event.persist();
    setNewEmployee((newEmployee) => ({
      ...newEmployee,
      [event.target.name]: event.target.value,
    }));
  }
  function handleDelete(employeeId) {
  const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .delete("http://127.0.0.1:8000/api/employees/"+employeeId, config)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
  }
}