import User from "./User";

const About = () => {
  return (
    <div className="flex flex-col items-center m-4 p-3">
      <h1 className="font-bold text-2xl">About Me</h1>
      <User />
    </div>
  );
};

export default About;
