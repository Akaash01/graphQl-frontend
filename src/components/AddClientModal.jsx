import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/clientQuires";
export default function AddClientModal() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: formData,
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients,addClient] },
      });
    },
  });
  const onFormSubmit = (e) => {
    e.preventDefault();
    addClient(formData.name,formData.email,formData.phone);
    setFormData({name:'',email:"",phone:''})
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex algin-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        tabIndex="-1"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addClientModalLabel">
                Add Client
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
                  <lable className="form-label">email</lable>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    onChange={onFormChange}
                    value={formData.email}
                  />
                </div>
                <div className="mt-3">
                  <lable className="form-label">Phone</lable>
                  <input
                    id="phone"
                    type="number"
                    className="form-control"
                    onChange={onFormChange}
                    value={formData.phone}
                  />
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="mt-3 btn btn-secondary"
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
