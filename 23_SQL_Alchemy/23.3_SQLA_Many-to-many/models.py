from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from sqlalchemy.sql.schema import ForeignKey

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
    assignments = db.relationship('EmployeeProject', backref='employee')
    # This set up allows us to connect to another table (Projects in this case) through an intermediary table (employees_projects in this case), then backref to the desired end-destination
    # Can still have access to the middle table as well, useful in some cases
    projects = db.relationship('Project', secondary='employees_projects', backref='employees')
    def __repr__(self):
        return f"<Employee {self.name} {self.state} {self.dept_code}>"


def get_directory():
    all_emps = Employee.query.all()

    for emp in all_emps:
        if emp.dept is not None:   
            print(emp.name, emp.dept.dept_name, emp.dept.phone)
        else:
            print(emp.name)

def get_directory_join():
    directory = db.session.query(
        Employee.name, Department.dept_name, Department.phone).join(Department).all()
# returns tuples
    for name, dept, phone in directory:
        print(name, dept, phone)

def get_directory_join_class():
    directory = db.session.query(
        Employee, Department).join(Department).all()
# returns Employee and Department objects
    for emp, dept in directory:
        print(emp.name, dept.dept_name, dept.phone)

def get_directory_all_join():
    directory = db.session.query(
        Employee.name, Department.dept_name, Department.phone).outerjoin(Department).all()
# returns tuples
    for name, dept, phone in directory:
        print(name, dept, phone)

class Project(db.Model):
    """Model for projects done by employees!"""
    __tablename__ = 'projects'

    proj_code = db.Column(db.Text, primary_key=True)
    proj_name = db.Column(db.Text, nullable=False, unique=True)
    assignments = db.relationship('EmployeeProject', backref='project') 

class EmployeeProject(db.Model):
    """Relational table connecting employees table to projects table"""

    __tablename__ = 'employees_projects'
    emp_id = db.Column(db.Integer, db.ForeignKey('employees.id'), primary_key=True)
    # can set multiple columns to primary key to make sure there are always unique combinations
    proj_id = db.Column(db.Text, db.ForeignKey('projects.proj_code'), primary_key=True)

    role = db.Column(db.Text)

