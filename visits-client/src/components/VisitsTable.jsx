import React from 'react';
import VisitsTableHeader from './VisitsTableHeader.jsx';
import VisitsTableData from './VisitsTableData.jsx';


export default function VisitTable(props) {
        return (
            <table className="w-3/4 mt-10 ml-auto mr-auto">
            <VisitsTableHeader />
                {props.visitors?.filter(v =>v.leavingDate === undefined).map((visitor, index) => (
                <VisitsTableData visitor={ visitor } />
                ))}
            </table>
        );
}