import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

interface User {
  user_id: number;
  nom: string;
  prenom: string;
  email: string;
  
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const deleteUsers = async (user_id:number) => {
    try {
      const response = await fetch(`http://localhost:8000/backend/user/${user_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.user_id !== user_id));
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    // Function to fetch users from backend when component mounts
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/backend/user', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Set the users state with the fetched data
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Call the fetchUsers function when component mounts
  }, []); // Empty dependency array to run effect only once when component mounts

  return (
    
   <div>     <h2>User List</h2>
        <table className="table">
         <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
           <th>User</th>
            <th>Modifier</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.nom}</td>
              <td>{user.prenom}</td>
              <td>{user.email}</td>
              <td>
                <Button onClick={() => deleteUsers(user.user_id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   
  );
}

export default Users;