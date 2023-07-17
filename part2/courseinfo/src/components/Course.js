const Course = ({course}) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

const Header = ({text}) => {
  return (
    <h2>{text}</h2>
  );
}

const Content = ({parts}) => {
  return (
    <>
      { parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />) }
    </>
  );
}

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  );
}

const Total = ({parts}) => {
  const total = parts.reduce((partialSum, part) => partialSum + part.exercises, 0);
  return (
    <b><p>total of {total} exercises</p></b>
  );
}

export default Course;
