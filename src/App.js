import React, { useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CssBaseline,
  TextField,
} from "@mui/material";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const GET_RESOURCES = gql`
  query GetResources {
    resources {
      id
      name
      type
    }
  }
`;

const ResourceList = ({ searchTerm }) => {
  const { loading, error, data } = useQuery(GET_RESOURCES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredResources = data.resources.filter((resource) =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      {filteredResources.map((resource) => (
        <Grid item xs={12} sm={6} md={4} key={resource.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {resource.name}
              </Typography>
              <Typography color="text.secondary">
                Type: {resource.type}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Cloud Resources
        </Typography>
        <TextField
          label="Search Resources"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ResourceList searchTerm={searchTerm} />
      </Container>
    </ApolloProvider>
  );
};

export default App;
