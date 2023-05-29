import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import jwtDecode from "jwt-decode";


export default function User() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    if (!jwtDecode(token).roles.includes("ROLE_ADMIN")) {
      window.location.href = "/visits";
    }
    const decodedToken = jwtDecode(token);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState({
        email:"",
        roles:[],
        password:"",
    });
  
    const iduser = decodedToken.username;
    console.log(iduser);
  
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
                <form className="w-full text-center">
                    <h1 className="ml-20 mt-20 font-bold text-2xl pb-8">Modifier mot de passe :</h1>
                    <div className="sm:col-span-3 w-full ml-40">                       
                    {/* <input
                            type="password"
                            name="oldPassword"
                            id="oldPassword"
                            value={users.password}
                            placeholder="Ancien mot de passe"
                            autoComplete="email"
                            className="mb-2 ml-5 w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:ml-40 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                        /> */}
                           <input
                            type="password"
                            name="plainPassword"
                            id="plainPassword"
                            value={users.password}
                            placeholder="Nouveau mot de passe"
                            autoComplete="email"
                            className="mb-2 ml-5 w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:ml-40 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                        />
                        {/* <input
                            type="password"
                            name="plainPasswordVerify"
                            id="plainPasswordVerify"
                            value={users.password}
                            placeholder="Confirmer nouveau mot de passe"
                            autoComplete="email"
                            className="mb-2 ml-5 w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:ml-40 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                        /> */}
                        <br></br>
                        <button
                        type="submit"
                        onClick={handleSubmit}
                        className="ml-10 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Modifier
                        </button>
                    </div>
                </form>
            </>
        )
    }
    function  handleSubmit(event) {
        event.preventDefault();
        console.log(users);
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        let userId = decodedToken.id
        axios.get()
        axios.put("http://127.0.0.1:8000/api/users/"+userId, users, config)
          .then((response) => {
            console.log(response);
            window.location.reload();
          })
      }
      function handleChange(event) {
        event.persist();
        setUsers((Users) => ({
          ...setUsers,
          [event.target.name]: event.target.value,
        }));
      }
}