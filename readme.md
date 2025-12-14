# 🌐 Real-Time Collaborative Document Editor

## 🚀 Introduction

This project implements a fully functional, real-time collaborative text editor, mirroring the capabilities of modern tools like Google Docs. It allows multiple users to simultaneously edit the same document across different machines, achieving instantaneous updates and seamless conflict resolution.

> The core innovation lies in the utilization of a **Conflict-free Replicated Data Type (CRDT)** to ensure consistency and prevent data loss during concurrent editing sessions.

---

## ✨ Features

### Account and Security Management

- **User Registration & Authentication**: Secure registration and login functionality for user accounts.
- **Role-Based Access Control (RBAC)**: Documents are protected by owner and shared permissions.
- **Session Management**: JWT-based authentication secures REST and WebSocket endpoints.
- **Enhanced User Feedback**: Implemented **Toast Notifications** (Snackbars) for clear, non-intrusive feedback on successful logins, registrations, file creations, and renaming actions.

### Document & File Operations

- **Comprehensive File Management**: Users can create new documents, open existing ones, rename titles, and permanently delete files.
- **Fine-Grained Sharing**: Documents can be shared with other users, granting explicit `VIEW` or `EDIT` permissions.
- **Ownership Security**: Only the document owner has the authority to permanently delete the file.
- **Document Listing**: Users can view a categorized list of all documents they own or that have been shared with them.
- **Advanced Filtering**: Added **Search and Live Filtering** capability on the homepage, allowing users to quickly find documents by **Title** or **Owner** name.
- **Visual Access Indicators**: Implemented **Visual Permission Badges** on each document pill (`OWNER`, `CAN EDIT`, `CAN VIEW`) for immediate clarity on the current user's access level.

### Real-Time Collaborative Engine

- **Concurrent Editing Support**: Multiple users can insert, delete, and format text simultaneously without requiring centralized locking or coordination.
- **Real-time Cursor Tracking**: Users see the live cursor positions and selections of all other active editors.
- **Active User Display**: Real-time broadcast of users currently connected to and editing the document.
- **Basic Text Formatting**: Supports real-time application and synchronization of **bold** and _italic_ formatting.

---

## ▶️ Demo/Screenshots

---

#### Login view

![](/Images/Login.PNG)

#### Sign up view

![](/Images/Signup.PNG)

#### Homepage

![](/Images/Homepage.PNG)

#### Edit Page

![](/Images/EditPage.PNG)

#### Share with other users

![](/Images/ShareWithOthers.PNG)

#### Other User Homepage

![](/Images/OtherHomepage.PNG)

#### Collaborative Editing

![](/Images/OtherUserView.png)

#### Realtime Viewing For Active Users

![](/Images/ViewActiveUsers.PNG)

---

## 🏗️ Project Architecture

The system follows a decoupled, two-tier architecture designed for high throughput and real-time responsiveness.

---

### Backend (Java/Spring Boot)

- **Core Logic**: Managed by a Spring Boot application.
- **Data Persistence**: Uses an SQL Database (H2/MSSQL) for storing user and document metadata, and serializes the CRDT model for content persistence.
- **Real-time Communication**: Implements **STOMP Web Sockets** for low-latency, bi-directional communication of edits, cursors, and active users.
- **Conflict Resolution**: The `CrdtManagerService` orchestrates the loading, saving, and operational transformation of documents using the **CRDT** model.

### Frontend (React.js)

- **Text Editor**: Utilizes **Quilljs** for rich text editing capabilities.
- **CRDT Integration**: A custom integration with Quill manages local changes, transforms them into CRDT operations, and applies incoming remote operations from the WebSocket stream.
- **UI/UX**: Built with React.js and Tailwind CSS for a modern, intuitive interface.

---

## 💻 Tech Stack

| Component                | Technology                                | Rationale                                                                                    |
| :----------------------- | :---------------------------------------- | :------------------------------------------------------------------------------------------- |
| **Backend Framework**    | Java, Spring Boot                         | Robust, enterprise-grade foundation for scalable API and WebSocket services.                 |
| **Real-Time Layer**      | STOMP Web Sockets, Spring Messaging       | Provides reliable, low-latency, pub/sub communication for instant updates.                   |
| **Conflict Resolution**  | CRDT (Custom Implementation)              | The algorithm guaranteeing eventual consistency and correctness for concurrent edits.        |
| **Persistence**          | Spring Data JPA, SQL Database (H2/MSSQL)  | Reliable data storage for user accounts and document metadata.                               |
| **Frontend Library**     | React.js                                  | Component-based structure for dynamic and maintainable user interfaces.                      |
| **Editor Library**       | Quilljs, `quill-cursors`                  | Powerful editor foundation with dedicated support for cursor and selection synchronization.  |

---

## ⚙️ Algorithm: Conflict-free Replicated Data Type (CRDT)

The collaborative core of this application is a **CRDT** that models the document as a _doubly linked list_ of characters (Items). This approach allows operations to be applied in any order across different clients while ensuring that all replicas eventually converge to the exact same state.

---

### CRDT Item Structure

Each character in the document is encapsulated in an `Item` object, which includes positional and metadata properties:

- **Node ID**: Unique identifier, structured as `operationNumber@username` (e.g., `3@your_name`).
- **Content**: The actual character or content being stored.
- **Left/Right Pointers**: The IDs of the preceding and succeeding `Item` nodes in the list.
- **Formatting Flags**: `isbold` and `isitalic` for state tracking.
- **Deletion Flag**: `isdeleted` to logically remove a character without losing its ordering information (Tombstone pattern).

### Insertion Logic

When a new character is inserted, its position is determined based on the IDs of its surrounding characters:

1.  **Unique ID Generation**: A new ID (`counter@username`) is generated locally for the new character.
2.  **Vector Clocks / Tiebreaker**: The system uses the **username** as a tiebreaker. When two users insert at the same logical position, the one with the lexicographically higher username is assigned a higher priority, ensuring a deterministic ordering across all clients.
3.  **Local Application & Broadcast**: The new item is placed in the local CRDT map, and the operation is immediately broadcast over the WebSocket.

### Deletion and Formatting

- **Deletion**: Instead of physical removal, the `isdeleted` flag is set to `true` (a Tombstone), and the operation is broadcast. The character is logically removed during rendering, but its ID remains to preserve the global order.
- **Formatting**: Applying bold or italic involves finding the item's unique ID and setting the corresponding flag, which is then broadcast as a "format" operation.

---

## Diagrams

### System Architecture

![alt text](/Diagrams/01_system_arch.png)

### Workflow

![](/Diagrams/02_workflow.png)

### UML/ERD

![](/Diagrams/03_UML.png)

### Core CRDT

![](/Diagrams/04_CRDT.png)

<br>

## 🛠️ How to Run

1.  **Clone the repository:**
        `sh
    git clone <Your-Repository-URL>
    `
2.  **Start the Backend (Java/Spring Boot):**
        `sh
    cd Online-Collaborative-Text-Editor/backend
    ./gradlew build
    ./gradlew bootRun
    `
3.  **Start the Frontend (React.js):**
        `sh
    cd ../frontend
    npm i
    npm run dev
    `
4.  Open your web browser and navigate to the host link provided by Vite (typically `http://localhost:5173`).

---

## 👤 Author

- [Atharva Salitri](https://github.com/the-amazing-atharva/)
