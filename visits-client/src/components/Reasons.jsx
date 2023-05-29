import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import jwtDecode from "jwt-decode";
import img from "../assets/delete.png";


export default function Reasons() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  if (!jwtDecode(token).roles.includes("ROLE_ADMIN")) {
    window.location.href = "/visits";
  }


  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newReasons, setNewReasons] = useState({
    reasonName:"",
  });
  const [reasons, setReasons] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.get("http://127.0.0.1:8000/api/reasons", config).then(
      (response) => {
        setIsLoaded(true);
        const reasons = response.data["hydra:member"];
        console.log(reasons);
        setReasons(reasons);
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
        <Navbar current="reasons" />
        <div className="m-10">
          <div>Error: {error.message}</div>
        </div>
      </>
    );
  } else if (!isLoaded) {
    return (
      <>
        <Navbar current="reasons" />
        <div className="m-10">
          <div>Loading...</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar current="reasons" />
        <form className="w-full">
          <h1 className="ml-20 mt-20 font-bold text-2xl pb-8">Saisie d'un nouveau motif de visite :</h1>
          <div className="sm:col-span-3 w-full ml-40">
            <label
              htmlFor="reasonName"
              className="text-sm font-semibold text-lg leading-6 text-gray-900"
            >
              Motif :
            </label>
            <input
              type="text"
              name="reasonName"
              id="reasonName"
              value={reasons.reasonName}
              placeholder="Ecrire un motif"
              autoComplete="motif"
              className="ml-5 w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:ml-40 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
            />
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
                <td>Motifs de visites</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {reasons.map((reason) =>(
                <tr>
                  <td className="pl-4 pb-2 font-semibold">{reason.reasonName}</td>
                  <td className="">
                    <button onClick={()=>handleDelete(reason.id)}><img src={img} width={15}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  function  handleSubmit(event) {
    event.preventDefault();
  
    console.log(reasons);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post("http://127.0.0.1:8000/api/reasons", newReasons, config)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
  }
  function handleChange(event) {
    event.persist();
    setNewReasons((newReasons) => ({
      ...newReasons,
      [event.target.name]: event.target.value,
    }));
  }
  function handleDelete(reasonId) {
  const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .delete("http://127.0.0.1:8000/api/reasons/"+reasonId, config)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
  }
}