import React from "react";
import "../../../style/table.css";
const TheadTableCompany = () => {
  return (
    <>
      <tr className="tab--tr">
        <th className="tab__thead--th">ID:</th>
        <th className="tab__thead--th">Logo:</th>
        <th className="tab__thead--th">department:</th>
        <th className="tab__thead--th">city:</th>
        <th className="tab__thead--th">address:</th>
        <th className="tab__thead--th">Actions</th>
      </tr>
    </>
  );
};

export default TheadTableCompany;
