// Component using JSX syntax
function HelloWorldJSX(props) {
  return <div title="A label">
    <b>Hello</b><i>World</i>
  </div>;
}

// Component using plain JS
function HelloWorldPlain(props) {
  return React.createElement('div', {title: "A label"},
    React.createElement('b', {}, 'Hello'),
    React.createElement('i', {}, 'World')
  );
}

// Component using plain JS and no helper functions
function HelloWorldReallyPlain(props) {
  return {
    type: 'div',
    $$typeof: Symbol.for('react.element'), // nb. This is a security feature
    props: {
      title: 'A label',
      children: [{
        type: 'b',
        $$typeof: Symbol.for('react.element'),
        props: {children: 'Hello'},
      },{
        type: 'i',
        $$typeof: Symbol.for('react.element'),
        props: {children: 'World'},
      }],
    },
  };
}

var container = document.getElementById('app');

ReactDOM.render(<HelloWorldJSX/>, container);
