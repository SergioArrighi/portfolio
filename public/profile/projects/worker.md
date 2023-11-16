# Worker
## Introduction
Worker is a complex system for smart working desk reservation, power management and tracking.
It is composed by several pieces of software:

- **worker-app-db**
NestJS/MongoDB backend exposing a rich REST API with JWT/API key authentication and role-based authorisation.
- **worker-ui**
React/MaterialUI user interface heavily based on Devexpress library providing user and admin features.
- **worker-feed**
NestJS backend interacting with a RabbitMQ broker message to collect usage and power consumption data.
- **worker-board**
Arduino based firmware piloting a circuit with up to 64 RFID readers and 64 relays that interacts with the system activating power lines per configuration

