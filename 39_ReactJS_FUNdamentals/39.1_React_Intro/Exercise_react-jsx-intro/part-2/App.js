const App = () => (
    <div>
        <Tweet 
            username="billybobberton" 
            name="cheese"
            date={Date()}
            message="Wow!" 
        />

        <Tweet 
            username="darthTater" 
            name="chip"
            date={Date()}
            message="Hey There!!" 
        />

        <Tweet 
            username="cheeseNchips" 
            name="daryl"
            date={Date()}
            message="Holy canoli!" 
        />
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"));
