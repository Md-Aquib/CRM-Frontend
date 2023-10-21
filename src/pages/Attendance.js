import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import salespersonAPI from "../api/salesPersonAPI";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function Attendance() {
    let { authToken } = useContext(AuthContext);
    const [salesPersons, setsalesPersons] = useState([]);

    useEffect(() => {
        // Fetch salesperson when the component mounts
        salespersonAPI
            .getSalespersonByTeam(authToken)
            .then((data) => {
                setsalesPersons(data);
            })
            .catch((error) => {
                console.error("Error fetching Sales Person:", error);
            });
    }, [authToken]);

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="attendance">
                <div className="header d-flex justify-content-between">
                    <h4>Attendance</h4>
                </div>
                {/* Attendance Header */}
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h5>Name</h5>
                            </div>
                            <div className="col-6">
                                <h5>View Attendance</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body scroll-cards">
                        {salesPersons?.map((salesPerson) => (
                            <div
                                className="card"
                                id="detail-card"
                                key={salesPerson.id}
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <h6>{salesPerson.name}</h6>
                                        </div>
                                        <div className="col-6">
                                            <Link
                                                className="view-link"
                                                to={`/attendance/${salesPerson.id}`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    id="eye-icon"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Attendance;
