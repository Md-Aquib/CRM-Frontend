import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import leadsAPI from "../api/leadsAPI";
import AuthContext from "../context/AuthContext";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Leads() {
    const [leads, setLeads] = useState([]);
    const [stage1Leads, setStage1Leads] = useState([]);
    const [stage2Leads, setStage2Leads] = useState([]);
    const [stage3Leads, setStage3Leads] = useState([]);
    const [stage4Leads, setStage4Leads] = useState([]);
    const [stage5Leads, setStage5Leads] = useState([]);
    const [stage6Leads, setStage6Leads] = useState([]);

    const { authToken } = useContext(AuthContext);

    useEffect(() => {
        leadsAPI
            .getAllLeads(authToken)
            .then((data) => {
                setLeads(data.leads);
            })
            .catch((error) => {
                console.error("Error fetching leads:", error);
            });
    }, []);

    useEffect(() => {
        const stage1Leads = leads.filter((lead) => lead.stage === "NEW");
        const stage2Leads = leads.filter((lead) => lead.stage === "FOLLOW_UP");
        const stage3Leads = leads.filter((lead) => lead.stage === "VISIT");
        const stage4Leads = leads.filter(
            (lead) => lead.stage === "NEGOTIATION"
        );
        const stage5Leads = leads.filter((lead) => lead.stage === "WON");
        const stage6Leads = leads.filter((lead) => lead.stage === "LOST");

        const stage1TotalAmount = stage1Leads.reduce(
            (total, lead) => total + lead.leads_products.total_amount,
            0
        );
        const stage2TotalAmount = stage2Leads.reduce(
            (total, lead) => total + lead.leads_products.total_amount,
            0
        );
        const stage3TotalAmount = stage3Leads.reduce(
            (total, lead) => total + lead.leads_products.total_amount,
            0
        );
        const stage4TotalAmount = stage4Leads.reduce(
            (total, lead) => total + lead.leads_products.total_amount,
            0
        );
        const stage5TotalAmount = stage5Leads.reduce(
            (total, lead) => total + lead.leads_products.total_amount,
            0
        );
        const stage6TotalAmount = stage6Leads.reduce(
            (total, lead) => total + lead.leads_products.total_amount,
            0
        );

        const stage1LeadsDetails = {
            leads: stage1Leads,
            totalAmount: stage1TotalAmount,
        };
        const stage2LeadsDetails = {
            leads: stage2Leads,
            totalAmount: stage2TotalAmount,
        };
        const stage3LeadsDetails = {
            leads: stage3Leads,
            totalAmount: stage3TotalAmount,
        };
        const stage4LeadsDetails = {
            leads: stage4Leads,
            totalAmount: stage4TotalAmount,
        };
        const stage5LeadsDetails = {
            leads: stage5Leads,
            totalAmount: stage5TotalAmount,
        };
        const stage6LeadsDetails = {
            leads: stage6Leads,
            totalAmount: stage6TotalAmount,
        };

        setStage1Leads(stage1LeadsDetails);
        setStage2Leads(stage2LeadsDetails);
        setStage3Leads(stage3LeadsDetails);
        setStage4Leads(stage4LeadsDetails);
        setStage5Leads(stage5LeadsDetails);
        setStage6Leads(stage6LeadsDetails);
    }, [leads]);

    // Box
    const Box = ({ leadsDetails, stageID, stage }) => (
        <Card>
            <Card.Header>
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{stage}</h5>
                    <h5 className="lead-price">
                        &#8377; {leadsDetails.totalAmount}
                    </h5>
                </div>
                <Link
                    to={`/leads/create/${stageID}`}
                    className="btn btn-sm btn-primary"
                >
                    Create Leads
                </Link>
            </Card.Header>
            <Card.Body>
                {leadsDetails.leads?.map((lead) => (
                    <ListGroup key={lead.id}>
                        <ListGroupItem>
                            <strong className="fs-6">{lead.client_name}</strong>
                            <div className="d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faUser} width={9} />
                                <span>{lead.salesperson.name}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <strong>₹</strong>
                                <span>{lead.leads_products.total_amount}</span>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                ))}
            </Card.Body>
        </Card>
    );

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="publisher">
                <div className="d-flex justify-content-between">
                    <h4>Leads</h4>
                    <Link
                        className="btn btn-sm btn-primary"
                        to="/leads/create/1"
                    >
                        Create Leads
                    </Link>
                </div>

                <div className="card-list">
                    <Box leadsDetails={stage1Leads} stageID={1} stage={"New"} />
                    <Box
                        leadsDetails={stage2Leads}
                        stageID={2}
                        stage={"Follow-Up"}
                    />
                    <Box
                        leadsDetails={stage3Leads}
                        stageID={3}
                        stage={"Visit"}
                    />
                    <Box
                        leadsDetails={stage4Leads}
                        stageID={4}
                        stage={"Negotiation"}
                    />
                    <Box leadsDetails={stage5Leads} stageID={5} stage={"Won"} />
                    <Box
                        leadsDetails={stage6Leads}
                        stageID={6}
                        stage={"Lost"}
                    />
                </div>
            </div>
        </div>
    );
}

export default Leads;
