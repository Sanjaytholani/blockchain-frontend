import Navbar from "./Navbar";
import Post from "./Post";
import Questions from "./Questions";

const Landing = () => {
  return (
    <div className="w-screen">
      <Navbar />
      <Post />
      <Questions />
    </div>
  );
};

export default Landing;
