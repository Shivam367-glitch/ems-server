# Event Management Server

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Shivam367-glitch/ems-server
```

### 2. Navigate to the server directory

```bash
cd server
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file in the project root

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
LIMIT=10
```

- `PORT` – Port on which the server will run.
- `MONGO_URI` – MongoDB connection string.
- `LIMIT` – Number of events to return per page for pagination.

### 5. Start the server

```bash
npm run dev
```

The backend server will start on:

```
http://localhost:5000
```

## API Base URL

```
http://localhost:5000/api/events
```