import axios from 'axios'
import { Axis3DIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const Projects = () => {
  const [repos, setRepos] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  React.useEffect(() => {
    // token from url params
    const urlParams = new URLSearchParams(window.location.search)
    const tokenFromUrl = urlParams.get("token")
    const fetchRepos = async () => {
      try {
        const res = await fetch("http://localhost:3000/repo", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) {
          throw new Error("Failed to fetch repos")
        }
        const data = await res.json()
        setRepos(data)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    }
    if (tokenFromUrl || token) {
      localStorage.setItem("token", tokenFromUrl || "")
      fetchRepos()
    }
    else{
      navigate("/new-project")
    }
  
 
  }, [token])
  if (loading) {
    return <div>Loading...</div>
  }

  const handleWebhook = async (repoName: string,repoOwner:string) => {
    let data = JSON.stringify({
      "name": "web",
      "active": true,
      "events": [
        "push",
        "pull_request"
      ],
      "config": {
        "url": "https://b99c-160-202-36-84.ngrok-free.app/webhook",
        "content_type": "json",
        "insecure_ssl": "0"
      }
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.github.com/repos/${repoOwner}/${repoName}/hooks`,
      headers: { 
        'Accept': 'application/vnd.github+json', 
        'Authorization': `Bearer ${token}`, 
        'X-GitHub-Api-Version': '2022-11-28', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    const res = await axios.request(config)
    console.log(res.data);


  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Your Repositories:</h1>
      {repos.length === 0 ? (
        <div>No repositories found.</div>
      ) : (
        <ul className="list-disc pl-6">
          {repos.map((repo: any) => (
            <li key={repo.id} className="text-gray-300">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              <button
                onClick={()=>{
                  handleWebhook(repo.name,repo.owner.login)
                }}
                >
                Add Webhook
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Projects