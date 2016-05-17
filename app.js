// List of actions that can happen in the app
var TEAM_CHANGED = 'TEAM_CHANGED';
var SET_FILTER = 'SET_FILTER';
var LIKE_MEMBER = 'LIKE_MEMBER';
var FOCUS_MEMBER = 'FOCUS_MEMBER';

/** Update the state of the app when a given `action` occurs. */
function update(state, action) {
  switch (action.type) {
    case TEAM_CHANGED:
      return Object.assign({}, state, {team: action.team});
    case SET_FILTER:
      return Object.assign({}, state, {filter: action.filter});
    case LIKE_MEMBER:
      return Object.assign({}, state, {
        likedMembers: state.likedMembers.concat(action.member),
      });
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

/** Render an individual team member. */
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

/** Return true if a team member matches a search filter string. */
function matchesFilter(filter, member) {
  var haystack = [member.name,
                  member.role,
                  member.description].join('\n');
  return haystack.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
}

function sortAndFilterTeam(filter, team) {
  var matches = team;
  if (filter) {
    matches = team.filter(member => matchesFilter(filter, member));
  }
  return matches.sort((a,b) => a.name.localeCompare(b.name));
}

/** Render a list of Hypothesis team members. */
function MemberList(props) {
  var matches = sortAndFilterTeam(props.filter, props.team);

  return <ul className="member-list">
    {matches.map(member => (
      <MemberDetails
        key={member.id}
        isLiked={props.likedMembers.includes(member.id)}
        name={member.name}
        description={member.description}
        photoUrl={member.photoUrl}
        role={member.role}
        onLike={() => props.dispatch({type: LIKE_MEMBER, member: member.id})}
      />
    ))}
  </ul>
}

/** Render a thumbnail of a team member. */
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

/**
 * Render a scrollable list of Hypothesis team members' thumbnails with
 * a card below the member showing the selected member's full details.
 */
function MemberCarousel(props) {
  var matches = sortAndFilterTeam(props.filter, props.team);
  var focusedMember = props.team.find(m => m.id === props.focusedMember);

  return (
    <div>
      <div className="member-carousel">
      {matches.map(member => (
        <MemberIcon
          key={member.id}
          isLiked={props.likedMembers.includes(member.id)}
          name={member.name}
          role={member.role}
          photoUrl={member.photoUrl}
          onClick={() => props.dispatch({type: FOCUS_MEMBER, member: member.id})}
          />
      ))}
      </div>
      {focusedMember ?
        <MemberDetails
          key={focusedMember.id}
          isLiked={props.likedMembers.includes(focusedMember.id)}
          name={focusedMember.name}
          description={focusedMember.description}
          photoUrl={focusedMember.photoUrl}
          role={focusedMember.role}
          onLike={() => props.dispatch({type: LIKE_MEMBER, member: focusedMember.id})}/>
      : null}
    </div>);
}

/** The root of our UI */
function App(props) {
  var {state, dispatch} = props;

  // Select the type of view to use for our list
  var MemberListView = MemberCarousel;

  return <div className="app">
    <h1 className="title">Die Hypothesis Team</h1>
    <input 
      placeholder="Filter..."
      onInput={e => dispatch({type: SET_FILTER, filter: e.target.value})}
    />
    <MemberListView
      filter={state.filter}
      team={state.team}
      likedMembers={state.likedMembers}
      dispatch={store.dispatch}
      focusedMember={state.focusedMember}
    />
  </div>;
}

// Update the UI when the app state changes
var store = Redux.createStore(update);
store.subscribe(() => {
  var container = document.getElementById('app');
  var state = store.getState();

  ReactDOM.render(<App
    state={store.getState()}
    dispatch={store.dispatch}
  />, container);
});

fetch('hypothesis-team.json')
  .then(response => response.json())
  .then(team => store.dispatch({type: TEAM_CHANGED, team: team}))
  .catch(err => console.error('Could not fetch the team', err));

