import { createContext, useState, useContext, useEffect } from 'react';

// TODO: Create the ProjectsContext
const ProjectsContext = createContext(); // Replace with createContext()

// Custom hook for using projects
export const useProjects = () => {
  // TODO: Implement similar to useTheme
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used with ProjectsProvider')
  }
  return context; // TODO: Return the context
};

export const ProjectsProvider = ({ children }) => {
  // TODO: Create state for projects, loading, and error
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Implement useEffect to fetch projects when component mounts
  // Remember to:
  // 1. Create an async function inside useEffect
  // 2. Handle loading states
  // 3. Handle errors with try/catch
  // 4. Implement cleanup to prevent race conditions
  useEffect(() => {
    let isCancelled = false;
  
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
  
        // TODO: Fetch from 'http://localhost:3001/projects'
        const response = await fetch('http://localhost:3001/projects');
        if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      if (!isCancelled) {
        setProjects(data);
      }

        // Check if response is ok
        // Parse JSON
        // Update state only if not cancelled
      } catch (err) {
        // TODO: Handle error only if not cancelled
        if (!isCancelled) {
        setError(err.message);
      }
    } finally {
      if (!isCancelled) {
        setLoading(false);
      }
    }
  };
  
    fetchProjects();
  
    // Cleanup function
    return () => {
      isCancelled = true;
    };
  }, []);

  // TODO: Create addProject function
  const addProject = async (projectData) => {
    try {
      const response = await fetch('http://localhost:3001/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(projectData),
});
    if (!response.ok) {
      throw new Error('Failed to add project')
    }
    const newProject = await response.json();
    setProjects(currentProjects => [...currentProjects, newProject]);
      // POST request to API
      // Update local state on success
    } catch (error) {
      // Handle error
      setError(error.message)
    }
  };

  // TODO: Create updateProject function
  const updateProject = async (id, updates) => {
    // PUT request to API
    try {
      const response = await fetch(`http://localhost:3001/projects/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updates),
});
    // Update local state
if (!response.ok) {
      throw new Error('Failed to update project')
    }
    const updatedProject = await response.json();

    setProjects(currentProjects =>
      currentProjects.map(project =>
        project.id === id ? updatedProject : project
      )
    );

    } catch (error) {
    setError(error.message);
  }
};



  // TODO: Create deleteProject function
  const deleteProject = async (id) => {
    // DELETE request to API
    // Update local state

    try {
    const response = await fetch(`http://localhost:3001/projects/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }

    setProjects(currentProjects =>
      currentProjects.filter(project => project.id !== id)
    );
  } catch (error) {
    setError(error.message);
  }
};

  // TODO: Create the value object
  const value = {
    // Add all state and functions here
  projects,
  loading,
  error,
  addProject,
  updateProject,
  deleteProject,
  }

  // TODO: Return the Provider
  return (
  <ProjectsContext.Provider value={value}>
    {children}
  </ProjectsContext.Provider>
);
};