function Gif(props) {
  return <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Under_construction_graphic.gif"/>
}

function App(props) {
  return <div>
    <Gif/>
    <Gif/>
  </div>;
}

var container = document.getElementById('app');

ReactDOM.render(<App/>, container);
