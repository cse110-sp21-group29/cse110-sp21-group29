# Decision of Metadata

* Status: Approved (Never Implemented)
* Deciders: All members of group 29
* Date: 2021-05-23

## Context and Problem Statement

The decision of what metadata to include for entries in our BuJo (this ADR specifically for the inclusion of recurring metadata for events)

## Considered Options

* Inclusion of recurring metadata for events
* Exclusion of recurring metadata for events

## Decision Outcome

Chosen option: Inclusion of recurring metadata for events
Decesion made based on: The consideration of how this inclusion can be usefull for our target audience (college students)

## Pros and Cons of the Options

### Inclusion of recurring metadata for events

* Good, as college students typically have recurring events like lectures, gym classes, work related events, etc
* Good, enable for easy inclusion of recurring events
* Bad, complicates adding information for the user

### Exclusion of recurring metadata for events

* Good, makes implementation of data less intrusive for user
* Bad, user is must then set each session of recurring event manually 
* Bad, less information that can be analyized by the development team

### Reasons that Recurring Metadata was Excluded from current build

* Recurring Metadata was a feature the time wanted to add however, due to the unforseen complexity of integrated the front end and backend the feature was scrapped
* Time constraints of the project timeline, the feature was seen by the team as user friendly to our target audience. However, getting the web app to function properly (debugging) and to seemlessly save data to the database took precedence.