// Code to extract details from the team members page at
// https://hypothes.is/team
//
// Navigate to the team URL, paste the code below into the console
// and copy the result to hypothesis-team.json

function details(el) {
  var name = el.querySelector('.modal-title').textContent.trim();
  var photoUrl = el.querySelector('.modal-body img').src;
  var description = el.querySelector('.modal-body p').textContent.trim();
  var role = el.querySelector('.modal-body h5').textContent.trim();
  var id = name.replace(/\s+/g,'-').toLowerCase();

  return {id, name, role, photoUrl, description};
}

var team = Array.from(document.querySelectorAll('.modal-content'))
  .map(el => details(el))

console.log(JSON.stringify(team, null, 2));
