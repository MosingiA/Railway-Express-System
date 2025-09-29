# Railway Express System

A full-stack railway management application built with Flask and React. This system allows users to book train tickets, manage passengers, and provides admin functionality for managing trains and stations.

##  Live Demo

- **Frontend**: [https://railway-express-system-imjf.vercel.app/]
- **Backend API**: [https://railway-express-system-2-ni6u.onrender.com]

##  Features

- **User Authentication**: Secure login and registration system
- **Train Management**: Browse available trains and schedules
- **Ticket Booking**: Book tickets with different payment options
- **Passenger Management**: Manage passenger information
- **Admin Dashboard**: Administrative controls for trains and stations
- **Real-time Updates**: Live booking and availability updates

## Tech Stack

**Frontend:**
- React 
- React Router (navigation)
- Formik & Yup (form handling and validation)
- CSS (styling)
- Vite (build tool)

**Backend:**
- Flask (Python web framework)
- SQLAlchemy (database ORM)
- Flask-RESTful (API development)
- Flask-CORS (cross-origin requests)
- SQLite/PostgreSQL (database)

##  Database Models

The application uses 6 main database models:

1. **User** - User account information
2. **Station** - Railway station details
3. **Train** - Train information and schedules
4. **Passenger** - Passenger details for bookings
5. **TrainRoute** - Links trains to stations with pricing
6. **Ticket** - Booking records and payment status

## 🚀 Getting Started



### Backend Setup
```bash
cd server
pip install -r requirements.txt
python seed.py
python app.py
```

### Frontend Setup
```bash
cd Railway-express
npm install
npm run dev
```

##  API Endpoints

**Authentication:**
- `POST /login` - User login
- `POST /signup` - User registration

**Data Management:**
- `GET/POST /stations` - Station operations
- `GET/POST /trains` - Train operations
- `GET/POST /passengers` - Passenger operations
- `GET/POST/PATCH/DELETE /tickets` - Ticket operations

##  Environment Variables

Create a `.env` file in the frontend directory:
```
VITE_API_URL=https://railway-express-system-2-ni6u.onrender.com
```

##  Project Structure

```
Railway-Express-System/
├── server/                 # Backend Flask application
│   ├── app.py             # Main Flask app
│   ├── models.py          # Database models
│   ├── seed.py            # Sample data
│   └── requirements.txt   # Python dependencies
├── Railway-express/        # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── Pages/         # Page components
│   │   └── config.js      # API configuration
│   └── package.json       # Node dependencies
└── README.md
```

##  Deployment

**Frontend (Vercel):**
1. Fork this repository
2. Connect to Vercel
3. Set root directory to `Railway-express`
4. Add environment variable: `VITE_API_URL`
5. Deploy

**Backend (Render):**
1. Connect the repository to Render
2. Set root directory to `server`
3. Build command: `pip install -r requirements.txt`
4. Start command: `gunicorn app: app`

##  Test Credentials

Use these credentials to test the application:
- **Email**: afya@gmail.com
- **Password**: 123456



## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author
Afya Mosingi, Ivvy.
HAPPY CODING!
