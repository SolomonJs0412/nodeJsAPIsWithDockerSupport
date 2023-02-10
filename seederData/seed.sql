CREATE DATABASE IF NOT EXISTS patientsdb;

USE patientsdb;

DROP TABLE IF EXISTS patientsdb;

CREATE TABLE patients
(
id bigint unsigned not null auto_increment,
fist_name varchar(255) default null, 
last_name varchar(255) default null,
email varchar(255) default null, 
address varchar(255) default null, 
diagnosis varchar(255) default null, 
phone varchar(30) default null, 
status varchar(30) default null, 
created_at timestamp default current_timestamp, 
image_url varchar(255) default null,
primary key(id),
constraint UQ_Patients_Email unique (email)
) auto_increment = 1;