from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'User'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    prof_pic = db.Column(db.String, nullable=True)
    description = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<User: {self.username}>'
    
    def check_password(self, password):
        return self.password==password

class Dessert(db.Model):
    __tablename__ = 'Dessert'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"Dessert: {self.name}"

class Recipe(db.Model):
    __tablename__ = 'Recipe'

    name = db.Column(db.String, nullable=False)
    dessert_id = db.Column(db.Integer, db.ForeignKey('Dessert.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), primary_key=True)
    description = db.Column(db.String)
    ingredients = db.Column(db.String)
    photo = db.Column(db.String)

    dessert_r = db.relationship('Dessert', backref="Recipe")
    user_r = db.relationship('User', backref="Recipe")

    def __repr__(self):
        return f"Recipe: {self.name}"