import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { toast } from 'react-toastify';

const LinkForm = props => {
    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    }

    const [values, setValues] = useState( initialStateValues );

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    const validateURL = str => {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!validateURL(values.url)) {
            return toast('Invalid URL', { type: 'warning', autoClose: 2000 });
        }

        props.addOrEditlink(values);
        setValues({...initialStateValues});
    }

    const getLinkById = async id => {
        const db = getFirestore();
        const docRef = doc(db, "links", id);
        const docSnap = await getDoc(docRef);
        setValues({...docSnap.data()});
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({...initialStateValues})
        } else {
            getLinkById(props.currentId);
        }
    }, [props.currentId]);

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group mb-3">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input value={values.url} onChange={handleInputChange} type="text" className="form-control" placeholder="https://sample-url.com" name="url" />
            </div>
            
            <div className="form-group input-group mb-3">
                <div className="input-group-text bg-light">
                     <i className="material-icons">create</i>
                </div>
                <input value={values.name} onChange={handleInputChange} type="text" className="form-control" name="name" placeholder="Website name" />
            </div>

            <div className="form-group mb-3">
                <textarea value={values.description} onChange={handleInputChange} name="description" rows="3" className="form-control" placeholder="Write a description"></textarea>
            </div>

            <button className="btn btn-primary btn-block">{props.currentId === '' ? 'Save' : 'Update'}</button>
        </form>
    );
}

export default LinkForm;
