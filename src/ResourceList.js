import React, { useEffect } from "react";
import { useQuery, useSubscription, gql } from "@apollo/client";

const GET_RESOURCES = gql`
  query GetResources {
    resources {
      id
      name
      type
    }
  }
`;

const RESOURCE_SUBSCRIPTION = gql`
  subscription OnResourceAdded {
    resourceAdded {
      id
      name
      type
    }
  }
`;

const ResourceList = ({ filter }) => {
  const { loading, error, data } = useQuery(GET_RESOURCES);
  const { data: subscriptionData } = useSubscription(RESOURCE_SUBSCRIPTION);

  useEffect(() => {
    if (subscriptionData) {
    }
  }, [subscriptionData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredResources = data.resources.filter((resource) =>
    resource.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul>
      {filteredResources.map((resource) => (
        <li key={resource.id}>
          {resource.name} - {resource.type}
        </li>
      ))}
    </ul>
  );
};

export default ResourceList;
