// ** React Imports
import { useState } from 'react';

//** CSS Imports
import styles from '../../styles/Home.module.css';

//** Components Imports
import Form from './Form';
import Table from './Table';

//** Mock Data & Type Imports
import { IUser, users as usersData } from '../../mock/users';

export const Main = () => {
  const [users, setUsers] = useState<IUser[]>(usersData);

  // Handlers
  const handleCreateUser = (user: IUser) => {
    setUsers([...users, user]);
    console.log('Created New User Successfully!');
  };

  const handleDeleteUser = (id: string) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
    console.log('Deleted User Successfully!');
  };

  const handleDeleteAllUsers = () => {
    setUsers([]);
    console.log('Deleted All Users Successfully!');
  };

  return (
    <main className={styles.container}>
      <Form handleCreateUser={handleCreateUser} />
      <Table
        users={users}
        handleDeleteUser={handleDeleteUser}
        handleDeleteAllUsers={handleDeleteAllUsers}
      />
    </main>
  );
};
