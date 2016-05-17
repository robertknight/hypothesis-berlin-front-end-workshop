function MemberIcon(props) {
  return <a href=""
    onClick={e => {e.preventDefault(); props.onClick()}}
    className="member-thumbnail">
    <img className="member-thumbnail__img" src={props.photoUrl}/>
    <div className="member-thumbnail__caption">
      <div className="member-thumbnail__name">{props.name}</div>
      <div className="member-thumbnail__description">{props.role}</div>
    </div>
  </a>;
}

function MemberCarousel(props) {
  return <div className="member-carousel">
   {props.team.map(member => (
      <MemberIcon
        key={member.id}
        photoUrl={member.photoUrl}
        name={member.name}
        role={member.role}
        onClick={() => alert(member.description)}
      />
    ))}
  </div>;
}

function App(props) {
  return <div>
    <MemberCarousel team={props.team}/>
  </div>
}

function render(team) {
  var container = document.getElementById('app');
  ReactDOM.render(<App team={team}/>, container);
}

fetch('hypothesis-team.json')
  .then(response => response.json())
  .then(team => render(team))
  .catch(err => console.log('error'));

