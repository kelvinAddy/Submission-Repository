const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      <Part part={parts[0].name} exercise={parts[0].exercise} />
      <Part part={parts[1].name} exercise={parts[1].exercise} />
      <Part part={parts[2].name} exercise={parts[2].exercise} />
    </>
  );
};

const Total = ({ parts }) => {
  const a = parts[0].exercises;
  const b = parts[1].exercises;
  const c = parts[2].exercises;
  return <p>Number of exercises {a + b + c}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamental of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of the component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
