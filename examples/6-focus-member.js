var TEAM_CHANGED = 'TEAM_CHANGED';
var FOCUS_MEMBER = 'FOCUS_MEMBER';

function update(state, action) {
  switch (action.type) {
    case TEAM_CHANGED:
      return Object.assign({}, state, {team: action.team});
    case FOCUS_MEMBER:
      return Object.assign({}, state, {focusedMember: action.member});
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

function MemberDetails(props) {
  var classes = ["member-details", props.isLiked ? "is-liked" : null].join(' ');
  return <li className={classes}>
    <img src={props.photoUrl} className="member-details__photo" />
    <div className="member-details__container">
      <h2 className="member-details__name">{props.name}</h2>
      <h3 className="member-details__role">{props.role}</h3>
      <div className="member-details__description">{props.description}</div>
      {props.isLiked ?
          null
        : <button onClick={() => props.onLike()}>Genehmigen</button>
      }
    </div>
  </li>;
}

function MemberCarousel(props) {
  var focusedMember = props.team.find(m => m.id === props.focusedMember);

  return <div>
    <div className="member-carousel">
     {props.team.map(member => (
        <MemberIcon
          key={member.id}
          photoUrl={member.photoUrl}
          name={member.name}
          role={member.role}
          onClick={() => props.dispatch({type: FOCUS_MEMBER, member: member.id})}
        />
      ))}
    </div>
    {focusedMember ?
      <MemberDetails
        key={focusedMember.id}
        name={focusedMember.name}
        description={focusedMember.description}
        photoUrl={focusedMember.photoUrl}
        role={focusedMember.role}
        onLike={() => props.dispatch({type: LIKE_MEMBER, member: focusedMember.id})}/>
      : null}
  </div>
}

function App(props) {
  return <div className="app">
    <MemberCarousel
      focusedMember={props.state.focusedMember}
      team={props.state.team}
      dispatch={props.dispatch}/>
  </div>
}

function render(state, dispatch) {
  var container = document.getElementById('app');
  ReactDOM.render(<App state={state} dispatch={dispatch}/>, container);
}

var store = Redux.createStore(update);
store.subscribe(() => render(store.getState(), store.dispatch));

fetch('hypothesis-team.json')
  .then(response => response.json())
  .then(team => store.dispatch({type: TEAM_CHANGED, team: team}))
  .catch(err => console.log('error'));

