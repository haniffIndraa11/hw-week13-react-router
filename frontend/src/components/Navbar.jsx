/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  keyframes,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../modules/fetch";
import Swal from 'sweetalert2'

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, [window.localStorage.getItem("token")]);

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bgGradient="linear(to-r, #31363F, #222831)"
      color="black"
    >
      <Link to="/">
        <Flex align="center" mr={5} cursor="pointer">
          <Text fontSize="xl" fontWeight="bold" color="white">
            My Library
          </Text>
        </Flex>
      </Link>
      <HStack>
        {isLogin && (
          <Link to="/newbook">
            <Button colorScheme="blackAlpha">Create New Book</Button>
          </Link>
        )}
        {!isLogin ? (
          <Button onClick={onOpen} colorScheme="blue">
            Login
          </Button>
        ) : (
          <Popover>
            <PopoverTrigger>
            <Button colorScheme="red" bgColor="red" color="gray.200">
               Logout
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader color="black">Confirmation!</PopoverHeader>
              <PopoverBody color="black">
                Are You Sure Want to Logout?
              </PopoverBody>
              <Button
                colorScheme="blue"
                onClick={() => {
                  window.localStorage.removeItem("token");
                  setIsLogin(false);
                  navigate("/");
                  Swal.fire({
                    icon: "success",
                    title: "You Have logged out",
                    showConfirmButton: true,
                    confirmButtonText: "Ok!",
                    timer: 2000
                  });
                }}
              >
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        )}
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const token = await loginUser(
                e.target.email.value,
                e.target.password.value
              );
              window.localStorage.setItem("token", token.token);
              navigate("/");
              onClose();
              Swal.fire({
                icon: "success",
                title: "Login Success",
                showConfirmButton: true,
                confirmButtonText: "Ok!",
                timer: 2000
              });
            } catch (error) {
              toast({
                title: "Error",
                description: "Incorrect username or password",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your Email address"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" form="login-form" colorScheme="blue" mr={3}>
                Login
              </Button>
              <Link to="/register" onClick={onClose}>
                <Button variant="ghost">
                  Doesn't Have Account? Click here
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
