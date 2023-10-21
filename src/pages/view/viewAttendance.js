import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import attendanceAPI from "../../api/attendanceAPI";
import AuthContext from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";

function View_Attendance() {
    let { authToken, User_type, Team, ID } = useContext(AuthContext);
    const [attendance, setAttendance] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (User_type === "salesperson") {
            attendanceAPI
                .getAttendance(authToken, ID)
                .then((data) => {
                    setAttendance(data);
                })
                .catch((error) => {
                    console.error("Error fetching attendance:", error);
                });
        } else {
            attendanceAPI
                .getAttendance(authToken, id)
                .then((data) => {
                    setAttendance(data);
                })
                .catch((error) => {
                    console.error("Error fetching attendance:", error);
                });
        }
    }, [authToken, User_type, ID, id]);

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="attendance">
                <div className="header d-flex justify-content-between">
                    <h4>Attendance</h4>
                    {User_type === "salesperson" && Team === "SalesTeam" && (
                        <Link
                            className="btn btn-primary create-btn"
                            to="/create/attendance"
                        >
                            Mark Attendance
                        </Link>
                    )}
                </div>
                {/* Attendance Header */}
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h5>Date</h5>
                            </div>
                            <div className="col-6">
                                <h5>Attendance</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body scroll-cards">
                        {attendance?.map((attendance) => (
                            <div
                                className="card"
                                id="detail-card"
                                key={attendance.id}
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <h6>
                                                {attendance.date.split("T")[0]}
                                            </h6>
                                        </div>
                                        <div className="col-6">
                                            <h6>{attendance.attendance}</h6>
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

export default View_Attendance;
