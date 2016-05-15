# Front-end architecture demo

This is a demo app made for the front-end architecture workshop at Hypothesis'
developers May 2016 meeting in Berlin.

This is a simple app intended to show several of the main concepts behind
modern front-end architecture, which are intended to make it possible to write
sophisticated applications that are:

 * Reliable
 * Fast
 * Easy to extend
 * Easy to test
 * Support architecture and/or code re-use across multiple environments

These concepts include:

 * A UI built from a tree of re-usable components

 * Components which are pure functions that take state as input and return
   the view structure as output

 * App state stored as an immutable object in a central store,
   updated via a pattern similar to event-sourcing

The example uses [React](https://reactjs.org) and [Redux](http://redux.js.org/) because they are well suited
to this architecture but it is important to note that there are many
recent and not-so-recent view libraries which could also be used (Angular,
Ember).

