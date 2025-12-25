import "./Users.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [role, setRole] = useState("All");

  useEffect(() => {
    fetchUsers(`${import.meta.env.VITE_API_BASE_URL}/api/users?limit=${limit}&page=${page}`);
  }, []);

  const fetchUsers = (apiURL) => {
    axios.get(apiURL)
    .then((res) => {
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const prevPage = () => {
    if (page === 1) {
      return;
    }
    fetchUsers(`${import.meta.env.VITE_API_BASE_URL}/api/users?limit=${limit}&page=${page - 1}`)
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page === totalPages) {
      return;
    }
    fetchUsers(`${import.meta.env.VITE_API_BASE_URL}/api/users?limit=${limit}&page=${page + 1}`);
    setPage(page + 1);
  };

  const changeLimit = (value) => {
    fetchUsers(`${import.meta.env.VITE_API_BASE_URL}/api/users?limit=${value}&page=${page}`);
    setLimit(value);
  };

  const changeRole = (value) => {
    if (value === "All") {
      fetchUsers(`${import.meta.env.VITE_API_BASE_URL}/api/users?limit=${limit}&page=${page}`);
      setCategory(value);
      return;
    }
    fetchUsers(`${import.meta.env.VITE_API_BASE_URL}/api/users?limit=${limit}&page=${page}&search=${value}`);
    setRole(value);
  };

  return (
    <div className="container-fluid p-3">
      <h3 className="pb-3 border-bottom border-dark">Users</h3>
      <div className="d-flex justify-content-between pb-3">
        <div className="dropdown">
          <span>Category:&nbsp;</span>
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {role}
          </button>
          <ul className="dropdown-menu">
            <li><span role="button" className="dropdown-item" onClick={() => changeRole("All")}>All</span></li>
            <li><span role="button" className="dropdown-item" onClick={() => changeRole("Mobile Phone")}>User</span></li>
            <li><span role="button" className="dropdown-item" onClick={() => changeRole("Watch")}>Admin</span></li>
          </ul>
        </div>
        <div className="dropdown">
          <span>Show:&nbsp;</span>
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {limit}
          </button>
          <ul className="dropdown-menu">
            <li><span role="button" className="dropdown-item" onClick={() => changeLimit(10)}>10</span></li>
            <li><span role="button" className="dropdown-item" onClick={() => changeLimit(15)}>15</span></li>
            <li><span role="button" className="dropdown-item" onClick={() => changeLimit(20)}>20</span></li>
          </ul>
        </div>
      </div>

      {/* display products */}
      <div className="Users-table">
        {users.length > 0 && <table className="w-100 position-relative">
          <thead className="bg-dark text-light position-sticky top-0">
            <tr>
              <th className="px-4 py-2 text-nowrap">Profile Picture</th>
              <th className="px-4 py-2 text-nowrap">Full Name</th>
              <th className="px-4 py-2 text-nowrap">Email</th>
              <th className="px-4 py-2 text-nowrap">View Details</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => <tr key={index} className="border-bottom border-secondary-subtle">
              <td className="px-4 py-2 text-nowrap">
                <img src={import.meta.env.VITE_API_BASE_URL + "/" + user.imgPath} alt="" className="Users-img-sm"/>
              </td>
              <td className="px-4 py-2 text-nowrap">{user.firstName} {user.lastName}</td>
              <td className="px-4 py-2 text-nowrap">{user.email}</td>
              <td className="px-4 py-2 text-nowrap"><button className="btn btn-primary">View Details</button></td>
            </tr>)}
          </tbody>
        </table>}
      </div>

      {/* pagination */}
      <div className="py-3 text-center">
        {users.length > 0 && <span>
          <button className="btn btn-dark" onClick={prevPage}>&lt;</button>
          &nbsp;<span>{page} / {totalPages}</span>&nbsp;  
          <button className="btn btn-dark" onClick={nextPage}>&gt;</button>  
        </span>}
      </div>
    </div>
  );
};

export default Users;