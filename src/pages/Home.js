import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import leadsAPI from "../api/leadsAPI";
import AuthContext from "../context/AuthContext";
import { VictoryPie } from "victory";

function Home() {
    let { authToken } = useContext(AuthContext);

    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    // Daily Visits
    const [dailyVisit, setdailyVisit] = useState(null);
    const [school, setSchool] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [Bookshop, setBookshop] = useState([]);
    const [Coaching, setCoaching] = useState([]);
    const [Transporters, setTransporters] = useState([]);
    const [Banks, setBanks] = useState([]);
    const [Others, setOthers] = useState([]);

    const [schoolPercent, setSchoolPercent] = useState(0);
    const [teacherPercent, setTeacherPercent] = useState(0);
    const [bookshopPercent, setBookshopPercent] = useState(0);
    const [coachingPercent, setCoachingPercent] = useState(0);
    const [transportersPercent, setTransportersPercent] = useState(0);
    const [banksPercent, setBanksPercent] = useState(0);
    const [othersPercent, setOthersPercent] = useState(0);

    const [top_source, setTop_Source] = useState(null);
    const [src_email, setSrc_email] = useState([]);
    const [src_phone, setSrc_phone] = useState([]);
    const [src_web, setSrc_web] = useState([]);
    const [src_whatsapp, setSrc_whatsapp] = useState([]);
    const [src_direct, setSrc_direct] = useState([]);

    const [emailPercent, setemailPercent] = useState(0);
    const [phonePercent, setphonePercent] = useState(0);
    const [webPercent, setwebPercent] = useState(0);
    const [whatsappPercent, setwhatsappPercent] = useState(0);
    const [directPercent, setdirectPercent] = useState(0);

    useEffect(() => {
        setSchool([]);

        leadsAPI
            .getAllVisit(authToken)
            .then((data) => {
                setdailyVisit(data.length);
                const schoolVisits = data.filter(
                    (visit) => visit.visit_location === "Schools"
                );
                setSchool(schoolVisits);

                const teacherVisits = data.filter(
                    (visit) => visit.visit_location === "Teacher_Residence"
                );
                setTeacher(teacherVisits);

                const bookshopVisits = data.filter(
                    (visit) => visit.visit_location === "Bookshop_Dealers"
                );
                setBookshop(bookshopVisits);

                const coachingVisits = data.filter(
                    (visit) => visit.visit_location === "Coaching_Centers"
                );
                setCoaching(coachingVisits);

                const transportersVisits = data.filter(
                    (visit) => visit.visit_location === "Transporters"
                );
                setTransporters(transportersVisits);

                const bankVisits = data.filter(
                    (visit) => visit.visit_location === "Banks"
                );
                setBanks(bankVisits);

                const otherVisits = data.filter(
                    (visit) => visit.visit_location === "Others"
                );
                setOthers(otherVisits);
            })
            .catch((error) => {
                console.error("Error fetching visits:", error);
            });
    }, [authToken]);

    useEffect(() => {
        // Calculate the schoolPercent when school or dailyVisit changes
        if (dailyVisit > 0) {
            setSchoolPercent(((school.length / dailyVisit) * 100).toFixed(1));
            setTeacherPercent(((teacher.length / dailyVisit) * 100).toFixed(1));
            setBookshopPercent(
                ((Bookshop.length / dailyVisit) * 100).toFixed(1)
            );
            setCoachingPercent(
                ((Coaching.length / dailyVisit) * 100).toFixed(1)
            );
            setTransportersPercent(
                ((Transporters.length / dailyVisit) * 100).toFixed(1)
            );
            setBanksPercent(((Banks.length / dailyVisit) * 100).toFixed(1));
            setOthersPercent(((Others.length / dailyVisit) * 100).toFixed(1));
        }
    }, [school, dailyVisit]);

    // End Daily Visits

    // Top Leads and Top Source

    const [top5Leads, setTop5Leads] = useState([]);

    useEffect(() => {
        leadsAPI
            .getAllLeads(authToken)
            .then((data) => {
                // Top-Source
                setTop_Source(data.leads.length);

                const email = data.leads.filter(
                    (src) => src.source === "EMAIL"
                );
                setSrc_email(email);

                const phone = data.leads.filter(
                    (src) => src.source === "PHONE"
                );
                setSrc_phone(phone);

                const web = data.leads.filter((src) => src.source === "WEB");
                setSrc_web(web);

                const whatsapp = data.leads.filter(
                    (src) => src.source === "WHATSAPP"
                );
                setSrc_whatsapp(whatsapp);

                const direct = data.leads.filter(
                    (src) => src.source === "DIRECT"
                );
                setSrc_direct(direct);

                // Top 5 Leads
                const sortedLeads = data.leads.sort(
                    (leadA, leadB) => leadB.budget - leadA.budget
                );
                setTop5Leads(sortedLeads.slice(0, 10));
            })
            .catch((error) => {
                console.error("Error fetching leads:", error);
            });
    }, [authToken]);

    useEffect(() => {
        // Calculate the Percent when source changes
        if (top_source > 0) {
            setemailPercent(((src_email.length / top_source) * 100).toFixed(1));
            setphonePercent(((src_phone.length / top_source) * 100).toFixed(1));
            setwebPercent(((src_web.length / top_source) * 100).toFixed(1));
            setwhatsappPercent(
                ((src_whatsapp.length / top_source) * 100).toFixed(1)
            );
            setdirectPercent(
                ((src_direct.length / top_source) * 100).toFixed(1)
            );
        }
    }, [top_source]);

    // End Top Leads

    // Negotiations

    const [won, setWon] = useState(0);
    const [lost, setLost] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        leadsAPI
            .getAllLeads(authToken)
            .then((data) => {
                setTotal(data.leads.length);

                let wonCount = 0;
                let lostCount = 0;

                data.leads.forEach((lead) => {
                    if (lead.stage === "WON") {
                        wonCount++;
                    }
                    if (lead.stage === "LOST") {
                        lostCount++;
                    }
                });
                setWon(wonCount);
                setLost(lostCount);
            })
            .catch((error) => {
                console.error("Error fetching leads:", error);
            });
    }, [authToken]);

    const data = [
        { x: "Won", y: won / total },
        { x: "Lost", y: lost / total },
        { x: "No Result", y: (total - won - lost) / total },
    ];

    const filteredData = data.filter((item) => item.y !== 0);

    const colors = ["#36A2EB", "#FF6384", "#888888"];

    // End Negotiations

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="home">
                <div className="header d-flex justify-content-between">
                    <h4>Dashboard</h4>
                    <h5>{formattedDate}</h5>
                </div>

                <div className="dashboard">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="card mb-3">
                                <div className="card-header">Top Leads</div>
                                <div className="card-body top-leads-body">
                                    <div className="card-subtitle">
                                        <div className="row">
                                            <div className="col-4">
                                                <h6>Index</h6>
                                            </div>
                                            <div className="col-4">
                                                <h6>Name</h6>
                                            </div>
                                            <div className="col-4">
                                                <h6>Budget</h6>
                                            </div>
                                        </div>
                                    </div>
                                    {top5Leads?.map((lead, index) => (
                                        <div
                                            className="card-text"
                                            key={lead.id}
                                        >
                                            <div className="row" id="top-leads">
                                                <div className="col-4">
                                                    <h6>{index + 1}</h6>
                                                </div>
                                                <div className="col-4">
                                                    <h6>
                                                        {lead.salesperson.name}
                                                    </h6>
                                                </div>
                                                <div className="col-4">
                                                    <h6 id="budget">
                                                        ₹{lead.budget}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Negotiation */}

                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="card mb-3">
                                <div className="card-header">Negotiations</div>
                                <div className="card-body">
                                    <div className="card-subtitle top-leads-body">
                                        <div className="row">
                                            <div className="col-4 color-label">
                                                <div
                                                    className="color-box"
                                                    id="won"
                                                ></div>
                                                <h6>Won</h6>
                                            </div>
                                            <div className="col-4 color-label">
                                                <div
                                                    className="color-box"
                                                    id="lost"
                                                ></div>
                                                <h6>Lost</h6>
                                            </div>
                                            <div className="col-4 color-label">
                                                <div
                                                    className="color-box"
                                                    id="no_result"
                                                ></div>
                                                <h6>No Result</h6>
                                            </div>
                                        </div>
                                    </div>
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
                                </div>
                            </div>
                        </div>
                        {/* Daily Visits */}

                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="card mb-3">
                                <div className="card-header">Daily Visits</div>
                                <div className="card-body">
                                    <h6>School</h6>
                                    <div
                                        className="card-text progress"
                                        role="progressbar"
                                        aria-label="Example with label"
                                        aria-valuenow={schoolPercent}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${schoolPercent}%`,
                                            }}
                                        >
                                            {schoolPercent}%
                                        </div>
                                    </div>
                                    <h6 className="visit_location">
                                        Teacher Residence
                                    </h6>
                                    <div
                                        className="card-text progress"
                                        role="progressbar"
                                        aria-label="Example with label"
                                        aria-valuenow={teacherPercent}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${teacherPercent}%`,
                                            }}
                                        >
                                            {teacherPercent}%
                                        </div>
                                    </div>
                                    <h6 className="visit_location">
                                        Bookshop / Dealers
                                    </h6>
                                    <div
                                        className="card-text progress"
                                        role="progressbar"
                                        aria-label="Example with label"
                                        aria-valuenow={bookshopPercent}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${bookshopPercent}%`,
                                            }}
                                        >
                                            {bookshopPercent}%
                                        </div>
                                    </div>
                                    <h6 className="visit_location">
                                        Coaching Center
                                    </h6>
                                    <div
                                        className="card-text progress"
                                        role="progressbar"
                                        aria-label="Example with label"
                                        aria-valuenow={coachingPercent}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${coachingPercent}%`,
                                            }}
                                        >
                                            {coachingPercent}%
                                        </div>
                                    </div>
                                    <h6 className="visit_location">
                                        Transporters
                                    </h6>
                                    <div
                                        className="card-text progress"
                                        role="progressbar"
                                        aria-label="Example with label"
                                        aria-valuenow={transportersPercent}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${transportersPercent}%`,
                                            }}
                                        >
                                            {transportersPercent}%
                                        </div>
                                    </div>
                                    <h6 className="visit_location">Banks</h6>
                                    <div
                                        className="card-text progress"
                                        role="progressbar"
                                        aria-label="Example with label"
                                        aria-valuenow={banksPercent}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${banksPercent}%`,
                                            }}
                                        >
                                            {banksPercent}%
                                        </div>
                                    </div>
                                    <h6 className="visit_location">Others</h6>
                                    <div
                                        className="card-text progress"
                                        role="progressbar"
                                        aria-label="Example with label"
                                        aria-valuenow={othersPercent}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${othersPercent}%`,
                                            }}
                                        >
                                            {othersPercent}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Top Source */}

                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="card mb-3">
                                <div className="card-header">Top Source</div>
                                <div className="card-body">
                                    <h6>Email</h6>
                                    <div
                                        className="card-text progress"
                                        role="progressbar"
                                        aria-label="Example with label"
                                        aria-valuenow={emailPercent}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${emailPercent}%`,
                                            }}
                                        >
                                            {emailPercent}%
                                        </div>
                                    </div>
                                    <h6 className="visit_location">Phone</h6>
                                    <div
                                        className="card-text progress"
                                        role="progressbar"
                                        aria-label="Example with label"
                                        aria-valuenow={phonePercent}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${phonePercent}%`,
                                            }}
                                        >
                                            {phonePercent}%
                                        </div>
                                    </div>
                                    <h6 className="visit_location">Web</h6>
                                    <div
                                        className="card-text progress"
                                        role="progressbar"
                                        aria-label="Example with label"
                                        aria-valuenow={webPercent}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${webPercent}%`,
                                            }}
                                        >
                                            {webPercent}%
                                        </div>
                                    </div>
                                    <h6 className="visit_location">Whatsapp</h6>
                                    <div
                                        className="card-text progress"
                                        role="progressbar"
                                        aria-label="Example with label"
                                        aria-valuenow={whatsappPercent}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${whatsappPercent}%`,
                                            }}
                                        >
                                            {whatsappPercent}%
                                        </div>
                                    </div>
                                    <h6 className="visit_location">Direct</h6>
                                    <div
                                        className="card-text progress"
                                        role="progressbar"
                                        aria-label="Example with label"
                                        aria-valuenow={directPercent}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${directPercent}%`,
                                            }}
                                        >
                                            {directPercent}%
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

export default Home;
