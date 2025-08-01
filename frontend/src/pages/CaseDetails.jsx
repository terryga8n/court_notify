import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaseDetails = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/cases/${id}`)
      .then(res => setCaseData(res.data))
      .catch(() => setCaseData(null));
  }, [id]);

  if (!caseData) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning">Case not found.</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="bg-white rounded shadow-sm p-4 mb-4" style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 className="mb-4 text-success" style={{ fontWeight: 700 }}>Case Details</h2>
        <table className="table table-borderless mb-0">
          <tbody>
            <tr>
              <th>Case Number</th>
              <td>{caseData.caseNumber}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{caseData.title}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{caseData.status}</td>
            </tr>
            <tr>
              <th>Next Hearing Date</th>
              <td>{caseData.nextHearingDate || <span className="text-muted">N/A</span>}</td>
            </tr>
            <tr>
              <th>Judgment Date</th>
              <td>{caseData.judgmentDate || <span className="text-muted">N/A</span>}</td>
            </tr>
            <tr>
              <th>Magistrate Email</th>
              <td>{caseData.magistrateEmail || <span className="text-muted">N/A</span>}</td>
            </tr>
            <tr>
              <th>Accused Email</th>
              <td>{caseData.accusedEmail || <span className="text-muted">N/A</span>}</td>
            </tr>
            <tr>
              <th>Reporter Email</th>
              <td>{caseData.reporterEmail || <span className="text-muted">N/A</span>}</td>
            </tr>
            <tr>
              <th>Notes</th>
              <td>{caseData.notes || <span className="text-muted">N/A</span>}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <Link to={-1} className="btn btn-secondary">Back</Link>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;