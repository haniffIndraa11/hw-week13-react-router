import { instance } from "../axios/index";

//function register 
async function registerUser(name, email, password) {
    try {
        const response = await instance.post('/register', { name, email, password })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong')
    }
}

//function login
async function loginUser(email, password) {
    try {
        const response = await instance.post('/login', { email, password })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong')
    }
}

//function create book
async function createBook(formData) {
    try {
        const response = await instance.post('/books', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
      }
}

//function get all books
async function getAllBooks() {
    try {
        const response = await instance.get('/books')
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong')
    }
}

//function edit book
async function editBook(id, title, author, publisher, year, pages) {
    try {
        const response = await instance.put(`/books/${id}`, { title, author, publisher, year, pages });
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
      }
}

//function delete book
async function deleteBook(id) {
    try {
        const response = await instance.delete(`/books/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong')
    }
}

//function get book by id
async function getBookById(id) {
    try {
        const response = await instance.get(`/books/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
      }
}

export { registerUser, loginUser, createBook, getAllBooks, editBook, deleteBook, getBookById }