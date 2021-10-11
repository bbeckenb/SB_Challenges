const App = () => (
    <div>
        <Person 
            name="chillicheesedawg"
            age={49}
            hobbies={['magnets', 'trees', 'monkeys']}
        />
        <Person 
            name="bernard"
            age={12}
            hobbies={['banana', '3', 'pizza']}
        />
        <Person 
            name="parkerson"
            age={237}
            hobbies={['sarfing tha wehb', 'pardies', 'kites']}
        />
    </div>
)

ReactDOM.render(<App /> , document.getElementById("root"))