import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import appAxios from "../utils/appAxios";
import { useDoctor } from "../context/DoctorContext";
import "./Dashboard.css";
function Dashboard() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token ,user} = useDoctor();

    useEffect(() => {
        fetchReservations();
        // eslint-disable-next-line
    }, []);

    const fetchReservations = () => {
        setLoading(true);
        appAxios
            .get("/reservations/", {
                headers: {
                    authorization: token,
                },
            })
            .then((res) => {
                if (res.data.status === "success") {
                    setReservations(res.data.data);
                } else {
                    toast.error("Failed to fetch reservations");
                }
                setLoading(false);
            })
            .catch((e) => {
                console.log(e.message);
                toast.error("Error fetching reservations");
                setLoading(false);
            });
    };

    const updateStatus = (id, status) => {
        appAxios
            .patch(
                `/reservations/${id}`,
                { status },
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
            .then((res) => {
                if (res.data.status === "success") {
                    toast.success("Status updated");
                    fetchReservations();
                } else {
                    console.log("Error updating status:", res.data.message);
                    toast.error("Failed to update status");
                }
            })
            .catch((e) => {
                console.log(e)
                toast.error("Error updating status");
            });
    };

    return (
        <div className="dashboard-container">
            <h2>Doctor {user?.name?.toUpperCase()}</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((res) => (
                            <tr key={res._id}>
                                <td>{res.patient.name}</td>
                                <td>{res.patient.email}</td>
                                <td>{res.patient.phone}</td>
                                <td>{new Date(res.date).toLocaleDateString()}</td>
                                <td>{res.time}</td>
                                <td>{res.status}</td>
                                <td>{res.notes}</td>
                                <td>
                                    <button
                                        onClick={() => updateStatus(res._id, "confirmed")}
                                        disabled={res.status === "confirmed"}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={() => updateStatus(res._id, "cancelled")}
                                        disabled={res.status === "cancelled"}
                                        style={{ marginLeft: 8 }}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Dashboard;
