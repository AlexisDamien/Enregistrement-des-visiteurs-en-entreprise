import React from 'react';
import VisitsTitle from './VisitsTitle.jsx';
import VisitsTable from './VisitsTable.jsx';

export default function Visits() {
    const visitors = ['Alexis','Sacha','Titouan']
    return(
        <div>
            <VisitsTitle visitorsCount={ visitors.length } />  
            <VisitsTable visitors={ visitors } />
        </div>
    );
}
