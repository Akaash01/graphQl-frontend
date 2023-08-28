import React from "react";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation,useQuery} from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutation";
import { ADD_CLIENT } from "../mutations/clientMutation";
import { GET_PROJECTS } from "../queries/projectQuries";
import { GET_CLIENTS } from "../queries/clientQuires";
import Spinner from "./Spinner";
export default function AddProjectModal() {
  const [formData, setFormData] = useState({ name: "", description: "", clientId: "",status:"new"});
  const {loading,error,data}= useQuery(GET_CLIENTS);
  const [addProject] = useMutation(ADD_PROJECT,{
    variables:formData,
    update(cache,{data:{addProject}}){
        const {projects}=cache.readQuery({query: GET_PROJECTS});
        cache.writeQuery({
            query: GET_PROJECTS,
            data: { projects: [...projects,addProject]}
        })
    }
  })
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    const {name, description,status,clientId} = formData;
    if(name===''||description===''||status===''){
        return alert('Please fill in all fields');
    }
    addProject(name, description,status,clientId);
    setFormData({name:'',description:"",status:'new',clientId:''})
  };
  if (loading) return null;
  if (error) return `Something Went  Wrong`;
  console.log(data.clients)
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModal"
      >
        <div className="d-flex algin-items-center">
          <FaList className="icon" />
          <div>Add Project</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addProjectModal"
        tabIndex="-1"
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addProjectModalLabel">
                New Project
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onFormSubmit}>
                <div className="mt-3">
                  <lable className="form-label">Name</lable>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    onChange={onFormChange}
                    value={formData.name}
                  />
                </div>
                <div className="mt-3">
                  <lable className="form-label">Description</lable>
                  <textarea
                    id="description"
                    className="form-control"
                    onChange={onFormChange}
                    value={formData.description}
                  ></textarea>
                </div>
                <div className="mt-3">
                  <lable className="form-label">Status</lable>
                 <select name="" id="status" className="form-select" value={formData.status} onChange={onFormChange}>
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                 </select>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Client</label>
                    <select  id="clientId" className="form-select" value={formData.clientId} onChange={onFormChange}>
                        <option value="">Select Client</option>
                        {
                            data.clients.map((client)=>(
                                <option key={client.id} value={client.id}>{client.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="mt-3 btn btn-primary"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
