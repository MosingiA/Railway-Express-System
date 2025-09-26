from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from sqlalchemy.orm import joinedload
from server.models import db, Station, Train, TrainRoute, Passenger, Ticket, User


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///railway.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
CORS(app, origins=["http://localhost:3000", "http://localhost:5173"])

@app.route('/')
def home():
    return {'message': 'Railway Management System API'}

class Stations(Resource):
    def get(self):
        stations = [station.to_dict() for station in Station.query.all()]
        return stations, 200

    def post(self):
        data = request.get_json()
        station = Station(name=data['name'], city=data['city'])
        db.session.add(station)
        db.session.commit()
        return station.to_dict(), 201

class Trains(Resource):
    def get(self):
        trains = [train.to_dict() for train in Train.query.all()]
        return trains, 200

    def post(self):
        data = request.get_json()
        train = Train(
            name=data['name'],
            capacity=data['capacity'],
            departure_time=data['departure_time']
        )
        db.session.add(train)
        db.session.commit()
        return train.to_dict(), 201

class Passengers(Resource):
    def get(self):
        passengers = [passenger.to_dict() for passenger in Passenger.query.all()]
        return passengers, 200

    def post(self):
        data = request.get_json()
        passenger = Passenger(
            name=data['name'],
            age=data['age'],
            phone_number=data['phone_number']
        )
        db.session.add(passenger)
        db.session.commit()
        return passenger.to_dict(), 201

class Tickets(Resource):
    def get(self):
        tickets = Ticket.query.options(joinedload(Ticket.passenger), joinedload(Ticket.train)).all()
        return [ticket.to_dict() for ticket in tickets], 200

    def post(self):
        data = request.get_json()
        ticket = Ticket(
            passenger_id=data['passenger_id'],
            train_id=data['train_id'],
            from_station=data['from_station'],
            to_station=data['to_station'],
            payment_method=data['payment_method'],
            price=data['price']
        )
        

    # Handle payment status
        if data['payment_method'] == 'cash':
            ticket.payment_status = 'confirmed'
        elif data['payment_method'] == 'stk_push':
            ticket.payment_status = 'confirmed'  # Simulate confirmation
        else:
            ticket.payment_status = 'pending'
        
        db.session.add(ticket)
        db.session.commit()
        return ticket.to_dict(), 201

class TicketById(Resource):
    def get(self, id):
        ticket = Ticket.query.get_or_404(id)
        return ticket.to_dict(), 200

    def patch(self, id):
        ticket = Ticket.query.get_or_404(id)
        data = request.get_json()

        for key, value in data.items():
            setattr(ticket, key, value)

        db.session.commit()
        return ticket.to_dict(), 200

    def delete(self, id):
        ticket = Ticket.query.get_or_404(id)
        db.session.delete(ticket)
        db.session.commit()
        return {'message': 'Ticket deleted successfully'}, 200
class Login(Resource):
    def post(self):
        data = request.get_json()

        if not data.get('email') or not data.get('password'):
            return {'message': 'Email and password required'}, 400
        
        # Check against database users
        user = User.query.filter_by(email=data['email']).first()
        
        if user and user.password == data['password']:
            return {'message': 'Login successful', 'user': user.to_dict()}, 200
        
        return {'message': 'Invalid credentials'}, 401
class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()

            user = User(
                name=data['name'],
                email=data['email'],
                password=data['password'],
                age=data['age'],
                phone_number=data['phone_number']
            )
            db.session.add(user)
            db.session.commit()

            return {'message': 'User created successfully'}, 201
        except Exception as e:
            return {'message': str(e)}, 400

# Add routes
api.add_resource(Stations, '/stations')
api.add_resource(Trains, '/trains')
api.add_resource(Passengers, '/passengers')
api.add_resource(Tickets, '/tickets')
api.add_resource(TicketById, '/tickets/<int:id>')
api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')
if __name__ == '__main__':
    app.run(debug=True, port=5555)
