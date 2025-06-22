import React from 'react'

function DoctorFilter({ nameFilter, setNameFilter, specialtyFilter, setSpecialtyFilter }) {
return (
    <div className="filters">
        <input
            type="text"
            placeholder="Filter by name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
        />
        <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
        >
            <option value="">All specialties</option>
            <option value="general">General</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="orthopedics">Orthopedics</option>
        </select>
    </div>
)
}

export default DoctorFilter