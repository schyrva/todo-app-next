# Todo App with Next.js and React Query

This is a simple Todo application built with **Next.js**, **React Query**, and **Tailwind CSS**. The app allows users to add, edit, and delete tasks. The data is managed locally using a mock API, but the structure is designed to easily integrate with a real backend.

## Features

- **Add Tasks**: Users can add new tasks with a title.
- **Edit Tasks**: Users can edit existing tasks.
- **Delete Tasks**: Users can delete tasks.
- **Optimistic Updates**: The app uses optimistic updates for a smooth user experience.
- **Responsive Design**: The app is fully responsive and works on all screen sizes.

## Demo

You can check out the live demo of the app [here](https://todo-app-next-two-omega.vercel.app/).

## GitHub Repository

The source code for this project is available on [GitHub](https://github.com/schyrva/todo-app-next).

---

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/schyrva/todo-app-next.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser and visit:**

   ```bash
   http://localhost:3000
   ```

## Project Structure

- **app/**: Contains the main application pages and components.
- **components/**: Reusable components like AddTask, Task, and TodoList.
- **api/**: Mock API functions for managing todos.
- **types/**: TypeScript interfaces for the todo items.
- **public/**: Static assets like images.
- **styles/**: Global styles and Tailwind configuration.
- **providers/**: React Query provider for managing server state.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React Query**: A library for managing server state and caching.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **TypeScript**: A typed superset of JavaScript for better developer experience.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is open-source and available under the MIT License.