import { useApolloClient } from "@apollo/client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPerson } from "./service";

export const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const client = useApolloClient();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const isValid = password && password === cPassword && fullName && email;
  const handleVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Grid container>
      <Grid xs={12}>
        <TextField
          required
          fullWidth
          label="Full Name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <TextField
          required
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          required
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleVisibility}
                >
                  {showPassword ? (
                    <VisibilityOff></VisibilityOff>
                  ) : (
                    <Visibility></Visibility>
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          fullWidth
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={cPassword}
          onChange={(e) => {
            setCPassword(e.target.value);
          }}
        />
        {isValid ? (
          <></>
        ) : (
          <Typography variant="body2" color="red">
            Passwords should match and all fields are required
          </Typography>
        )}
        <Button
          disabled={!isValid}
          onClick={(e) => {
            e.stopPropagation();
            registerPerson(client, fullName, email, password).then(() => {
              navigate("/people");
            });
          }}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};
