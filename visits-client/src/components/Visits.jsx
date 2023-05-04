import React, { useState, useEffect } from 'react';
import VisitsTitle from './VisitsTitle';
import VisitsTable from './VisitsTable';
import axios from 'axios';
import Navbar from './Navbar';


export default function Visits() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [visitors, setVisitors] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('http://127.0.0.1:8001/api/visits', config)
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
        return(<div>Error: { error.message }</div>);
    } else if (!isLoaded) {
        return(<div>Loading...</div>);
    } else {
        return (
            <div className="m-10">
                <VisitsTitle visitorsCount={ visitors.length } />
                <VisitsTable visitors={ visitors } />
            </div>
        );
    }
}
