# dentoro

## **The Problem** :no_entry_sign: :-

- Patients find it hard to book an appointment in a dental clinic, they would make a call, or they would come to the clinic to book an appointment, and sometimes they would come to it and wait in a queue to meet the doctor without any previous booking.

- The Dentist faces hardships to manage patients' appointments, their payment schedules, and their history manually.That would cause huge problems like wasting some time and effort and tripling some customers with the repeated data requests. Doctors encounter these problems to track the patients' histories, and all of these operations are done with paperwork that is not durable.

## **The solution** :bulb: :-

- Use the technology to create a smooth and tidy system, also employment its advantages in durability by creating a web application to provide the specific requirements include a booking form and database history for every patient. So that saves time and effort for the dentist and helps the patients with their reservation for an appointment.

## **User Stories**  :books: :-

- As a patient, I want to book an appointment at a specific time and date and personal details like a name and birthday. So I can save my time and effort.
- As a dentist, I want a table to display all the schedules for the day so I can manage them IRL.
- As a dentist, I want to view the history of any patient I have. So I can track any of their health status and payment.
- As a patient, I want to be able to view the patient's info. So I can contact them.
- As a dentist, I want to view the patient's balance, and how much money they get paid, so I can ask him for more or give some back to him.
- As a dentist, I can search for a patient to view its history. So I can know of all previous treatment, payment, and visiting dates.
- As a dentist, I can search for a patient in the booking list - calendar, so I can choose the patient and enter its details like treatment and cure - etc, or delete and edit its appointment.
- As a dentist, I can add the treatment or the cure as a text, its price, and the actual payment to the current patient. The patients will be removed from the queue, and all of their data will be stored in the database.
- As a dentist, I can delete or edit the patient's appointment. So I can do it when needed.

## **User Journey**  :pencil2: :-

- As a patient, I can see the main page with a login button and a (book now) button, Also there is some basic info about the clinic.
- As a patient, I can click on the (book now) button, then a form will appear and will ask me for my info and the time of the appointment.
- as a dentist, I can see the dashboard with three options (Today's Schedule, calendar, patients).
- The Today's Schedule option will present the schedule of this day, and showing all the patients on this day with delete - edit - history options.
- The calendar is presenting all the appointments of the patients and a search bar to go through all of them.
- The patient's option is presenting the info of the registered patients in the clinic database and a search bar to go through all of them.
- If I click on a patient's name, it shows all the history for him with the profile data and a form to enter the new data (operation) and the payment.

## **Prototype**

[View Prototype](https://www.figma.com/proto/mL8QfRpfZywsgNCpXzhBtX/DENTAL?node-id=0%3A1&scaling=min-zoom&page-id=0%3A1)
![dentoro](https://user-images.githubusercontent.com/62717875/112746910-ce22ac80-8fba-11eb-99f9-857214f75df8.png)

## **How to Launch App Locally** :-

*  clone this repo by typing this command in the terminal:  
`git clone https://github.com/GSG-G9/dentoro.git`

*  Run `npm i` to install the packages for the app as general.

*  Run `cd client` and `npm i` to install the packages for client- React Js.

### Database Setup  :clipboard:

make sure you have installed postgreSQL and pgcli 

```sql=
CREATE DATABASE {database name};
CREATE USER {user name} WITH superuser password {password}
ALTER DATABASE {database name} OWNER TO {user name};

```
- Test db:
- Do the same as before but make sure to change the names.

* Run the following command in the database pgcli terminal  
`\i server/database/config/build.sql`
and the command 
`\i server/database/config/fakeData.sql`
to add fake Data

### **Environment variables:**
Environment variables are one of the ways we keep our product safe. If you want to access our app locally you will need to add your own.
- create .env file
- add your Environment variables
```sh
DEV_DB_URL= # Your development PostgreSQL connect
DATABASE_URL= # Your production PostgreSQL connect
SECRET_TOKEN= # Your token Secret key
```

### Start the App :electric_plug:

To start the App Locally you can start server First then start client side or vice versa!
> To run Server, In your terminal Type: 

    `npm run dev` then you should be able to go to [localhost](http://localhost:5000/) 
> To run client side, In your terminal Type:    

    `cd client` => `npm start` then you will be able to run [localhost](http://localhost:3000/) 

Now you can view the app live in the Browser!

You can use this email amd password for testing only

- Email:`someemail@admin.com`
- Password:`password`

## **Technologies** :computer: :-

- BackEnd: **Node JS & Express JS**
- FrontEnd: **React JS**
- Database: **PostgreSQL**
- Styling: **CSS**
- Libraries: **AntDesign**

## **Lead Mentor** :sunglasses::-

- Muhammad Abdulhadi

## **Team Members** :-

- Hassan Elnajjar
- Alaa Alser
- Alaa Shurrab

## **Resources** :-

- [Node Js](https://nodejs.org/en/)
- [React Js](https://reactjs.org/)
- [Express](http://expressjs.com/)
- [Ant Design](https://ant.design/)
- [Yup library](https://github.com/jquense/yup) 