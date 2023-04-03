// import React, { useState, useEffect } from 'react';

// function Navbar({ onSearch }) {
//   const [searchQuery, setSearchQuery] = useState('');

//   function handleSearchChange(event) {
//     setSearchQuery(event.target.value);
//     onSearch(event.target.value);
//   }

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <a className="navbar-brand" href="/">User List</a>
//         <form className="d-flex">
//           <input
//             className="form-control me-2"
//             type="search"
//             placeholder="Search"
//             aria-label="Search"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//           <button className="btn btn-outline-success" type="submit">Search</button>
//         </form>
//       </div>
//     </nav>
//   );
// }

// function UserLst() {
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     async function fetchUsers() {
//       const response = await fetch('/api/v1/users');
//       const data = await response.json();
//       setUsers(data.users || []);
//     }

//     fetchUsers();
//   }, []);

//   const filteredUsers = users.filter(user =>
//     user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   function handleSearch(query) {
//     setSearchQuery(query);
//   }

//   return (
//     <div>
//       <Navbar onSearch={handleSearch} />
//       <div className="container">
//         <h1>User List</h1>
//         <ul>
//           {filteredUsers.map(user => (
//             <li key={user.id}>
//               <div>Name = {user.firstName} {user.lastName}</div>
//               <div>Email-Id = {user.email}</div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default UserLst;




import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/api/v1/users');
      const data = await response.json();
      setUsers(data.users || []);
    }

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  }

  function handlePageChange(event) {
    setCurrentPage(Number(event.target.id));
  }

  function handleUsersPerPageChange(event) {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1);
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">User List</a>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <div className="container">
        <h1>User List</h1>
        <label htmlFor="usersPerPage">Users per page:</label>
        <select id="usersPerPage" value={usersPerPage} onChange={handleUsersPerPageChange}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <br /><br /><br />
        <ul>
          {currentUsers.map(user => (
            <li key={user.id}>
              <div>{user.firstName} {user.lastName}</div>
              <div>{user.email}</div>
            </li>
          ))}
        </ul>
        <nav>
          <ul className="pagination">
            {pageNumbers.map(number => (
              <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                <a href="#" id={number} className="page-link" onClick={handlePageChange}>{number}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default UserList;
