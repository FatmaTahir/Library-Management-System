# 📚 Library Management System API

A **Clean Architecture-based Library Management System** built with **C# and ASP.NET Core Web API**.

The project demonstrates how to structure a backend application using clear separation of concerns across **Domain, Application, Infrastructure, and Web API layers**.

## ✨ Features

*  Book management
*  Member registration and management
*  Borrow books
*  Return borrowed books
*  Search books by category
*  Member borrowing history
*  Book availability tracking
*  Clean Architecture
*  Repository Pattern
*  RESTful API endpoints
*  In-memory data storage

---

##  Architecture

The system follows a four-layer Clean Architecture structure:

```text
                    ┌─────────────────────┐
                    │      MyService      │
                    │    ASP.NET Core     │
                    │     Web API         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Library.Application │
                    │      Use Cases      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Library.Domain    │
                    │ Entities & Interfaces│
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │Library.Infrastructure│
                    │   Repositories      │
                    └─────────────────────┘
```

### Layer Responsibilities

#### 1. Library.Domain

Contains the core business models and repository interfaces.

**Entities:**

* `Book`
* `Member`
* `BorrowRecord`

**Repository Interfaces:**

* `IBookRepository`
* `IMemberRepository`
* `IBorrowRepository`

The Domain layer does not depend on external frameworks.

---

#### 2. Library.Application

Contains the application's business logic through use cases.

**Book Use Cases**

* Get all books
* Add book
* Update book
* Delete book
* Search books by category

**Member Use Cases**

* Register member
* Get all members
* Get member by ID

**Borrow Use Cases**

* Borrow book
* Return book
* Get member borrowing history

Controllers communicate with the application through these use cases rather than directly accessing repositories.

---

#### 3. Library.Infrastructure

Contains concrete implementations of the repository interfaces.

* `BookRepository`
* `MemberRepository`
* `BorrowRepository`

The project uses **in-memory collections** for data storage.

This keeps the focus on understanding architecture, dependency flow, and separation of concerns without requiring a database setup.

---

#### 4. MyService

The ASP.NET Core Web API layer exposes the application's functionality through REST endpoints.

Controllers communicate with the **Application layer** and do not directly access repositories.

---

##  Request Flow

A typical request follows this flow:

```text
HTTP Request
     ↓
Controller
     ↓
Use Case
     ↓
Repository Interface
     ↓
Repository Implementation
     ↓
In-Memory Data
```

For example:

```text
POST /api/borrow
       ↓
BorrowController
       ↓
BorrowBook Use Case
       ↓
IBookRepository
IBorrowRepository
       ↓
BookRepository
BorrowRepository
```

This keeps business logic separate from HTTP handling and data storage.

---

## 📖 Domain Models

### Book

| Property      | Type   | Description                      |
| ------------- | ------ | -------------------------------- |
| Id            | int    | Unique book identifier           |
| Title         | string | Book title                       |
| Author        | string | Book author                      |
| ISBN          | string | Book ISBN                        |
| Category      | string | Book category                    |
| PublishedYear | int    | Publication year                 |
| IsAvailable   | bool   | Whether the book can be borrowed |

### Member

| Property       | Type     | Description              |
| -------------- | -------- | ------------------------ |
| Id             | int      | Unique member identifier |
| Name           | string   | Member name              |
| Email          | string   | Member email             |
| Phone          | string   | Member phone             |
| MembershipDate | DateTime | Registration date        |

### BorrowRecord

| Property   | Type      | Description                 |
| ---------- | --------- | --------------------------- |
| Id         | int       | Unique borrowing record     |
| BookId     | int       | Borrowed book ID            |
| MemberId   | int       | Member ID                   |
| BorrowDate | DateTime  | Date the book was borrowed  |
| ReturnDate | DateTime? | Date the book was returned  |
| Status     | enum      | Borrowed, Returned, or Late |

---

#  API Endpoints

## Books

### Get all books

```http
GET /api/books
```

Returns all books.

### Get book by ID

```http
GET /api/books/{id}
```

Returns:

* `200 OK` when the book exists
* `404 Not Found` when the book does not exist

### Add a book

```http
POST /api/books
```

Example request:

```json
{
  "title": "Clean Architecture",
  "author": "Robert C. Martin",
  "isbn": "9780134494166",
  "category": "Software",
  "publishedYear": 2017
}
```

### Delete a book

```http
DELETE /api/books/{id}
```

### Search by category

```http
GET /api/books/category/{category}
```

---

# 👤 Member Endpoints

### Register member

```http
POST /api/members
```

Example request:

```json
{
  "name": "Ali Khan",
  "email": "ali@gmail.com",
  "phone": "03001234567"
}
```

### Get all members

```http
GET /api/members
```

### Get member by ID

```http
GET /api/members/{id}
```

---

#  Borrow Endpoints

### Borrow a book

```http
POST /api/borrow
```

Example request:

```json
{
  "bookId": 1,
  "memberId": 2
}
```

When a book is successfully borrowed:

```text
Book.IsAvailable = false
BorrowRecord.Status = Borrowed
BorrowRecord.BorrowDate = current date
```

### Return a book

```http
PUT /api/borrow/return/{recordId}
```

When a book is returned:

```text
Book.IsAvailable = true
BorrowRecord.Status = Returned
BorrowRecord.ReturnDate = current date
```

### Get member borrowing history

```http
GET /api/borrow/member/{memberId}
```

---

# ⚙️ Business Rules

The application enforces the following business rules in the **Application layer**:

* A book cannot be borrowed when it is unavailable.
* Borrowing a book changes its availability to `false`.
* A new borrowing record is created with status `Borrowed`.
* Returning a book changes its availability to `true`.
* Returning a book changes its status to `Returned`.
* The return date is recorded when a book is returned.

Keeping these rules inside the use-case layer prevents controllers from containing business logic.

---

# 🛠️ Technologies

* **C#**
* **.NET / ASP.NET Core**
* **ASP.NET Core Web API**
* **REST APIs**
* **Clean Architecture**
* **Repository Pattern**
* **Dependency Injection**
* **In-Memory Data Storage**
* **Visual Studio**

---

#  Getting Started

## Prerequisites

Make sure you have:

* .NET SDK installed
* Visual Studio or Visual Studio Code
* Git

## Clone the repository

```bash
git clone https://github.com/FatmaTahir/Library-Management-System.git
```

## Open the solution

Open:

```text
LibrarySystemSolution.sln
```

in Visual Studio.

## Run the project

Set `MyService` as the startup project and run the application.

The API can then be tested using:

* Swagger
* Postman
* Browser for GET endpoints

---

#  API Testing

The endpoints can be tested using **Swagger** or **Postman**.

Recommended testing sequence:

```text
1. Add a book
       ↓
2. Register a member
       ↓
3. Borrow the book
       ↓
4. Check book availability
       ↓
5. View member borrowing history
       ↓
6. Return the book
       ↓
7. Check book availability again
```

---

#  Learning Objectives

This project demonstrates practical understanding of:

* Clean Architecture
* Separation of Concerns
* Dependency Inversion
* Repository Pattern
* Use Case-based application design
* RESTful API development
* ASP.NET Core Web API
* Dependency Injection
* Domain-driven organization of business models
* Business-rule enforcement
* Layered backend architecture

---

#  Author

**Fatima Tahir**

BS Software Engineering
Punjab University College of Information Technology (PUCIT)

GitHub: [FatmaTahir](https://github.com/FatmaTahir)

---

##  Project Status

Completed as a Software Construction and Development project demonstrating **Clean Architecture and REST API development with ASP.NET Core**.
