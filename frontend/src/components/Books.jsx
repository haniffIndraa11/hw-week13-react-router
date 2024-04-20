/* eslint-disable react/prop-types */
import { Card, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Books({ id, title, author, image, publisher, year }) {
  
  return (
    <Link to={`/books/${id}`}>
      <Card key={id} my={4} p={4} cursor="pointer" bgColor={"#35374B"}  _hover={{ filter: 'brightness(90%)' }}  transition="filter 0.3s">
        <VStack>
          <Heading size={"md"} color={"gray.200"}>
            {title} ({year})
          </Heading>
          <Text color={"gray.200"}>{author}</Text>
          <Image w={24} h={24} src={`http://localhost:8000/${image}`} />
          <Text color={"gray.200"}>
            <span>Publisher:</span>
            {publisher}
          </Text>
        </VStack>
      </Card>
    </Link>
  );
}
