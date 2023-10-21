import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import leadsAPI from "../api/leadsAPI";
import CircularProgressChart from "../components/CircularProgressChart";
import { VictoryPie } from "victory";

function Reports() {
    let { authToken } = useContext(AuthContext);

    // Target Vs Achievements
    const [won, setWon] = useState(0);
    const [total, setTotal] = useState(0);
    const [wonPercent, setWonPercent] = useState(0);

    useEffect(() => {
        leadsAPI
            .getAllLeads(authToken)
            .then((data) => {
                setTotal(data.leads.length);

                const lead = data.leads.filter((item) => item.stage === "WON");
                setWon(lead.length);
            })
            .catch((error) => {
                console.error("Error fetching leads:", error);
            });
    }, [authToken]);

    useEffect(() => {
        const wonPercent = ((won / total) * 100).toFixed(1);
        setWonPercent(wonPercent);
    }, [won, total]);

    // End Target Vs Achievements

    // Revenue Vs Collections

    // useEffect(() => {
    //     first;
    // }, [authToken]);

    const data = [
        { x: "Revenue", y: 0.7 },
        { x: "Collections", y: 0.3 },
    ];

    const filteredData = data.filter((item) => item.y !== 0);

    const colors = ["#36A2EB", "#FF6384"];
    // End Revenue Vs Collections

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="report">
                <div className="header d-flex justify-content-between">
                    <h4>Report</h4>
                </div>

                <div className="report_board">
                    <div className="row">
                        {/* Targets Vs Achievements */}
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="card mb-3">
                                <div className="card-header">
                                    Targets Vs Achievements
                                </div>
                                <div className="card-body d-flex justify-content-between">
                                    <CircularProgressChart
                                        percentage={wonPercent}
                                    />
                                    <div className="report_text">
                                        <h6>Total Targets - {total}</h6>
                                        <h6>Achieved - {won}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Revnue Vs Collection */}
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="card mb-3">
                                <div className="card-header">
                                    Revenue Vs Collections
                                </div>
                                <div className="card-body d-flex justify-content-between">
                                    <VictoryPie
                                        data={filteredData}
                                        colorScale={colors}
                                        labels={({ datum }) =>
                                            `${datum.y * 100}%`
                                        }
                                        labelRadius={50}
                                        style={{
                                            labels: {
                                                fontSize: 16,
                                                fontWeight: "bold",
                                                fill: "white",
                                            },
                                        }}
                                    />
                                    <div className="report_text">
                                        <div className="color-label">
                                            <div
                                                className="color-box"
                                                id="label_color_rev"
                                            ></div>
                                            <h6>Revenue</h6>
                                        </div>
                                        <div className="color-label">
                                            <div
                                                className="color-box"
                                                id="label_color_coll"
                                            ></div>
                                            <h6>Collections</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;
