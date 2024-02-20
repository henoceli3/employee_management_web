import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  VStack,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SignIn = () => {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [showPassword, setShowPassword1] = useState(false);
  const backgrounds = [
    "/bg/bg-1.jpg",
    "/bg/bg-2.jpg",
    "/bg/bg-3.jpg",
    "/bg/bg-4.jpg",
  ];
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Change l'index du fond d'écran toutes les 5 secondes
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(intervalId); // Nettoie l'intervalle lors du démontage du composant
  }, [backgroundIndex, backgrounds.length]);
  const handleClickPassword = () => setShowPassword1(!showPassword);
  const handleEmailInputChange = (e: { target: { value: string } }) => {
    setEmail(e.target.value);
  };
  const handlePasswordInputChange = (e: { target: { value: string } }) => {
    setPassword(e.target.value);
  };
  const login = async () => {
    try {
      setIsLoading(true);
      const loginResponse = await axios.post(
        "http://localhost:4000/admin/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (loginResponse.status === 200) {
        localStorage.setItem("token", loginResponse.data.data.token);
        localStorage.setItem("uuid", loginResponse.data.data.uuid);
        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showErrorToast("Email ou mot de passe incorrect");
    }
  };

  const showErrorToast = (title: string) => {
    toast({
      title: title,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <>
      <Center
        h="100vh"
        w="100vw"
        bgImage={backgrounds[backgroundIndex]}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <HStack
          w={{ base: "90%", xl: "80%" }}
          h={{ base: "95%", xl: "80%" }}
          gap={"0"}
        >
          {isLargerThan1280 ? (
            <VStack
              h="100%"
              w="50%"
              padding={"5%"}
              justifyContent={"center"}
              alignItems={"start"}
              bg={"#00000030"}
            >
              <Text
                fontSize={"3em"}
                fontWeight={"bold"}
                color={"white"}
                textTransform={"capitalize"}
                textAlign={"start"}
              >
                Sneakers
              </Text>
              <Text
                fontSize={"2em"}
                fontWeight={"bold"}
                color={"white"}
                textTransform={"capitalize"}
                textAlign={"start"}
              >
                {"happy to see you again"}
              </Text>
              <Text color={"white"} textAlign={"start"}>
                Anim dolor voluptate voluptate veniam in amet tempor
                exercitation in ipsum.
              </Text>
              <Button
                variant={"solid"}
                bg={"#00000080"}
                color={"white"}
                _hover={{ bg: "#000000" }}
                onClick={() => {
                  router.push("/auth/signup");
                }}
              >
                Sing up
              </Button>
            </VStack>
          ) : null}
          <VStack
            h="100%"
            w={{ base: "100%", xl: "50%" }}
            padding={"5%"}
            bg={"#00000080"}
            justifyContent={"center"}
            alignItems={"start"}
          >
            <Text
              fontSize={"2em"}
              fontWeight={"bold"}
              color={"white"}
              textTransform={"capitalize"}
              textAlign={"start"}
            >
              Sign in
            </Text>
            <Input
              variant="flushed"
              placeholder="Email"
              color={"white"}
              borderBottom={"1px solid white"}
              focusBorderColor="white"
              _placeholder={{ color: "white" }}
              onChange={handleEmailInputChange}
              value={email}
            />
            <InputGroup>
              <Input
                pr="4.5rem"
                variant={"flushed"}
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                color={"white"}
                borderBottom={"1px solid white"}
                focusBorderColor="white"
                _placeholder={{ color: "white" }}
                onChange={handlePasswordInputChange}
                value={password}
              />
              <InputRightElement width="4.5rem">
                <Icon
                  as={showPassword ? ViewIcon : ViewOffIcon}
                  boxSize={6}
                  color="white"
                  cursor="pointer"
                  onClick={handleClickPassword}
                />
              </InputRightElement>
            </InputGroup>
            <Center w={"100%"} mt={"1em"}>
              <Button
                variant={"solid"}
                bg={"#00000080"}
                color={"white"}
                _hover={{ bg: "#000000" }}
                onClick={login}
              >
                {isLoading ? (
                  <Spinner
                    color="white"
                    emptyColor="gray.200"
                    thickness="3px"
                  />
                ) : (
                  "Log in"
                )}
              </Button>
            </Center>
          </VStack>
        </HStack>
      </Center>
    </>
  );
};

export default SignIn;
