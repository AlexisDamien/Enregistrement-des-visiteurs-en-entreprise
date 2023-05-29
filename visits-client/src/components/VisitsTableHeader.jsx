import React from 'react';

export default function VisitsHeader() {
    return (  
        <thead className="border-2 bg-gray-800 text-gray-200">
            <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Entreprise</th>
                <th>Motif</th>
                <th>Personne rencontrée</th>
                <th>Date entrée</th>
                <th>Date Sortie</th>
                <th></th>
            </tr>
        </thead>
    );
}