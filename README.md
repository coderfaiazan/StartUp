# StartUp
A full stack project
Here's the API documentation in markdown format for the given endpoints:

```markdown
# API Documentation

This document provides the list of endpoints and their descriptions for user authentication, project management, and transaction processing.

---

## User Authentication

### `POST /api/v1/user/register`
**Description**: Registers a new user.  
**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
**Response**:
- `201 Created`: User successfully registered.
- `400 Bad Request`: Invalid input or missing data.

---

### `POST /api/v1/user/login`
**Description**: Logs in an existing user.  
**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**:
- `200 OK`: Login successful, returns authentication token.
- `401 Unauthorized`: Invalid credentials.

---

### `GET /api/v1/user/logout`
**Description**: Logs out the current user.  
**Response**:
- `200 OK`: Logout successful.
- `401 Unauthorized`: No active session.

---

### `GET /api/v1/user/me`
**Description**: Retrieves data of the currently authenticated user.  
**Response**:
- `200 OK`: Returns the user data.
- `401 Unauthorized`: User is not authenticated.

**Response Body**:
```json
{
  "id": "userId",
  "name": "User Name",
  "email": "user@example.com"
}
```

---

### `PUT /api/v1/user/update/:id`
**Description**: Updates the data of the specified user.  
**Request Body**:
```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```
**Response**:
- `200 OK`: User successfully updated.
- `400 Bad Request`: Invalid data.
- `404 Not Found`: User not found.

---

## Project Management

### `PUT /api/v1/project/register/:userId`
**Description**: Creates a new project for the specified user.  
**Request Body**:
```json
{
  "title": "Project Title",
  "description": "Detailed project description",
  "goal": 5000,
  "category": "Technology"
}
```
**Response**:
- `201 Created`: Project successfully created.
- `400 Bad Request`: Missing or invalid data.

---

### `POST /api/v1/project/add`
**Description**: Adds a new reward to an existing project.  
**Request Body**:
```json
{
  "projectId": "projectId",
  "reward": {
    "title": "Reward Title",
    "description": "Reward Description",
    "amount": 100
  }
}
```
**Response**:
- `200 OK`: Reward successfully added to the project.
- `404 Not Found`: Project not found.

---

### `POST /api/v1/project/posts`
**Description**: Adds a new post to an existing project.  
**Request Body**:
```json
{
  "projectId": "projectId",
  "content": "Project progress update"
}
```
**Response**:
- `200 OK`: Post successfully added to the project.
- `404 Not Found`: Project not found.

---

### `POST /api/v1/project/comment`
**Description**: Adds a comment to an existing post of a project.  
**Request Body**:
```json
{
  "postId": "postId",
  "comment": "Great progress!"
}
```
**Response**:
- `200 OK`: Comment successfully added.
- `404 Not Found`: Post or project not found.

---

### `PUT /api/v1/project/update/:id`
**Description**: Updates the details of an existing project.  
**Request Body**:
```json
{
  "title": "Updated Project Title",
  "description": "Updated project description",
  "goal": 6000,
  "category": "Business"
}
```
**Response**:
- `200 OK`: Project successfully updated.
- `404 Not Found`: Project not found.

---

### `DELETE /api/v1/project/delete/:projectId`
**Description**: Deletes an existing project by its ID.  
**Response**:
- `200 OK`: Project successfully deleted.
- `404 Not Found`: Project not found.

---

### `GET /api/v1/project/me/:title`
**Description**: Retrieves project data by its title.  
**Response**:
- `200 OK`: Project data returned.
- `404 Not Found`: Project not found.

---

### `GET /api/v1/project/projects/:category`
**Description**: Retrieves a collection of projects filtered by category.  
**Response**:
- `200 OK`: List of projects in the specified category.
- `404 Not Found`: No projects found in that category.

---

## Transaction Processing

### `POST /api/v1/payments/createorder`
**Description**: Creates an order for payment processing via Razorpay.  
**Request Body**:
```json
{
  "amount": 100,
  "currency": "INR",
  "description": "Project Contribution"
}
```
**Response**:
- `200 OK`: Order successfully created, returns Razorpay order ID.
- `400 Bad Request`: Invalid input.

---

### `POST /api/v1/payments/verify`
**Description**: Verifies payment after a successful Razorpay transaction and updates the database.  
**Request Body**:
```json
{
  "razorpay_order_id": "order_id",
  "razorpay_payment_id": "payment_id",
  "razorpay_signature": "signature"
}
```
**Response**:
- `200 OK`: Payment successfully verified and database updated.
- `400 Bad Request`: Invalid signature or payment details.
- `500 Internal Server Error`: Server error during payment verification.

---

## Error Codes and Responses

- `200 OK`: Request successful.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Invalid request, missing or incorrect parameters.
- `401 Unauthorized`: Authentication failed or user is not authorized.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Unexpected error occurred on the server.

---
```

This markdown documentation outlines the endpoints for user authentication, project management, and transaction processing. It also provides details on request and response formats for each endpoint.