# Worker

## Introduction

Worker is a complex system for smart working desk reservation, power management and tracking.

It is composed by several pieces of software:

-  **worker-app-db**

NestJS/MongoDB backend exposing a rich REST API with JWT/API key authentication and role-based authorisation.

-  **worker-ui**

React/MaterialUI user interface heavily based on Devexpress library providing user and admin features.

-  **worker-feed**

NestJS backend interacting with a RabbitMQ broker message to collect usage and power consumption data.

-  **worker-board**

Arduino based firmware piloting a circuit with up to 64 RFID readers and 64 relays that interacts with the system activating power lines per configuration  

## Business case

The system is geared towards those businesses or organizations which embraced the smart working philosophy and are sensible to consumption optimization and tracking.

### Desk reservation as iCal appointments
 - Using a calendar interface, the user can simply reserve a desk by creating an appointment as per iCalendar standard.
 - The business intelligence module applies the defined rules and proposes a list of desks.
 - The user expresses his preferences by sorting the provided list through drag and drop and confirms.
 - The system computes a solution to cover all the occurrences of the appointment by booking the desks as per expressed preference.

### On premise hardware module
 - An hardware module, controlling a set of relays, with a set of RFID/NFC readers is installed in the premises of the organization
 - The user authenticates with a badge and the hardware module