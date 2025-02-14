# Todo App with Next.js and React Query

A modern Todo application built with **Next.js** and **React Query**, integrated with the [JSONPlaceholder](https://jsonplaceholder.typicode.com) API. Features real-time CRUD operations with optimistic updates.

[Live Demo](https://todo-app-next-two-omega.vercel.app/) | [GitHub Repository](https://github.com/schyrva/todo-app-next)

## Features

- Create, edit, and delete todos
- Optimistic UI updates
- Responsive design
- Error handling and loading states
- Type-safe implementation

## Tech Stack

- **Next.js**
- **React Query**
- **Tailwind CSS**
- **TypeScript**
- **JSONPlaceholder**

## Getting Started

1. Clone repo:  
`git clone https://github.com/schyrva/todo-app-next.git`
2. Install dependencies:  
`npm install`
3. Start dev server:  
`npm run dev`

Visit `http://localhost:3000`

## API Integration

Uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) endpoints:
- `GET /todos?_limit=10`
- `POST /todos`
- `PUT /todos/{id}`
- `DELETE /todos/{id}`

*Note: Changes are mocked (not persisted) per API behavior.*

## License

MIT © [Stanislav Chyrva]. Contributions welcome.