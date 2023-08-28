import React from 'react'
import Spinner from './Spinner'
import { useQuery } from '@apollo/client'
import ProjectCard from './ProjectCard'
import { GET_PROJECTS } from '../queries/projectQuries'
export default function Projects() {
    const {loading,error,data} = useQuery(GET_PROJECTS);
    console.log({loading,error,data});
    if(loading) 
    return <Spinner/>;
    if(error) {

        return <p>Something went wrong</p>;
    }
    return (
    <>
    {
        data.projects.length > 0 ? (
            <div className='row'>
               {
                data.projects.map((project)=>(
                    <ProjectCard key={project.id} project={project} />
                ))
               }
            </div>
        ):<div>No project</div>
    }
    
    </>
    )
}
