var TEAM_CHANGED = 'TEAM_CHANGED';

function update(state, action) {
  switch (action.type) {
    case TEAM_CHANGED:
      return Object.assign({}, state, {team: action.team});
    default:
      return {
        team: [],
        filter: '',
        likedMembers: [],
        focusedMember: null,
      };
  }
}

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

function render(state, dispatch) {
  var container = document.getElementById('app');
  ReactDOM.render(<App team={state.team}/>, container);
}

var store = Redux.createStore(update);
store.subscribe(() => render(store.getState(), store.dispatch));

fetch('hypothesis-team.json')
  .then(response => response.json())
  .then(team => store.dispatch({type: TEAM_CHANGED, team: team}))
  .catch(err => console.log('error'));

