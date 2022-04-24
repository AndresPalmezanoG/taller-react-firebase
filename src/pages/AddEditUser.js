import React, { useEffect, useState } from 'react'
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { storage } from "../firebase";
import { useParams, useNavigate } from "react-router-dom"
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const initialState = {
    name: "",
    mail: "",
    info: "",
    contact: ""
}

const AddEditUser = () => {
    const [data, setData] = useState(initialState);
    const [file, setFile] = useState(null);
    const [progress, setPreogress] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const { name, mail, info, contact } = data;
    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, dile.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setPreogress(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is pause");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            }, (error) => {
                console, log(error)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
                    setData((prev) => ({ ...prev, img: downloadURL }));
                });
            }
            );
        };
        file && uploadFile();

}, [file])
const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
};
const validate = () => {
    let errors = {};
    if (!name) {
        errors.name = "Name is required"
    }
    if (!mail) {
        errors.mail = "Mail is required"
    }
    if (!info) {
        errors.info = "Info is required"
    }
    if (!contact) {
        errors.contact = "Contact is required"
    }
    return errors;
};
const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
};

return (
    <div>
        <Grid centered verticalAlign="middle" colums="3" style={{ height: "80vh" }}>
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <div>
                        {isSubmit ? <Loader inline="centered" size="huge" /> : (
                            <>
                                <h2>Add User</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Input
                                        label="Name"
                                        error={errors.name ? { content: errors.name } : null}
                                        placeHolder="Enter Name"
                                        name="name"
                                        onChange={handleChange}
                                        value={name}
                                        autoFocus
                                    />
                                    <Form.Input
                                        label="Mail"
                                        error={errors.mail ? { content: errors.mail } : null}
                                        placeHolder="Enter Mail"
                                        name="mail"
                                        onChange={handleChange}
                                        value={mail}
                                    />
                                    <Form.TextArea
                                        label="Info"
                                        error={errors.info ? { content: errors.info } : null}
                                        placeHolder="Enter Info"
                                        name="info"
                                        onChange={handleChange}
                                        value={info}
                                    />
                                    <Form.Input
                                        label="Contact"
                                        error={errors.contact ? { content: errors.contact } : null}
                                        placeHolder="Enter Contact"
                                        name="contact"
                                        onChange={handleChange}
                                        value={contact}
                                    />
                                    <Form.Input
                                        label="Upload"
                                        type="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    <Button primary type='submit'>
                                        Submit
                                    </Button>
                                </Form>
                            </>
                        )}
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
)
}

export default AddEditUser