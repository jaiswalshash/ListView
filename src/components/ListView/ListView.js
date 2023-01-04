import React, { useState, useEffect } from "react";
import "./ListView.css";

const ListView = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://reqres.in/api/users?page=2");
      const json = await res.json();
      setData(json.data);
      setFilteredData(json.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((item) => item.first_name.includes(searchTerm))
    );
  }, [data, searchTerm]);

  return (
    <div className="ListView">
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;