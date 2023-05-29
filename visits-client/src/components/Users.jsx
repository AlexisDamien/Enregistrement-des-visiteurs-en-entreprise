import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import img from "../assets/delete.png";
import axios from "axios";
import jwtDecode from "jwt-decode";


export default function Users() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    if (!jwtDecode(token).roles.includes("ROLE_ADMIN")) {
      window.location.href = "/visits";
    }
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newUsers, setNewUsers] = useState({
      email:"",
      roles:[],
      password:"",
    });
    const [users, setUsers] = useState([]);
  
  
    useEffect(() => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('http://127.0.0.1:8000/api/users', config)
            .then((response) => {
                            setIsLoaded(true);
                            const visitors = response.data['hydra:member'];
                            console.log(visitors);
                            setUsers(visitors);
                        },
                        (error) => {
                            setIsLoaded(true);
                            setError(error);
                        });
    }, [])

    if (error) {
        return(
            <><Navbar current="./users" />
            <div className='m-10'>
                Error: { error.message }
            </div>;
        </>
        );
    } else if (!isLoaded) {
        return(
            <>
                <Navbar current="./users" />
                <div className='m-10'>Loading...</div>
            </>
        );
    } else {
        return (
            <>
                <Navbar current="./users" />
                <form className="w-full">
                    <h1 className="ml-20 mt-20 font-bold text-2xl pb-8">Saisie d'un nouvel Utilisateur :</h1>
                    <div className="sm:col-span-3 w-full ml-40">
                        <label
                            htmlFor="email"
                            className="text-sm font-semibold text-lg leading-6 text-gray-900"
                        >
                        Email :
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={users.email}
                            placeholder="Ecrire un email"
                            autoComplete="email"
                            className="ml-5 w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:ml-40 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                        /><br></br>
                        <label
                        htmlFor="password"
                        className="text-sm font-semibold text-lg leading-6 text-gray-900"
                        >
                        Mot de passe :
                        </label>
                        <input
                            type="password"
                            name="plainPassword"
                            id="plainPassword"
                            value={users.password}
                            placeholder="Ecrire un email"
                            autoComplete="email"
                            className="ml-5 w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:ml-40 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                        />
                        <select name="roles" id="roles" onChange={handleChangeSelect}>
                            <option value="">Choisir un rôle</option>
                            <option value="ROLE_ADMIN">Admin</option>
                            <option value="ROLE_USER">User</option>
                        </select>
                        <button
                        type="submit"
                        onClick={handleSubmit}
                        className="ml-10 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Enregistrer
                        </button>
                    </div>
                </form>
                <div className="w-full">
                    <table className="w-3/4 mt-10 ml-auto mr-auto">
                        <thead className="border-2 bg-gray-800 text-center text-gray-200">
                            <tr>
                                <td className="pl-4 pb-2 font-semibold">Email</td>
                                <td className="pl-4 pb-2 font-semibold">Rôle</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr>
                                    <td>{user.email}</td>
                                    <td>{user.roles}</td>
                                    <button onClick={()=>handleDelete(user.id)}><img src={img} width={15}/></button>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    function  handleSubmit(event) {
        event.preventDefault();
        console.log(newUsers);
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        axios.post("http://127.0.0.1:8000/api/users", newUsers, config)
          .then((response) => {
            console.log(response);
            window.location.reload();
          })
      }
      function handleChange(event) {
        event.persist();
        setNewUsers((newUsers) => ({
          ...newUsers,
          [event.target.name]: event.target.value,
        }));
      }

      function handleChangeSelect(event) {
        event.persist();
        setNewUsers((newUsers) => ({
          ...newUsers,
          [event.target.name]: [event.target.value],
        }));
      }
      function handleDelete(UserId) {
        const token = localStorage.getItem("token");
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          axios
            .delete("http://127.0.0.1:8000/api/users/"+UserId, config)
            .then((response) => {
              console.log(response);
              window.location.reload();
            })
        }
      }
