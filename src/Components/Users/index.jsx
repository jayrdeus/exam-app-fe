import { useState, useEffect } from "react";
import { getUsers } from "../../api";
import { useAuth } from "../../utils/useAuth";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Tables from "../Tables";

import SimpleBackDrop from "../SimpleBackdrop";
export default function Index() {
  const { user } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const getData = async () => {
    try { 
        console.log(user.token)
        const data = await getUsers(user.token);
        setUsers(data);
    } catch(err) { 
        console.log(err);
    } finally {
        setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <SimpleBackDrop open={isLoading} />
      ) : (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {users && (
                    <Tables users={users} />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
}
