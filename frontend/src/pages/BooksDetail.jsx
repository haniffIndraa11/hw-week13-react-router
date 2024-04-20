import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookById } from "../modules/fetch";
import Swal from 'sweetalert2'

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(id);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      Swal.fire({
        icon: "warning",
        title: "Book deleted",
        showConfirmButton: true,
        confirmButtonText: "Ok!",
        timer: 2000
      });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      {isLoading ? (
        <Skeleton height="300px" my="6" />
      ) : (
        <Flex my="6">
          <Box w="300px">
            <Image
              src={`http://localhost:8000/${book.image}`}
              alt={book.title}
            />
          </Box>
          <Box ml="8">
            <Heading as="h1" size="lg">
              {book.title}
            </Heading>
            <Text fontSize="xl" fontWeight="semibold" color="gray.300">
              {book.author}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.300">
              {book.publisher}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.300" mb="4">
              {book.year} | {book.pages} pages
            </Text>
          </Box>
        </Flex>
      )}
      {localStorage.getItem("token") && (
        <HStack>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red" bgColor="red" color="black">
                Delete
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader color="black">Confirmation!</PopoverHeader>
              <PopoverBody color="black">
                Are you sure you want to delete this book?
              </PopoverBody>
              <Button 
              onClick={handleDeleteBook} colorScheme="red" >
                Delete
              </Button>
            </PopoverContent>
          </Popover>
          <Link to={`/editbook/${id}`}>
            <Button>
              Edit
            </Button>
          </Link>
        </HStack>
      )}
    </Box>
  );
}
