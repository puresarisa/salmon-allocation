# Salmon Allocation Interface

This Website was developed to help manage and allocate salmon stock to customers, featuring an automatic allocation system.

## Demo

A live demo of the application can be found here: [Live Demo Link](https://sarisa-salmon-allocation.vercel.app)

## Key Features

- **Auto Allocation:** The system automatically allocates salmon based on order priority.
- **Manual Allocation:** Users can manually edit the allocated quantity of salmon.
- **Real-time Stock Update:** Displays the remaining salmon stock and the total value of allocated orders in real time.
- **Infinite Scrolling:** Loads more order data when scrolling down, improving performance.

## Detailed Allocation Logic

The core allocation algorithm follows specific business rules to ensure efficiency and fairness:

- **Order Priority**: Orders are processed based on a predefined priority: `EMERGENCY` > `OVER_DUE` > `STANDARD` > `NEW`.
- **Fair First-Pass Allocation**: The system first attempts to distribute at least one item to every customer with an order, if feasible, before proceeding with the full allocation.
- **Smart Validation**: Manual and auto-allocations are strictly validated against customer credit limits and the global remaining stock. An error modal will appear if these constraints are violated.

## Technologies Used

- **React:** For building the user interface (UI).
- **TypeScript:** Adds type safety to the codebase.
- **Tailwind CSS:** For designing and styling the application's user interface.

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
