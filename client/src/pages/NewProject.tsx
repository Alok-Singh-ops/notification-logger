import { buttonVariants } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NewProject = () => {
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchRepos(token);
    }
  }, []);

  const fetchRepos = async (token: string) => {
    try {
      const res = await fetch("http://localhost:3000/repo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRepos(data);
    } catch (err) {
      console.error("Failed to fetch repos:", err);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#121212] text-white p-4 border-[.5px] border-gray-100 rounded-lg shadow-md w-[50rem]">
      <h1 className="text-4xl font-bold mb-4">Import a Git repo</h1>
      <p className="text-lg mb-8">Get started by creating a new project.</p>
      {
        repos.length === 0 &&  <div className="mb-4 bg-[#2E2E2E]">
        <Link
          target="_blank"
          to="http://localhost:3000/auth/github"
          className={buttonVariants({ variant: "outline", className: "text-black" })}
        >
          <Github className="mr-2" />
          Authenticate with GitHub
        </Link>
      </div>
      }
    
      {repos.length > 0 && (
        <div className="mt-6 w-full">
          <h2 className="text-xl font-semibold mb-2">Your Repositories:</h2>
          <ul className="list-disc pl-6">
            {repos.map((repo: any) => (
              <li key={repo.id} className="text-gray-300">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NewProject;
