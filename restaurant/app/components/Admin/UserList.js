"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  List,
  TextField,
  UpdateButton,
} from "react-admin";

const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const deleteUsers = async (user_id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/backend/user/${user_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setUsers(users.filter((user) => user.user_id !== user_id));
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/backend/user", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Set the users state with the fetched data
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run effect only once when component mounts

  return (
    <div>
      <List {...props}>
        <div>
          {" "}
          <h2>User List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.nom}</td>
                  <td>{user.prenom}</td>
                  <td>{user.email}</td>
                  <td>
                    {/* <EditButton basePath="/users"/> */}
                    {/* <DeleteButton
                      basePath="/users"
                    /> */}
                    <deleteButton onClick={() => deleteUsers(user.user_id)}>
                      Delete
                    </deleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </List>
    </div>
  );
};

export default UserList;
