import express, { json } from "express";
import pkg from 'joi';
const { object, string } = pkg;
const app = express();
const PORT = 3000;
app.use(json());

const courses = [
  { id: 1, course: "course1" },
  { id: 2, course: "course2" },
  { id: 3, course: "course3" },
];

app.get("/", (req, res) => {
  res.send("hello world!!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const _id = req.params.id;
  const course = courses.find((c) => c.id === parseInt(_id));

  if (!course) return res.status(404).send("Could find course with id " + _id);

  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  if (Number(req.params.year) < 2020) {
    res.send(req.query);
  } else {
    res.send("<h1>It is what it is</h1>");
  }
});

app.post("/api/courses", (req, res) => {
  const { error, value } = validateCourse(req.body);

  if (error) return res.status(400).send(error.message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const _id = req.params.id;
  const course = courses.find((c) => c.id === parseInt(_id));

  if (!course) return res.status(404).send(`The course with the given ID ${_id} cannot be found`);

  const { error, value } = validateCourse(req.body);
  if (error) return res.status(400).send(error.message);

  course.course = req.body.name;
  res.send(course);
});




app.delete('/api/courses/:id', (req, res) => {
    const _id = req.params.id;
    const course = courses.find((c) => c.id === parseInt(_id));
    if (!course) return res.status(404).send(`The course with the given ID ${_id} cannot be found`);

    const index = courses.indexOf(course)
    courses.splice(index,1)

    return res.status(200).send(course)


})

function validateCourse(course) {
  const schema = object({
    name: string().min(3).required(),
  });

  const result = schema.validate(course);

  return result;
}
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
