import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchTours } from "../redux/features/tourSlice";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Header = () => {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = user?.token;
  
    if (token) {
          const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
  };


  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "rgb(65, 70, 101)" }}>
        <MDBContainer>
            <MDBNavbarBrand href="/"style={{ color: "black", fontWeight: "600", fontSize: "22px" }}>
                Tour Pad
            </MDBNavbarBrand>
            <MDBNavbarToggler
                type="button"
                aria-expanded="false"
                aria-label="Toogle navigation"
                onClick={() => setShow(!show)}
                style={{ color: "#606080" }}
                >
                <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
            <MDBCollapse show={show} navbar>
                <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                    {user?.result?._id && (
                        <h5 style={{ marginRight: "30px", marginTop: "27px" ,color:"gray"}}>
                            Logged in as: <i className="fas fa-user-check"></i> {user?.result?.name}
                        </h5>
                    )}
                    <MDBNavbarItem>
                        <MDBNavbarLink href="/">
                            <p className="header-text"id="headicon">
                                <i className="fas fa-home"></i> Home
                            </p>
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    {user?.result?._id && (
                        <>
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/addTour">
                                    <p className="header-text"id="headicon">
                                    <i className="fas fa-pen-square"></i> Add Tour
                                    </p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/dashboard">
                                    <p className="header-text"id="headicon">
                                        <i className="fas fa-chart-line"></i>Dashboard
                                    </p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </>    
                        )}
                        {user?.result?._id ? (
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/login">
                                    <p id="headicon" className="header-text" onClick={() => handleLogout()}>
                                    <i className="fas fa-sign-out-alt"></i> LogOut
                                    </p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        ) : (
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/login">
                                    <p className="header-text"id="headicon">
                                    <i className="fas fa-sign-in-alt"></i> LogIn
                                    </p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        )}
                </MDBNavbarNav>
                <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Search Tour"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <div style={{ marginTop: "5px", marginLeft: "5px" }}>
                        <MDBIcon fas icon="search" />
                    </div>
                </form>
            </MDBCollapse>
        </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
