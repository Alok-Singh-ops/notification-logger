import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="text-white">
      <Link
        to={"http://localhost:3000/v1/auth/github/callback"}
        target="_blank"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login with Github
      </Link>
    </div>
  );
};

export default Login;
