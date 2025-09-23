import { getUsers } from '@/server/users';
import React from 'react'

const AdminPage = async () => {
    const users = await getUsers();
  return (
    <div>
        {users.map((user: any) => (
            <div key={user.id}> {user.email} </div>
        ))}
    </div>
  )
}

export default AdminPage
