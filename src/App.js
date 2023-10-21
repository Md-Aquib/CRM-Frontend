import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Publishers from "./pages/Publishers";
import Salesperson from "./pages/Salesperson";
import Books from "./pages/Books";
import Leads from "./pages/Leads/Leads";
import Login from "./pages/Login";
import Location from "./pages/Location";
import CreatePublisher from "./pages/create/CreatePublisher";
import CreateLead from "./pages/Leads/CreateLead";
import CreateSalesperson from "./pages/create/CreateSalesperson";
import CreateBook from "./pages/create/createBook";
import ViewPublisher from "./pages/view/ViewPublisher";
import ViewSalesperson from "./pages/view/ViewSalesperson";
import ViewAccount from "./pages/view/viewAccount";
import Reports from "./pages/Reports";
import AuthContext from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";
import "./App.css";
import "./styles/sidebar.css";
import "./styles/Header.css";
import "./styles/home.css";
import "./styles/publisher.css";
import "./styles/leads.css";
import "./styles/login.css";
import "./styles/books.css";
import "./styles/salesperson.css";
import "./styles/attendance.css";
import "./styles/Expense.css";
import "./styles/account.css";
import "./styles/claim.css";
import "./styles/boards.css";
import "./styles/subject.css";
import "./styles/series.css";
import "./styles/sample.css";
import "./styles/utilities.css";
import "./styles/location.css";
import "./styles/report.css";
import "./styles/error.css";
import ViewAttendance from "./pages/view/viewAttendance";
import CreateAttendance from "./pages/create/CreateAttendance";
import Expense from "./pages/Expense";
import CreateExpense from "./pages/create/CreateExpense";
import Claim from "./pages/Claim";
import CreateClaim from "./pages/create/CreateClaim";
import Boards from "./pages/Boards";
import CreateBoards from "./pages/create/CreateBoards";
import Subject from "./pages/Subject";
import CreateSubject from "./pages/create/CreateSubject";
import Series from "./pages/Series";
import CreateSeries from "./pages/create/CreateSeries";
import CreateSample from "./pages/create/CreateSample";
import ViewLead from "./pages/Leads/ViewLead";
import ViewLocation from "./pages/view/ViewLocation";
import locationAPI from "./api/locationAPI";
import Error403 from "./pages/Error403";
import Attendance from "./pages/Attendance";

