import React, { useState } from 'react';
import axios from 'axios';

const CaseSearch = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = e => {
    e.preventDefault();
    setResult(null);
    axios.get(`http://localhost:5000/api/cases/search/${caseNumber}`)
      .then(res => setResult(res.data))
      .catch(() => setResult('Not found'));
  };

  return (
    <div className="container py-4">
      <div className="bg-white rounded shadow-sm p-4 mb-4" style={{ maxWidth: 600, margin: '0 auto' }}>
        <h2 className="mb-3 text-success" style={{ fontWeight: 700 }}>Search Case</h2>
        <form className="row g-3 mb-4" onSubmit={handleSearch}>
          <div className="col-9">
            <input
              value={caseNumber}
              onChange={e => setCaseNumber(e.target.value)}
              placeholder="Enter Case Number"
              className="form-control"
              required
            />
          </div>
          <div className="col-3 d-grid">
            <button type="submit" className="btn btn-primary">Search</button>
          </div>
        </form>
        {result && (
          <div className="mt-4">
            <h5 className="mb-3 text-primary" style={{ fontWeight: 600 }}>Result:</h5>
            {typeof result === 'string' ? (
              <div className="alert alert-warning">{result}</div>
            ) : (
              <div className="card shadow-sm">
                <div className="card-body">
                  <table className="table table-borderless mb-0">
                    <tbody>
                      <tr>
                        <th scope="row" style={{ width: 180 }}>Case Number</th>
                        <td>{result.caseNumber}</td>
                      </tr>
                      <tr>
                        <th scope="row">Title</th>
                        <td>{result.title}</td>
                      </tr>
                      <tr>
                        <th scope="row">Status</th>
                        <td>{result.status}</td>
                      </tr>
                      <tr>
                        <th scope="row">Next Hearing Date</th>
                        <td>{result.nextHearingDate || <span className="text-muted">N/A</span>}</td>
                      </tr>
                      <tr>
                        <th scope="row">Judgment Date</th>
                        <td>{result.judgmentDate || <span className="text-muted">N/A</span>}</td>
                      </tr>
                      <tr>
                        <th scope="row">Notes</th>
                        <td>{result.notes || <span className="text-muted">N/A</span>}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseSearch;
