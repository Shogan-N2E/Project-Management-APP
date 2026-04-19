import { useState } from "react";

import NewProject from "./Components/NewProject";
import NoProjectSelected from "./Components/NoProjectSelected";
import ProjectSidebar from "./Components/ProjectSideBar";
import SelectedProject from "./Components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {  //task under the project
    setProjectState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
        
      }
    });
  }

  function handleDeleteTask(id) {
      setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id)
      }
    })
  }

  function handleDeleteProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId)
      }
    })
  }

  function handleSelectProject(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    });
  }
//when we click the project sidebar add project button, we want to retrieve ID on that project.

  function handleStartAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    });
  }
  //lifting state up to Add.jsx to make it available to NewProject.jsx and ProjectSidebar.jsx

  function handleCancelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    });
  }
//when we click the cancel button in the new project form, we want to set the selected project ID back to undefined, which will show the no project

  function handleAddProject(projectData) {
    setProjectState(prevState => { 
      const newProject = {
        ...projectData,
        id: Math.random()
      }
//once we have the new project, we want to add it to the list of projects and set the selected project ID random number when we want to retrieve the project data.

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
        }
      });
    }   

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = <SelectedProject 
    project={selectedProject} 
    onDelete={handleDeleteProject} 
    onAddTask={handleAddTask} 
    onDeleteTask={handleDeleteTask} 
    tasks={projectState.tasks}
    />;
  
  if(projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex  gap-8">
      <ProjectSidebar 
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
} 
export default App;
