import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookForm from "../components/BookForm";
import { getBookById } from "../modules/fetch";


export default function EditBookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(id);
        setBook(response.book); 
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <Box>
      <BookForm bookData={book} />
    </Box>
  );
}


// import { Box } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import BookForm from "../components/BookForm";
// import { getBookById } from "../modules/fetch";

// export default function EditBookPage() {
//     const { id } = useParams();
//     const [book, setBook] = useState(null);

//     useEffect(() => {
//        const fetchBook = async () => {
//         try {
//             const response = await getBookById(id)
//             setBook(response.book)
//         } catch (e) {
//             console.log(e)
//         }
//        }
//        fetchBook()
//     }, [id]);

//     return (
//         <Box>
//             <BookForm book={book} />
//         </Box>
//     );
// }
