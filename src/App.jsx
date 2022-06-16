import { useState, useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./amplify-config";
import Chart from "./components/Chart";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Heading,
} from "@chakra-ui/react";

Amplify.configure(awsconfig);

function App() {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(true);
  const [submitError, setsubmitError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [limit, setLimit] = useState(null);

  //function for login t#St12345
  async function signIn(e) {
    e.preventDefault();
    try {
      const user = await Auth.signIn(username, password);
      setToken(user.signInUserSession.idToken.jwtToken);
      setError(false);
    } catch (error) {
      console.info(username);
      setsubmitError(true);
      setTimeout(() => setsubmitError(false), 1500);

      console.log("error signing in", error);
    }
  }

 

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_API_ENDPOINT);
    socket.onopen = (e) => {
      socket.send(
        JSON.stringify({
          token: token,
        })
      );
      if (limit !== null) {
        socket.send(JSON.stringify(limit));
      }
    };
    
  socket.onmessage = (e) => {
    const res = JSON.parse(e.data);
    if (res.hasOwnProperty("lowLimit")) setChartData((prev) => [...prev, res]);
  };
  }, [token, limit]);


  return (
    <Flex flexDirection="column" alignItems="center">
      {!error && <Heading>Semai Real Time Chart</Heading>}
      {error && (
        <form
          action="sumbit
      "
          onSubmit={signIn}
        >
          <Flex
            mt="3rem"
            p="3rem"
            boxShadow="1px"
            borderWidth="1px"
            borderRadius="4px"
            flexDirection="column"
            width="25rem"
          >
            <Heading mb="10px">Semai Login</Heading>
            {submitError && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Invalid</AlertTitle>
                <AlertDescription>Username or Password !</AlertDescription>
              </Alert>
            )}

            <FormControl isInvalid={error}>
              <FormLabel htmlFor="email">Username</FormLabel>
              <Input
                id="email"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {!error ? (
                <FormHelperText>Enter the username.</FormHelperText>
              ) : (
                <FormErrorMessage>username is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">password</FormLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="teal" p="10px" mt="2rem" type="submit">
              Masuk
            </Button>
          </Flex>
        </form>
      )}

      {!error && <Chart setLimit={setLimit} limit={limit} data={chartData} />}
    </Flex>
  );
}

export default App;
