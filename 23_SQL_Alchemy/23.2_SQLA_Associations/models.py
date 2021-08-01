

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

# MODELS GO BELOW

class Department(db.Model):
    """Department Model"""

    __tablename__ = "departments"

    dept_code = db.Column(db.Text, primary_key=True)
    dept_name = db.Column(db.Text, nullable=False, unique=True)
    phone = db.Column(db.Text)

    employees = db.relationship('Employee') # sets up reference so we can query associated data from the Employee model

    def __repr__(self):
        return f"<Department {self.dept_code} {self.dept_name} {self.phone}>"

class Employee(db.Model):
    """Employee Model"""

    __tablename__ = "employees"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    state = db.Column(db.Text, nullable=False, default='CA')
    dept_code = db.Column(db.Text, db.ForeignKey('departments.dept_code')) #db.ForeignKey('reference_table_name.ref_column') sets up foreign key
    dept = db.relationship('Department') # sets up reference so we can query associated data from the Department model
    # dept = db.relationship('Department', backref='employees') # can refactor the above line and the db.relationship line in the Department class through 'backref'

    def __repr__(self):
        return f"<Employee {self.name} {self.state} {self.dept_code}>"


def get_directory():
    all_emps = Employee.query.all()

    for emp in all_emps:
        if emp.dept is not None:   
            print(emp.name, emp.dept.dept_name, emp.dept.phone)
        else:
            print(emp.name)