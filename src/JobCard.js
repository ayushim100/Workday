import "./JobCard.css";
import React from "react";
import { Card, Button } from "react-bootstrap";

function JobCard(props) {
  const item = props;
  return (
    <Card className="cardBody">
      <Card.Body>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <img src={item.logoUrl} className="company-logo"></img>
          <div>
            <div>
              <h3 className="company-name">{item.companyName}</h3>
              <h2 className="job-role">
                {item.jobRole &&
                  `${item.jobRole.charAt(0).toUpperCase()}${item.jobRole.slice(
                    1
                  )}`}
              </h2>
            </div>
            <span style={{ fontSize: "11px" }}>
              {item.location &&
                `${item.location.charAt(0).toUpperCase()}${item.location.slice(
                  1
                )}`}
            </span>
          </div>
        </div>
        <p className="estimated-salary">
          Estimated Salary: {item.salaryCurrencyCode === "USA" ? "$" : "₹"}{" "}
          {item.minJdSalary} - {item.salaryCurrencyCode === "USA" ? "$" : "₹"}{" "}
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
  );
}

export default JobCard;
