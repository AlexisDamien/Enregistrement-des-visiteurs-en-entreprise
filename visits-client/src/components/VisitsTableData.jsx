import React, { useState, useEffect } from "react";
import axios from "axios";

export default function VisitsTableData(props) {
    const dayjs = require('dayjs');
    var utc = require('dayjs/plugin/utc');
    var timezone = require('dayjs/plugin/timezone');
    dayjs.extend(utc);
    dayjs.extend(timezone);
    var a = dayjs().tz("Europe/Paris");
    const [newVisit, setNewVisit] = useState({
      leavingDate: a,
    });  
  return (
    <>
        <tr key={props.visitor.id}>
          <td className="pl-6 pb-2 font-semibold">{props.visitor.firstname}</td>
          <td className="pl-6 pb-2 font-semibold">{props.visitor.lastname}</td>
          <td className="pl-6 pb-2 font-semibold">{props.visitor.company}</td>
          <td className="pl-6 pb-2 font-semibold">{props.visitor.reason.reasonName}</td>
          <td className="pl-6 pb-2 font-semibold">{props.visitor.encouteredPerson.firstname} {props.visitor.encouteredPerson.lastname}</td>
          <td className="pl-6 pb-2 font-semibold">{dayjs(props.visitor.entranceDate).format('DD/MM/YY HH:mm')}</td>
          <td className="pl-6 pb-2 font-semibold">{dayjs(props.visitor.leavingDate).format('DD/MM/YY HH:mm')}</td>
          <td><button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sortie</button></td>
        </tr>
      </>
  );

  function handleClick(e) {
    e.preventDefault();
    console.log(props.visitor);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const newVisit = {
      leavingDate: dayjs(),
    };
    console.log(newVisit);
    axios
      .put(`http://127.0.0.1:8000/api/visits/${props.visitor.id}`, newVisit, config)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
  }
}