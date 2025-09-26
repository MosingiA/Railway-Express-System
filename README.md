# Railway Express System

A full-stack railway management application built with Flask and React. This project was developed as part of my software engineering bootcamp to demonstrate proficiency in modern web development technologies.

## What This Project Does

Railway Express System helps manage railway operations by providing tools for train scheduling, ticket booking, and passenger management. Users can book tickets for different train routes, while administrators can manage trains, stations, and view booking analytics.

## Key Features

- User registration and authentication
- Browse available trains and routes
- Book tickets with different payment options
- Admin dashboard for managing trains and stations
- Real-time ticket booking system
- Passenger information management

## Technologies Used

**Backend:**
- Flask (Python web framework)
- SQLAlchemy (database ORM)
- Flask-RESTful (API development)
- Flask-CORS (cross-origin requests)
- SQLite (database)

**Frontend:**
- React (user interface)
- React Router (navigation)
- Formik & Yup (form handling and validation)
- CSS(styling)
- Vite (build tool)

## Database Structure

The application uses six main database models:

1. **User** - Stores user account information
2. **Station** - Railway station details
3. **Train** - Train information and schedules
4. **Passenger** - Passenger details for bookings
5. **TrainRoute** - Links trains to stations with pricing
6. **Ticket** - Booking records and payment status

**Relationships:**
- Users can have multiple tickets
- Trains operate on multiple routes
- Passengers can book multiple tickets
- TrainRoute connects trains and stations with additional data like price and arrival time

## Getting Started

### Running the Backend
```bash
cd server
pipenv install
pipenv shell
python seed.py
python app.py
```

### Running the Frontend
```bash
cd Railway-express
npm install
npm run dev
```

### Access the Application
- Backend API: http://localhost:5555
- Frontend: http://localhost:5173

### Test Login
Use these credentials to test the application:
- Email: afya@gmail.com
- Password: 123456

## API Endpoints

**Authentication:**
- POST /login - User login
- POST /signup - Create new account

**Data Management:**
- GET/POST /stations - Station operations
- GET/POST /trains - Train operations
- GET/POST /passengers - Passenger operations
- GET/POST/PATCH/DELETE /tickets - Ticket operations

## Project Structure

```
Railway-Express-System/
├── server/
│   ├── app.py              # Main Flask application
│   ├── models.py           # Database models
│   ├── seed.py             # Sample data
│   └── requirements.txt    # Python dependencies
├── Railway-express/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── Pages/          # Page components
│   │   └── App.js          # Main React app
│   └── package.json        # Node dependencies
└── README.md
```



## Future Improvements

- Add real payment gateway integration
- Implement email notifications for bookings
- Add train seat selection feature
- Create mobile-responsive design
- Add booking history and analytics

## Deployment

This application can be deployed using:
- **Frontend**: Vercel 
- **Backend**: Render 
- **Database**: PostgreSQL for production use



## License

MIT License 
