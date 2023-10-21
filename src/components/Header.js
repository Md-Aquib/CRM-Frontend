import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleUser,
    faEllipsisV,
    faPlus,
    faUsers,
    faBook,
    faUserTie,
    faFilter,
    faClipboardUser,
    faBookBookmark,
    faPlane,
    faFile,
    faGraduationCap,
    faBookOpen,
    faBookAtlas,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Header() {
    let { logoutUser, Name, User_type, ID } = useContext(AuthContext);
    return (
        <div className="header">
            <nav className="navbar fixed-top">
                <div className="container-fluid d-flex">
                    <Link
                        className="navbar-brand"
                        style={{ backgroundColor: "transparent" }}
                        to="/"
                    >
                        CRM
                    </Link>
                    <div className="d-flex header-btn">
                        <div className="dropdown">
                            <button className="drop-toggle">
                                <div className="circle">
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        id="head-plus"
                                    />
                                </div>
                            </button>
                            <div className="dropdown-menu-1 justify-content-center">
                                <div className="row">
                                    <div className="col-4 cell d-flex flex-column align-items-center justify-content-center">
                                        <Link
                                            to="/leads/create/1"
                                            className="btn head-btn"
                                        >
                                            <FontAwesomeIcon
                                                icon={faFilter}
                                                className="head-icon"
                                            />
                                            <h6 className="text-muted">
                                                Leads
                                            </h6>
                                        </Link>
                                    </div>
                                    {(User_type === "admin" ||
                                        User_type === "publisher") && (
                                        <div className="col-4 cell d-flex flex-column align-items-center justify-content-center">
                                            <Link
                                                to="/create/salesperson"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faUsers}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Person
                                                </h6>
                                            </Link>
                                        </div>
                                    )}
                                    {(User_type === "admin" ||
                                        User_type === "publisher") && (
                                        <div className="col-4 cell d-flex flex-column align-items-center justify-content-center">
                                            <Link
                                                to="/create/book"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faBook}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Books
                                                </h6>
                                            </Link>
                                        </div>
                                    )}
                                    {User_type === "admin" && (
                                        <div className="col-4 cell d-flex flex-column align-items-center justify-content-center">
                                            <Link
                                                to="/create/publisher"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faUserTie}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Publisher
                                                </h6>
                                            </Link>
                                        </div>
                                    )}

                                    <div className="col-4 cell d-flex flex-column align-items-center justify-content-center">
                                        <Link
                                            to={
                                                User_type === "salesperson"
                                                    ? `/attendance/${ID}`
                                                    : "/attendance"
                                            }
                                            className="btn head-btn"
                                        >
                                            <FontAwesomeIcon
                                                icon={faClipboardUser}
                                                className="head-icon"
                                            />
                                            <h6 className="text-muted">
                                                Attendance
                                            </h6>
                                        </Link>
                                    </div>

                                    {(User_type === "admin" ||
                                        User_type === "publisher") && (
                                        <div className="col-4 cell d-flex flex-column align-items-center justify-content-center">
                                            <Link
                                                to="/create/sample"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faBookBookmark}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Sample
                                                </h6>
                                            </Link>
                                        </div>
                                    )}
                                    <div className="col-4 cell d-flex flex-column align-items-center justify-content-center">
                                        <Link
                                            to="/travelling-expense"
                                            className="btn head-btn"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlane}
                                                className="head-icon"
                                            />
                                            <h6 className="text-muted">
                                                Expense
                                            </h6>
                                        </Link>
                                    </div>
                                    <div className="col-4 cell d-flex flex-column align-items-center justify-content-center">
                                        <Link
                                            to="/travelling-claim"
                                            className="btn head-btn"
                                        >
                                            <FontAwesomeIcon
                                                icon={faFile}
                                                className="head-icon"
                                            />
                                            <h6 className="text-muted">
                                                Claim
                                            </h6>
                                        </Link>
                                    </div>
                                    {(User_type === "admin" ||
                                        User_type === "publisher") && (
                                        <div className="col-4 cell d-flex flex-column align-items-center justify-content-center">
                                            <Link
                                                to="/boards"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faGraduationCap}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Boards
                                                </h6>
                                            </Link>
                                        </div>
                                    )}
                                    {(User_type === "admin" ||
                                        User_type === "publisher") && (
                                        <div className="col-4 cell d-flex flex-column align-items-center justify-content-center">
                                            <Link
                                                to="/series"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faBookOpen}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Series
                                                </h6>
                                            </Link>
                                        </div>
                                    )}
                                    {(User_type === "admin" ||
                                        User_type === "publisher") && (
                                        <div className="col-4 cell d-flex flex-column align-items-center justify-content-center">
                                            <Link
                                                to="/subjects"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faBookAtlas}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Subject
                                                </h6>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="drop-toggle text-capitalize">
                                <FontAwesomeIcon
                                    icon={faCircleUser}
                                    id="user-icon"
                                />{" "}
                                &#160; Hello {Name !== null ? Name : "User"}
                                <FontAwesomeIcon
                                    icon={faEllipsisV}
                                    style={{ marginLeft: "10px" }}
                                />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="/manage-account">
                                        Manage Account
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="btn"
                                        onClick={logoutUser}
                                        style={{ paddingLeft: 0 }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
