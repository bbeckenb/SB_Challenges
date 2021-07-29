from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# best practice to create function to establish connection and only call it once
def connect_db(app):
    db.app = app
    db.init_app(app)


# MODELS GO BELOW
class Pet(db.Model):
    __tablename__ = 'pets' #specify table name through SQLAlchemy
    #decide on column name, then call db.column, then specify type in form 'db.type'      

    id = db.Column(db.Integer, 
                        primary_key=True,
                        autoincrement=True) #serial in sql

    name = db.Column(db.String(50),
                        nullable=False,
                        unique=True)

    species = db.Column(db.String(30), nullable=True)

    hunger = db.Column(db.Integer, nullable=False, default=20)

    @classmethod #use class methods to set up queries
    def get_by_species(cls, species):
        return cls.query.filter_by(species=species).all()

    @classmethod
    def get_all_hungry(cls):
        return cls.query.filter(Pet.hunger > 20).all()

    def __repr__(self):
        p=self
        return f"<Pet id={p.id} name={p.name} species={p.species} hunger={p.hunger}>"

    def greet(self):
        return f"I'm {self.name} the {self.species}"

    def feed(self, amt=20):
        """Updates hunger based odd of amt"""
        self.hunger -= amt
        self.hunger = max(self.hunger, 0)

#need to run db.create_all() one time so you are not recreating the table once data is stored in it
#when we create new instances of our Model class, we add the instance/s w/ db.session.add(instance_name), then 'commit' it to the db with db.session.commit()
    #Like staging with Git
    #serialized id and default values only get returned when we perform commits

#Create object based off model class, if we want it do exist in the database, we db.sessionadd(name_instance), then db.session.commit()
#need to have error handling for duplicates and other database/SQL constraints
    #If you add an instance of a model to the staging area then commit it and it gives you an error, that item will remain in the staging area and block other instances you want to add
        #In this situation, you need to perform db.session.rollback() to clear the staging area

# Querying - new syntax Class.query creates a 'query object', can run methods on this
    # Class.query.all() gets all in the table in a list
    # Class.query.get(#) assumes primary key, will grab whatever item has specified id
    # Class.query.filter_by(column=filter_criteria, column2=filter_criteria2) need to append .all() or .first() to make query run
        # great for when your criteria comparator is '='
    # append .first() to get first when filtering
    # Class.query.filter(column (==, >, <, etc.) filter_criteria).all() creates boolean mask
        # ex: Pet.query.filter(Pet.species == 'cat', Pet.hunger == 20).all()
    # Fetching records
        # .one() error if 0 or >1 items are returned
        # .first(), gets first record or None
        # .all() returns all records as list
        # .get(pk) returns whatever primary key (pk)
        # .one_or_none() gets first record, error if >1, None if 0

# .delete()
    # ex: Pet.query.filter_by(hunger=57).delete() 
    # Don't need to Pet.session.add() because we are not staging new objects, SQL Alchemy already knows about instances we are deleting
    # db.session.commit()
    # NOTE: can db.session.rollback() before we db.session.commit() to undo deletes, once changes are made to database, they are permanent

