import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import Select from "react-select";
import {
  locationOptions,
  experienceOptions,
  BasepayOptions,
  groupedOptions,
} from "./data.ts";

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [isDataEnd, setIsDataEnd] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const roleFilter = useRef([]);
  const experienceFilter = useRef(null);
  const locationFilter = useRef([]);
  const basePayFilter = useRef(null);
  const searchFilter = useRef("");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    let offset = page * 9;
    if (offset > totalItems) {
      setIsDataEnd(true);
      setIsLoading(false);
      window.removeEventListener("scroll", handleScroll);
      return;
    }
    const body = JSON.stringify({
      limit: 9,
      offset: offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: body,
    };

    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      const data = await response.json();
      setItems((prevItems) => {
        return [...prevItems, ...data.jdList];
      });

      setTotalItems(data.totalCount);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  useEffect(() => {
    combinedFilter();
  }, [items]);

  const combinedFilter = () => {
    const roleArray = roleFilter.current;
    const experience = experienceFilter.current;
    const locationArray = locationFilter.current;
    const basePay = basePayFilter.current;
    const searchKeyword = searchFilter.current;

    let newItem = items;
    if (roleArray.length !== 0) {
      console.log("a");
      const selectedLabels = roleArray.map((item) => item.label.toLowerCase());
      newItem = newItem.filter((newVal) => {
        return selectedLabels.includes(newVal.jobRole.toLowerCase());
      });
    }
    if (experience) {
      console.log("b");
      newItem = newItem.filter((newVal) => {
        return (
          experience.value >= newVal.minExp && experience.value <= newVal.maxExp
        );
      });
    }
    if (locationArray.length !== 0) {
      console.log("c");
      const selectedLabels = locationArray.map((item) =>
        item.label.toLowerCase()
      );
      let tempItems = [];
      if (selectedLabels.includes("remote")) {
        newItem.filter((newVal) => {
          if (newVal.location.toLowerCase() === "remote") {
            tempItems.push(newVal);
          }
        });
      }
      if (selectedLabels.includes("in-office")) {
        console.log("d");
        newItem.filter((newVal) => {
          if (newVal.location.toLowerCase() !== "remote") {
            tempItems.push(newVal);
          }
        });
      }

      newItem = [...tempItems];
    }
    if (basePay) {
      console.log("e");
      newItem = newItem.filter((newVal) => {
        return newVal.minJdSalary >= basePay.value;
      });
    }

    if (searchKeyword.length !== 0) {
      console.log("f");
      newItem = newItem.filter((newVal) => {
        return newVal.companyName
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());
      });
    }

    setFilteredItems(newItem);
  };

  const filterRole = (e) => {
    roleFilter.current = e;
    combinedFilter();
  };

  const filterExperinece = (e) => {
    experienceFilter.current = e;
    combinedFilter();
  };

  const filterLocation = (e) => {
    locationFilter.current = e;
    combinedFilter();
  };

  const filterBasePay = (e) => {
    basePayFilter.current = e;
    combinedFilter();
  };

  const search = (e) => {
    searchFilter.current = e;
    combinedFilter();
  };

  const styles = {
    container: (base) => ({
      ...base,
      minWidth: "200px",
    }),
  };

  return (
    <div className="App">
      <h1 className="col-12 text-center my-3 fw-bold">Search Job</h1>
      <div className="filters">
        <Select
          styles={styles}
          isMulti
          name="roles"
          options={groupedOptions}
          className="basic-multi-select"
          classNamePrefix="role"
          placeholder="Roles"
          onChange={(e) => filterRole(e)}
        />
        <Select
          styles={styles}
          name="location"
          options={experienceOptions}
          className="basic-multi-select"
          classNamePrefix="experience"
          placeholder="Experience"
          onChange={(e) => filterExperinece(e)}
        />
        <Select
          styles={styles}
          isMulti
          name="location"
          options={locationOptions}
          className="basic-multi-select"
          classNamePrefix="Location"
          placeholder="Location"
          onChange={(e) => filterLocation(e)}
        />
        <Select
          styles={styles}
          name="location"
          options={BasepayOptions}
          className="basic-multi-select"
          classNamePrefix="Location"
          placeholder="Minimum Base Pay Salary"
          onChange={(e) => filterBasePay(e)}
        />
        <Form>
          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Control
              type="text"
              placeholder="Search Company Name"
              onChange={(e) => search(e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>

      <Row xs={1} md={3} className="g-4">
        {filteredItems.map((item, idx) => (
          <Col key={idx} className="col">
            <Card className="cardBody">
              <Card.Body>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <img src={item.logoUrl} className="company-logo"></img>
                  <div>
                    <div>
                      <h3 className="company-name">{item.companyName}</h3>
                      <h2 className="job-role">
                        {item.jobRole &&
                          `${item.jobRole
                            .charAt(0)
                            .toUpperCase()}${item.jobRole.slice(1)}`}
                      </h2>
                    </div>
                    <span style={{ fontSize: "11px" }}>
                      {item.location &&
                        `${item.location
                          .charAt(0)
                          .toUpperCase()}${item.location.slice(1)}`}
                    </span>
                  </div>
                </div>
                <p className="estimated-salary">
                  Estimated Salary:{" "}
                  {item.salaryCurrencyCode === "USA" ? "$" : "₹"}{" "}
                  {item.minJdSalary} -{" "}
                  {item.salaryCurrencyCode === "USA" ? "$" : "₹"}{" "}
                  {item.maxJdSalary} LPA
                </p>

                <div className="about">
                  <p>About Company:</p>
                  <Card.Text>
                    <p>{item.jobDetailsFromCompany}</p>
                  </Card.Text>
                </div>
                <div className="view-job">
                  <a
                    href={item.jdLink}
                    style={{ color: "#4943da", textDecoration: "none" }}
                  >
                    View Job
                  </a>
                </div>

                {item.minExp && (
                  <div className="experience-container">
                    <p className="min-exp-heading">Minimum Experience</p>
                    <p className="min-exp-text">{item.minExp} years</p>
                  </div>
                )}
              </Card.Body>
              <Button className="easy-apply-btn" size="lg">
                Easy Apply
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      {isLoading && <h2 className="data-state">Loading...</h2>}
      {error && <p>Error: {error.message}</p>}
      {isDataEnd && <h2 className="data-state">......End of data......</h2>}
    </div>
  );
}

export default App;
