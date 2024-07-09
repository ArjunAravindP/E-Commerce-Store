# Furniture E-Commerce Store

This project is a full-featured e-commerce store for selling furniture, built with Node.js and React, and styled using Material UI.

## Features

- **User Authentication**: Secure user login and registration.
- **Product Management**: Admins can add, update, and delete products.
- **Cart and Checkout**: Users can add items to the cart and proceed to checkout.
- **Payment Integration**: Secure payments with Stripe.
- **Stock Management**: Manage and track product stock levels.
- **Order Management**: Admins can view and manage customer orders.

## Technologies Used

- **Front-end**: React, Material UI
- **Back-end**: Node.js, Express
- **Database**: MongoDB
- **Payment Gateway**: Stripe

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/ArjunAravindP/E-Commerce-Store.git
    cd E-Commerce-Store
    ```

2. **Install dependencies**:
    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

3. **Set up environment variables**: Create a `.env` file in the root directory and add your environment variables:
    ```
    MONGODB_CONNECTION_STRING=your_mongodb_connection_string
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

4. **Run the application**:
    ```bash
    npm run dev
    ```

## Usage

- Visit the home page to browse furniture products.
- Use the cart feature to add products.
- Proceed to checkout to complete your purchase with Stripe payment.
- Admins can log in to manage products and orders.


## Contact

For any questions or feedback, please contact arjunaravind2001@gmail.com or open an issue.
