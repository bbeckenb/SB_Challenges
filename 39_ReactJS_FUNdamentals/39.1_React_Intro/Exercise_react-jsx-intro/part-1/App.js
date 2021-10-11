const App = () => (
    <div>
        <FirstComponent />
        <NamedComponent name="cheese" />
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"));