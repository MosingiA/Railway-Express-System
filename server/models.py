from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
import random
import string

db = SQLAlchemy()

class Station(db.Model, SerializerMixin):
    __tablename__ = 'stations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)

    train_routes = db.relationship('TrainRoute', back_populates='station')

    serialize_rules = ('-train_routes.station',)

class Train(db.Model, SerializerMixin):
    __tablename__ = 'trains'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    departure_time = db.Column(db.String(10), nullable=False)

    tickets = db.relationship('Ticket', back_populates='train')
    train_routes = db.relationship('TrainRoute', back_populates='train')

    serialize_rules = ('-tickets.train', '-train_routes.train')

class Passenger(db.Model, SerializerMixin):
    __tablename__ = 'passengers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)

    tickets = db.relationship('Ticket', back_populates='passenger')

    serialize_rules = ('-tickets.passenger',)

    @validates('age')
    def validate_age(self, key, age):
        if age < 0 or age > 120:
            raise ValueError("Age must be between 0 and 120")
        return age

class TrainRoute(db.Model, SerializerMixin):
    __tablename__ = 'train_routes'

    id = db.Column(db.Integer, primary_key=True)
    train_id = db.Column(db.Integer, db.ForeignKey('trains.id'), nullable=False)
    station_id = db.Column(db.Integer, db.ForeignKey('stations.id'), nullable=False)
    price = db.Column(db.Float, nullable=False)
    arrival_time = db.Column(db.String(10))

    train = db.relationship('Train', back_populates='train_routes')
    station = db.relationship('Station', back_populates='train_routes')

    serialize_rules = ('-train.train_routes', '-station.train_routes')

class Ticket(db.Model, SerializerMixin):
    __tablename__ = 'tickets'

    id = db.Column(db.Integer, primary_key=True)
    ticket_number = db.Column(db.String(10), unique=True, nullable=False)
    passenger_id = db.Column(db.Integer, db.ForeignKey('passengers.id'), nullable=False)
    train_id = db.Column(db.Integer, db.ForeignKey('trains.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    from_station = db.Column(db.String(100), nullable=False)
    to_station = db.Column(db.String(100), nullable=False)
    payment_method = db.Column(db.String(20), nullable=False)
    payment_status = db.Column(db.String(20), default='pending')
    price = db.Column(db.Float, nullable=False)

    passenger = db.relationship('Passenger', back_populates='tickets')
    train = db.relationship('Train', back_populates='tickets')
    user = db.relationship('User', back_populates='tickets')

    serialize_rules = ('-passenger.tickets', '-train.tickets', '-user.tickets')

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.ticket_number:
            self.ticket_number = self.generate_ticket_number()

    def generate_ticket_number(self):
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)

    tickets = db.relationship('Ticket', back_populates='user')

    serialize_rules = ('-password', '-tickets.user')

    @validates('age')
    def validate_age(self, key, age):
        if age < 1 or age > 120:
            raise ValueError("Age must be between 1 and 120")
        return age

    @validates('phone_number')
    def validate_phone(self, key, phone):
        if not phone.isdigit() or len(phone) != 10:
            raise ValueError("Phone number must be exactly 10 digits")
        return phone