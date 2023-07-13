

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from models import db, User, Dessert, Recipe
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)
CORS(app)


@app.route('/api/search', methods=['POST'])
def search():
    dessert_name = request.form.get('dessert_name')
    recipes = Recipe.query.join(Dessert).filter(Dessert.name == dessert_name).all()
    results = [{'name': recipe.name, 'description': recipe.description, 'ingredients': recipe.ingredients, 'photo': recipe.photo} for recipe in recipes]
    return jsonify({'results': results})


#definimos rutas
#buscar todas las recetas de un postre
@app.route("/explore/<dessert_name>", methods = ['GET'])
def desserts(dessert_name):
    if request.method == 'GET':
       desserts_obtained = db.Dessert.query.filter_by(name = dessert_name).all()
       dessert_ids = [dessert.id for dessert in desserts_obtained]
       recipes_obtained = [recipe for recipe in db.Recipe.query.filter(db.Recipe.dessert_id  in dessert_ids).all()]
       return jsonify(recipes_obtained)

#cuando escoje una receta de un postre      
@app.route("/explore/<dessert_name>/<recipe_name>", methods = ['GET'])
def recipes(recipe_name):
    if request.method == 'GET':
        recipe_obtained = db.Recipe.query.filter_by(name = recipe_name).all()
        return jsonify(recipe_obtained)
    return 'SUCCESS'


#actualizar datos que tienen igual nombre en User y Receta
@app.route("/explore/my_acount/<account_id>", methods = ['GET','PUT'])
def account(account_id):
    if request.method == 'UPDATE':
        account_obtained = db.User.query.get_or_404(account_id)
        account_obtained.description = request.get_json()['description']
        account_obtained.username = request.get_json()['username']
        db.session.commit()
    return 'SUCCESS'
    
@app.route("/signup", methods=['POST'])
def signup():
    if request.method == 'POST':
        new_user = User(username = request.get_json()['username'], 
        description = request.get_json()['description'], 
        password = request.get_json()['password'])
        db.session.add(new_user)
        db.session.commit()
    response_data = {'response':'SUCCESS'}
    return jsonify(response_data),200


#post para poder enviar body
@app.route("/signin", methods=['POST'])
def signin():
    if request.method == 'POST':
        user = User.query.filter_by(username=request.get_json()['username'], 
                                    password=request.get_json()['password']).first()                         
        if user:
            response_data = {'response':'SUCCESS'}
            return jsonify(response_data),200
        else:
          response_data = {'response':'ERROR', 'message': 'This user does not exist. Sign Up please'}
          return jsonify(response_data)
        

        
        
@app.route("/users", methods=['GET'])
def get_users():
    users = User.query.all()
    list_names = [user.username for user in users]
    return jsonify(list_names)

@app.route("/desserts", methods=['GET', 'POST'])
def get_desserts():
    if request.method == 'GET':
        desserts = Dessert.query.all()
        #desserts_names = [dessert.name for dessert in desserts]
        return jsonify(desserts)
    elif request.method =='POST':
        new_dessert = Dessert(name=request.get_json()['name'])
        db.session.add(new_dessert)
        db.session.commit()
    response_data = {'response':'SUCCESS'}
    return jsonify(response_data),200
        



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)