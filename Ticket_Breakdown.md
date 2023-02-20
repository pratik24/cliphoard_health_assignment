# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1
-  title - Backend changes to allow facilities to add custom id
- description:
    - Adding new table facility_agent_custom_field with columns (id, facility_id, agent_id, custom_id) with foreign key on facility_id and agent_id and unique key on (facility_id, custom_id). We have to create a separate table as Agents could be working in multiple facility and we want to capture multiple custom_id for each agents per facility.
    - Rest API to add/update custom_id for agent by facility.
    - adding custom id in agent metadata for getShiftsByFacility function
    - Service unit test cases and Rest API test cases for Invalid input, validation for unique custom id per facility, successful creation of entry.
    - Unit test for CRUD operations in new table facility_agent_custom_field.
    - Update getShiftsByFacility unit test to also check for custom id.
    - Check getShiftsByFacility also returns custom id data as well of agents and update accordingly.
Estimated hours - 12-14 hours
Acceptance criteria - Test cases passing, Working API to create entry in facility_agent_custom_field. Unique custom_id per agent of facilty. 

Ticket 2
- ticket - Frontend changes to allow facilities to add custom id
- description:
    - New view/modal to add and update custom id with form and button
    - Integration of add/update custom id API.
    - Message display on successful entry or error when it fails to updates
Estimated hours - 8-10 hours
Acceptance criteria - Facilities can input and save custom IDs for Agents, they can see proper error message if they use duplicate custom_id for agent    

Ticket 3
- ticket - Update report to include custom id
- description:
    - Update generateReport to also include custom id of agent in report if that is present. 
    - It might happen that for some agents there is primary id and custom id for others.
    - Add distinguisher before ids like facility_custom_id# if it is custom id
    - Update generateReport test cases
Estimated hours - 4-5 hours
Acceptance criteria - When facilities download the report they should be able to see custom id for agents instead of internal db ids     
