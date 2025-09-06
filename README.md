# Salmon Allocation App

This application was developed to help manage and allocate salmon stock to customers, featuring an automatic allocation system and a data randomization system for simulation.

## Key Features

- **Auto Allocation:** The system automatically allocates salmon based on order priority.
- **Manual Allocation:** Users can manually edit the allocated quantity of salmon.
- **Real-time Stock Update:** Displays the remaining salmon stock and the total value of allocated orders in real time.
- **Infinite Scrolling:** Loads more order data when scrolling down, improving performance.

## Technologies Used

- **React:** For building the user interface (UI).
- **TypeScript:** Adds type safety to the codebase.
- **Tailwind CSS:** For designing and styling the application's user interface.
- **Git:** For version control and collaboration.

## Installation and Running the Project

Follow these steps to run the application on your local machine:

1.  **Clone repository:**

    ```
    git clone https://github.com/puresarisa/salmon-allocation.git
    cd salmon-allocation

    ```

2.  **Install dependencies:**

    ```
    npm install

    ```

3.  **Run the application:**

    ```
    npm run dev

    ```

The application will automatically open in your browser at `http://localhost:3000`or `http://localhost:5173`.

## Folder Structure

This project uses a modular folder structure for better code organization:

- `src/`: The main source code folder.

  - `components/`: Contains all React components related to the UI (`Header.tsx`, `OrderCard.tsx`, etc.).
  - `utils/`: Contains various helper functions not directly related to the UI (`allocationUtils.ts`, `helpers.ts`).
  - `mockData.ts`: Contains mock data for orders, customers, and products.
