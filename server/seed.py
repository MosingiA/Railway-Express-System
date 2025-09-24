from app import app
from models import db, Station, Train, TrainRoute, Passenger, Ticket, User

with app.app_context():
    # Clear existing data
    Ticket.query.delete()
    TrainRoute.query.delete()
    Passenger.query.delete()
    Train.query.delete()
    Station.query.delete()
    User.query.delete()

    # Create stations
    stations = [
        Station(name="Nairobi Central", city="Nairobi"),
        Station(name="Mombasa Terminus", city="Mombasa"),
        Station(name="Nakuru Station", city="Nakuru"),
        Station(name="Kisumu Station", city="Kisumu"),
    ]

    # Create trains
    trains = [
        Train(name="Madaraka Express", capacity=300, departure_time="08:00"),
        Train(name="Safari Express", capacity=250, departure_time="14:00"),
        Train(name="Lake Express", capacity=200, departure_time="10:00"),
    ]

    db.session.add_all(stations + trains)
    db.session.commit()

    # Create train routes
    routes = [
        TrainRoute(train_id=1, station_id=1, price=1500.0, arrival_time="08:00"),
        TrainRoute(train_id=1, station_id=2, price=1500.0, arrival_time="13:30"),
        TrainRoute(train_id=2, station_id=1, price=1200.0, arrival_time="14:00"),
        TrainRoute(train_id=2, station_id=3, price=1200.0, arrival_time="17:00"),
        TrainRoute(train_id=3, station_id=1, price=1800.0, arrival_time="10:00"),
        TrainRoute(train_id=3, station_id=4, price=1800.0, arrival_time="16:00"),
    ]

    # Create sample passengers
    passengers = [
        Passenger(name="John Doe", age=30, phone_number="0712345678"),
        Passenger(name="Jane Smith", age=25, phone_number="0723456789"),
    ]

    db.session.add_all(routes + passengers)
    db.session.commit()

    # Create sample users
    users = [
            User(name="afya", email="afya@gmail.com", password="123456", age=24, phone_number="0700000000"),
        User(name="ivvy", email="ivvy@gmail.com", password="654321", age=25, phone_number="0711111111"),
    ]

    db.session.add_all(users)
    db.session.commit()

    # Create sample tickets
    tickets = [
        Ticket(passenger_id=1, train_id=1, from_station="Nairobi Central", to_station="Mombasa Terminus", payment_method="cash", payment_status="confirmed", price=1500.0),
        Ticket(passenger_id=2, train_id=2, from_station="Nairobi Central", to_station="Nakuru Station", payment_method="stk_push", payment_status="confirmed", price=1200.0),
    ]

    db.session.add_all(tickets)
    db.session.commit()

    print(":white_check_mark: Railway database seeded successfully!")
    print(f"Created {len(stations)} stations, {len(trains)} trains, {len(routes)} routes, {len(passengers)} passengers, and {len(tickets)} tickets")