const Joi = require('joi');
const express = require('express');

const app = express();

// Middleware
app.use(express.json());

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

// Functions
// Joi Validation
const validateCourse = (course) => {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}


// Routes

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
  res.send([1, 2, 3]);
});

app.get('/api/courses/:id', (req, res) => {
  // res.send(req.params.id);   
  // res.send(req.query);        --> For query string paramter

  let course = courses.find(course => course.id === parseInt(req.params.id));
  if(!course) {
    // 404
    res.status(404).send('The course with de given Id was not found');
    return;
  }

  res.send(course);
});

app.post('/api/courses', (req, res) => {
  // Joi Validation
  const schema = {
    name: Joi.string().min(3).required()
  };

  const result = Joi.validate(req.body, schema);

  if(result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  // Simple Validation
  if (!req.body.name || req.body.name.length < 3) {
    // 400 Bad Request
    res.status(400).send('Name is required and should be minimum 3 characters');
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  // Look up the course
  // If not existing, return 404
  let course = courses.find(course => course.id === parseInt(req.params.id));
  if(!course) {
    // 404
    res.status(404).send('The course with de given Id was not found');
    return;
  }

  // Validate
  // If invalid, return 404 - Bad request
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Update course
  // Return the updated course
  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  // Look up the course
  // Not existing, return 404
  let course = courses.find(course => course.id === parseInt(req.params.id));
  if(!course) {
    // 404
   return res.status(404).send('The course with de given Id was not found');
  }

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return the same course
  res.send(course);

});


// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
