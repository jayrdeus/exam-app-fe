import {useEffect, useRef,useState} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../utils/useAuth';
import { createUser,getRoles } from "../../api";
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import SimpleBackDrop from "../SimpleBackdrop";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, item, theme) {
    return {
      fontWeight:
        item.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  export default function Create() {
    const theme = useTheme();
    const navigate = useNavigate();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [isError, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [roles,setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const { user } = useAuth();
    const [isLoading, setLoading] = useState(true);
    const handleBack = () => { 
        navigate('/users');
    }
    const getData =  async () => { 
        try { 
            const res = await getRoles(user);
            setRoles(res);
        } catch(err) { 
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => { 
        getData()
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        const filteredRoles = selectedRoles.map(_roles => { 
            return roles.filter(item => item.name == _roles).reduce((accum,_item) => accum =_item.id,0)
        })
        const userObject =  { 
            name : nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirm_password: confirmPasswordRef.current.value,
            roles: filteredRoles
        }

        if (userObject.confirm_password !== userObject.password) { 
            setError(true)
            setErrorMsg('Password mismatch! Please try it again');
            return;
        }
        try { 
            const res = await createUser(userObject,user.token);
            if (res.data) { 
                navigate('/users');
            }
        } catch (err) { 
            if (err != undefined) { 
                const e = err.response.data;
                setError(true)
                setErrorMsg(e.message);
            }
            console.log(err)
        }
    }
    const handleRoleChange = (e) => { 
        const {
            target: { value },
          } = e;
          setSelectedRoles(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
    }
  return (
    <>
      {isLoading ? (
        <SimpleBackDrop open={isLoading} />
      ) : (
        <Box
          sx={{
            height: "auto",
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
            >
              <Typography variant="h6" gutterBottom>
                Users Details
              </Typography>
              {isError && (
                <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  sx={{ mt: 2, mb: 2 }}
                >
                  {errorMsg}
                </Typography>
              )}
              <Grid
                container
                spacing={3}
                component="form"
                onSubmit={handleSubmit}
              >
                <Grid item xs={12}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Full Name"
                    fullWidth
                    autoComplete="name"
                    inputRef={nameRef}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    autoComplete="Email Address"
                    inputRef={emailRef}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    autoComplete="origin"
                    inputRef={passwordRef}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    autoComplete="origin"
                    inputRef={confirmPasswordRef}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                      labelId="role"
                      id="role"
                      multiple
                      label="Role"
                      value={selectedRoles}
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      onChange={handleRoleChange}
                      required
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {roles.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={item.name}
                            style={getStyles(item.name, selectedRoles, theme)}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <IconButton
                        aria-label="Back"
                        color="error"
                        onClick={handleBack}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton
                        aria-label="create"
                        color="primary"
                        type="submit"
                      >
                        <SaveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>
      )}
    </>
  );
}
