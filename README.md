Here’s a **professional and formal README** for your **E-commerce Admin Dashboard** project, following the provided instructions.

---

# E-commerce Admin Dashboard

A responsive and functional e-commerce admin dashboard built using **Next.js 15**, **TypeScript** and **Tailwind CSS**. This dashboard allows admin users to manage products, view analytics, and filter products by various criteria like price, category, and rating.

---

## Features

- **Dashboard Layout**:
  - Sidebar navigation for easy access to different sections.
  - Header with user info and logout functionality.
  - Main content area displaying product data and analytics.
  
- **Product Management**:
  - Fetches and displays products from the [Fake Store API](https://fakestoreapi.com/).
  - Displays a list of products with:
    - Product image
    - Title
    - Price
    - Category
    - Rating

- **Filtering System**:
  - **Price range** filter with a min/max slider.
  - **Category** filter (dropdown or checkbox).
  - **Rating** filter (star rating selector).
  - **Search** functionality to filter by product name.

- **Additional Features**:
  1. Product detail view when clicking on a product.
  2. Pagination or infinite scroll for the product list.
  3. Simple analytics or statistics at the top of the dashboard (total products, average price, etc.).


---

## Tech Stack

- **Next.js 15 (App Router)**: For building the app with server-side rendering and API routes.
- **TypeScript**: For type-safe JavaScript code.
- **Tailwind CSS**: For styling and responsive design.
  
---

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Me-V/futurecraft_Project
   cd futurecraft_Project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

   Your dashboard will be available at [[http://futurecraft-project.vercel.app](https://futurecraft-project.vercel.app/)

4. **Building for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## Features Implemented

1. **Dashboard Layout**: Responsive sidebar and header layout with user information.
2. **Products Management**: Fetches product data from the Fake Store API and displays it in a grid format with necessary details.
3. **Authentication**: Saving the user session.
4. **Filtering System**:
   - Implemented price range filter using a slider.
   - Implemented category and rating filters.
   - Search functionality to filter by product name.
5. **Product Detail View**: Clicking on a product displays its detailed information.
6. **Pagination/Infinite Scroll**: Allows users to navigate through a large number of products.
7. **Simple Analytics**: Displays basic statistics like total products, average price, etc.

---

## API Integration

- **Product List**: Fetches a list of products from the Fake Store API.
  - Endpoint: `https://fakestoreapi.com/products`
- **Single Product**: Fetches details of a single product.
  - Endpoint: `https://fakestoreapi.com/products/{id}`
- **Categories**: Fetches the list of product categories.
  - Endpoint: `https://fakestoreapi.com/products/categories`
- **Filter by Category**: Fetches products filtered by category.
  - Endpoint: `https://fakestoreapi.com/products/category/{category_name}`

---

## Technical Decisions

1. **react-intersection-observer Library** was chosen for data fetching and state management due to its built-in caching and handling of async states like loading and errors.
2. **Tailwind CSS** was used for rapid styling and building a responsive UI. It allows easy customization and ensures that the application looks great on all devices.
3. The application is built using **Next.js App Router** to handle both page routing and API routes seamlessly within the same framework.

---

## Challenges Faced & Solutions

1. **Data Fetching**: Initially faced issues with managing product data and filters simultaneously. The solution was to use **Tanstack Query** to separate concerns and manage different states like loading, error, and success for each data request.
2. **State Management**: Handling multiple filters and synchronizing them with the displayed data was a challenge. This was solved by using **React Context API** to globally manage the filter states.
3. **Keeping the type safety** :- Handle all the types correctly from the frontend to the backend.

---

## Demo

You can view the live demo of this project [https://futurecraft-project.vercel.app](https://futurecraft-project.vercel.app/).

---

## Conclusion

This project demonstrates the ability to build a responsive and feature-rich e-commerce admin dashboard with **Next.js**, **TypeScript**, and **Tailwind CSS**. The dashboard provides admins with the ability to manage products, filter them, and view detailed analytics. 

The solution is highly modular, scalable, and can be extended with additional features like user management, advanced analytics, or a more sophisticated authentication system in the future.

---


## Acknowledgements

- [Fake Store API](https://fakestoreapi.com/) for providing a simple and free API to use in this project.
- [Next.js](https://nextjs.org/) for the amazing framework and documentation.
- [Clerk](https://clerk.com) for simplifying authentication and the retaining the user session.
