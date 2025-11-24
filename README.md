# 📱 Pokedex Application

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)

> A modern, scalable Pokedex application built with Clean Architecture principles, featuring advanced state management and custom hooks.



## 🔍 About the Project

This **Pokedex** was developed not just to display Pokemon data, but to challenge myself in building a robust frontend architecture. The project leverages **React + Vite** and **TypeScript** to ensure type safety and performance.

I focused heavily on **Clean Code** and **Modularity**, separating business logic from UI components through the use of specialized Custom Hooks. The design features a modern "Glassmorphism" aesthetic (GlassButton) and a fully responsive layout.

## ✨ Key Features

* **Advanced Filtering:** Filter Pokemon by their specific elemental types (Fire, Water, Grass, etc.) instantly.
* **Dynamic Pagination:** Loads Pokemon in batches of 10 to ensure optimal performance.
* **Detailed View:** Dedicated page for specific Pokemon stats and information.
* **Modern UI:** Custom UI components including a Glassmorphism button design.
* **Unit Testing:** Code reliability ensured with Jest.

## 🏗️ Custom Hooks & Architecture

One of the main goals of this project was to abstract logic into reusable **Custom Hooks**. This keeps the components clean and focused solely on rendering.

### 1. `usePokemonList` (Pagination)
Handles the fetching of the main list. It implements logic to fetch **10 Pokemon at a time**, managing loading states and pagination offsets efficiently.

### 2. `usePokemonTypes` (Type Filter & Navigation)
Responsible for fetching and managing all available Pokemon types. Upon selection, it triggers the rendering of a **specialized view ("Filtered Home")**, displaying exclusively the Pokemon belonging to that specific elemental type (e.g., a "Fire-only" grid).

### 3. `usePokemonDetails` (Specific Data)
Handles the data fetching for a single, specific Pokemon. It manages the unique URL parameters to retrieve detailed stats, abilities, and sprites for the details page.

## 🛠️ Tech Stack

* **Core:** React, TypeScript, Vite
* **Styling:** Styled Components (CSS-in-JS)
* **State Management:** Context API
* **Routing:** React Router DOM
* **Testing:** Jest
* **Data Source:** [PokeAPI](https://pokeapi.co/)

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
Make sure you have **Node.js** installed.

### Installation

1. Clone the repository:
  ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)

2. Install dependencies:

    npm install

3. Run the development server:

    npm run dev

4. Run Tests :
    npm run test
```

### Data Flow Architecture

```mermaid
graph TD
    %% Styles
    classDef api fill:#ffcb05,stroke:#2a75bb,stroke-width:2px,color:#2a75bb,font-weight:bold;
    classDef hooks fill:#e1f5fe,stroke:#0277bd,stroke-width:2px,color:#000;
    classDef ui fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000;
    classDef ui_filtered fill:#e1bee7,stroke:#4a148c,stroke-width:2px,color:#000,stroke-dasharray: 5 5;

    %% Nodes
    API((PokeAPI)):::api

    subgraph Logic ["⚡ Custom Hooks (Logic Layer)"]
        direction TB
        H1(usePokemonList):::hooks
        H2(usePokemonTypes):::hooks
        H3(usePokemonDetails):::hooks
    end

    subgraph View ["🖥️ UI Components (Presentation)"]
        direction TB
        UI1[Home / Standard Grid]:::ui
        UI2[Type Filter Component]:::ui
        UI3[Details Page / Modal]:::ui
        
        %% Novo nó para representar o "Novo Home"
        UI_F[Filtered Home / Type View]:::ui_filtered
    end

    %% Connections
    API -->|Fetch Batch| H1
    API -->|Fetch All Types| H2
    API -->|Fetch ID/Name| H3

    H1 -->|Returns 10 Pokemon| UI1
    H2 -->|Returns Types List| UI2
    H3 -->|Returns Stats & Sprites| UI3
    
    %% A correção principal está aqui:
    UI2 == Select Type ==> UI_F
    H2 -.->|Fetch Specific Type Data| UI_F
```
<p align="center"> Made with  by <a href="https://github.com/IsraelPina32">Israel Pina</a> </p>
