'use client';

import React from 'react';
import { getUsers } from '../../server/users';

const AdminPage = () => {
  const [users, setUsers] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        if (!data) {
          console.error('Failed to fetch users');
          return;
        }
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user: any) => (
        <div key={user.id}> {user.email} </div>
      ))}
      Hello
    </div>
  );
};

export default AdminPage;
