import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import NewProject from "./pages/NewProject";
import Projects from "./pages/Projects";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        // Header
        <header className="flex items-center justify-between w-full p-4">
          <h1 className="text-2xl text-white">My App</h1>
          <nav>
            <ul className="flex space-x-4 text-white">
              <li>
                <Button variant="ghost">Home</Button>
              </li>
              <li>
                <Button variant="ghost">Projects</Button>
              </li>
              <li>
                <Button variant="ghost">About</Button>
              </li>
            </ul>
          </nav>
        </header>
        // Main content
        <main className="flex-grow flex items-center justify-center">
          
          <Routes>
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/projects" element={<Projects />} />

          <Route path="/about" element={<div>About</div>} />
        </Routes>
        </main>
        // Footer
        <footer className="w-full p-4 bg-black">
          <p className="text-center text-white">© 2023 My App</p>
        </footer>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