function App() {
    let {
        authToken,
        setLatitude,
        setLongitude,
        locationID,
        logoutUser,
        User_type,
        Team,
        setMessage,
    } = useContext(AuthContext);

    useEffect(() => {
        if (User_type === "salesperson" && Team === "SalesTeam") {
            const locationUpdateInterval = setInterval(() => {
                if ("geolocation" in navigator) {
                    console.log("Initiaing...");
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            setLatitude(latitude);
                            setLongitude(longitude);

                            const locationData = {
                                latitude: latitude,
                                longitude: longitude,
                            };

                            locationAPI.updateLocation(
                                locationID,
                                locationData,
                                authToken
                            );
                        },
                        (error) => {
                            // Handle location permission denied or errors
                            console.error("Error getting location:", error);
                            setMessage(
                                "Error getting location. Please enable location services."
                            );
                            logoutUser();
                        },
                        { enableHighAccuracy: true }
                    );
                } else {
                    console.error(
                        "Geolocation is not available in your browser."
                    );
                    setMessage("Geolocation is not available in your browser.");
                    logoutUser();
                }
            }, 5 * 60 * 1000);
        }
    }, []);

    // Custom functions to check user roles
    const isAdmin = () => {
        // Check if the user is an admin
        return User_type === "admin";
    };

    const isPublisher = () => {
        // Check if the user is a publisher
        return User_type === "publisher";
    };

    const isSalesperson = () => {
        // Check if the user is a salesperson
        return User_type === "salesperson";
    };

    const isAdmin_Publisher = () => {
        // Check if the user is an admin or a publisher
        return User_type === "admin" || User_type === "publisher";
    };

    const forAll = () => {
        // Check if the user is an admin or a publisher or salesperson.
        return (
            User_type === "admin" ||
            User_type === "publisher" ||
            User_type === "salesperson"
        );
    };

    return (
        <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
                {/* Home */}
                <Route
                    exact
                    path="/"
                    element={forAll() ? <Home /> : <Navigate to="/403" />}
                />

                {/* Manage Account */}
                <Route
                    exact
                    path="/manage-account"
                    element={
                        forAll() ? <ViewAccount /> : <Navigate to="/403" />
                    }
                />

                {/* Publisher Routes */}
                <Route
                    exact
                    path="/publishers"
                    element={
                        isAdmin() ? <Publishers /> : <Navigate to="/403" />
                    }
                />
                <Route
                    exact
                    path="/create/publisher"
                    element={
                        isAdmin() ? <CreatePublisher /> : <Navigate to="/403" />
                    }
                />
                <Route
                    exact
                    path="/publisher/view/:id"
                    element={
                        isAdmin() ? <ViewPublisher /> : <Navigate to="/403" />
                    }
                />

                {/* Salesperson Routes */}
                <Route exact path="/salesperson" element={<Salesperson />} />
                <Route
                    exact
                    path="/create/salesperson"
                    element={
                        isAdmin_Publisher() ? (
                            <CreateSalesperson />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />
                <Route
                    exact
                    path="/attendance"
                    element={forAll() ? <Attendance /> : <Navigate to="/403" />}
                />
                <Route
                    exact
                    path="/attendance/:id"
                    element={
                        forAll() ? <ViewAttendance /> : <Navigate to="/403" />
                    }
                />
                <Route
                    exact
                    path="/create/attendance"
                    element={
                        isSalesperson() ? (
                            <CreateAttendance />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />
                <Route
                    exact
                    path="/salesperson/view/:id"
                    element={
                        isAdmin_Publisher() ? (
                            <ViewSalesperson />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />

                {/* Books Routes */}
                <Route
                    exact
                    path="/books"
                    element={forAll() ? <Books /> : <Navigate to="/403" />}
                />

                <Route
                    exact
                    path="/create/book"
                    element={
                        isAdmin_Publisher() ? (
                            <CreateBook />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />

                <Route
                    exact
                    path="/update-book/:bookID"
                    element={
                        isAdmin_Publisher() ? (
                            <CreateBook />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />

                {/* Leads Routes */}
                <Route
                    exact
                    path="/leads"
                    element={forAll() ? <Leads /> : <Navigate to="/403" />}
                />

                <Route
                    path="/leads/create/:stageID"
                    element={forAll() ? <CreateLead /> : <Navigate to="/403" />}
                />

                <Route
                    path="/leads/view/:leadID"
                    element={forAll() ? <ViewLead /> : <Navigate to="/403" />}
                />

                {/* Travelling Expense */}
                <Route
                    exact
                    path="/travelling-expense"
                    element={forAll() ? <Expense /> : <Navigate to="/403" />}
                />

                <Route
                    exact
                    path="/create/travelling-expense"
                    element={
                        forAll() ? <CreateExpense /> : <Navigate to="/403" />
                    }
                />

                {/* Travelling Claim */}

                <Route
                    exact
                    path="/travelling-claim"
                    element={forAll() ? <Claim /> : <Navigate to="/403" />}
                />

                <Route
                    exact
                    path="/create/travelling-claim"
                    element={
                        forAll() ? <CreateClaim /> : <Navigate to="/403" />
                    }
                />

                {/* Boards */}

                <Route
                    exact
                    path="/boards"
                    element={
                        isAdmin_Publisher() ? (
                            <Boards />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />

                <Route
                    exact
                    path="/create/board"
                    element={
                        isAdmin_Publisher() ? (
                            <CreateBoards />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />

                <Route
                    exact
                    path="/update-board/:boardID"
                    element={
                        isAdmin_Publisher() ? (
                            <CreateBoards />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />

                {/* Subject */}
                <Route
                    exact
                    path="/subjects"
                    element={
                        isAdmin_Publisher() ? (
                            <Subject />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />
                <Route
                    exact
                    path="/create/subject"
                    element={
                        isAdmin_Publisher() ? (
                            <CreateSubject />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />
                <Route
                    exact
                    path="/update-subject/:subjectID"
                    element={
                        isAdmin_Publisher() ? (
                            <CreateSubject />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />

                {/* Series */}
                <Route
                    exact
                    path="/series"
                    element={
                        isAdmin_Publisher() ? (
                            <Series />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />

                <Route
                    exact
                    path="/create/series"
                    element={
                        isAdmin_Publisher() ? (
                            <CreateSeries />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />

                <Route
                    exact
                    path="/update-series/:seriesID"
                    element={
                        isAdmin_Publisher() ? (
                            <CreateSeries />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />

                {/* Sample */}

                <Route
                    exact
                    path="/create/sample"
                    element={
                        isAdmin_Publisher() ? (
                            <CreateSample />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />

                {/* Location */}
                <Route
                    exact
                    path="/track"
                    element={
                        isAdmin_Publisher() ? (
                            <Location />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />

                <Route
                    exact
                    path="/view/location/:id"
                    element={
                        isAdmin_Publisher() ? (
                            <ViewLocation />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />

                {/* Reports */}
                <Route
                    exact
                    path="/reports"
                    element={
                        isAdmin_Publisher() ? (
                            <Reports />
                        ) : (
                            <Navigate to="/403" />
                        )
                    }
                />

                {/* Errors */}
                <Route exact path="/403" element={<Error403 />} />
            </Route>
        </Routes>
    );
}

export default App;
