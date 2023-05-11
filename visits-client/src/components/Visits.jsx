import React, { useState, useEffect } from 'react';
import VisitsTitle from './VisitsTitle';
import VisitsTable from './VisitsTable';
import axios from 'axios';
import Navbar from './Navbar';
import jwtDecode from 'jwt-decode';


export default function Visits() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [visitors, setVisitors] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('http://127.0.0.1:8000/api/visits', config)
            .then((response) => {
                            setIsLoaded(true);
                            const visitors = response.data['hydra:member'];
                            console.log(visitors);
                            setVisitors(visitors);
                        },
                        (error) => {
                            setIsLoaded(true);
                            setError(error);
                        });
    }, [])

    if (error) {
        return(
            <><Navbar current="./visits" />
            <div className='m-10'>
                Error: { error.message }
            </div>;
        </>
        );
    } else if (!isLoaded) {
        return(
            <>
                <Navbar current="./visits" />
                <div className='m-10'>Loading...</div>
            </>
        );
    } else {
        return (
            <>
                <Navbar current="./visits" />
                <div className="m-10">
                    <VisitsTitle visitorsCount={visitors.filter((v)=>v.leavingDate===undefined).length} />
                    <VisitsTable visitors={visitors} />
                </div>
            </>
        );
    }
}
