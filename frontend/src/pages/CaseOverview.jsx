import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaseOverview = () => {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/cases/')
      .then(res => setCases(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container py-4">
      <div className="bg-white rounded shadow-sm p-4 mb-4">
        <h2 className="mb-3 text-success" style={{ fontWeight: 700 }}>All Cases</h2>
        {cases.length === 0 ? (
          <div className="alert alert-info">No cases available.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-success">
                <tr>
                  <th>Case Number</th>
                  <th>Title</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {cases.map(c => (
                  <tr
                    key={c.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/dashboard/case/${c.id}`)}
                  >
                    <td className="text-primary text-decoration-underline">{c.caseNumber}</td>
                    <td>{c.title}</td>
                    <td>{c.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseOverview;
