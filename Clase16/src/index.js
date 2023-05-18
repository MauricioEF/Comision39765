import usersModel from './models/user.js';
import studentsModel from './models/students.js';
import coursesModel from './models/courses.js';
import mongoose from 'mongoose';

const context = async () => {
  const connection = await mongoose.connect(
    'mongodb+srv://CoderUser:123@clustercitofeliz.m6oxtjj.mongodb.net/mongoAvanzado?retryWrites=true&w=majority'
  );
  // const info = await usersModel.find({last_name:'McGeechan'}).explain('executionStats');
  // console.log(info);

  //Crear un curso
  const course = {
      title:"Data Science",
      description:"Qué inteligente es la Data science",
      professor:"Mauricio Missael"
  }
  await coursesModel.create(course);

  //Creamos un estudiante
  // const student = {
  //     first_name:"Lucas",
  //     last_name:"Fernandez",
  //     email:"correoLU@correo.com",
  //     gender:'Male'
  // }

  // await studentsModel.create(student);

  //Agregamos el producto al estudiante.
  // const studentId = '6464e4f8a992fe35dcbfd3b0';
  // const courseId = '6464e92e4f15ed708b2c2fe3';

  // await studentsModel.updateOne(
  //   { _id: studentId },
  //   { $push: { courses: { course: new mongoose.Types.ObjectId(courseId) } } }
  // );

    const student = await studentsModel.find()
    console.log(JSON.stringify(student,null,'\t'));
};

context();
