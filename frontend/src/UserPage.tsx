import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
    }
  }
`;

interface UserPageProps {
  userId: string;
}

export const UserPage: React.FC<UserPageProps> = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h3>User Information</h3>
      <p>ID: {data.user.id}</p>
      <p>Username: {data.user.username}</p>
    </div>
  );
};
