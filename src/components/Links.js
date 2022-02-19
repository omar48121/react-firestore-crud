import { useEffect, useState } from 'react';
import LinkForm from "./LinkForm";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';


const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditlink = async (linkObject) => {
        try {
            const db = getFirestore();
            if (currentId === '') {
                await addDoc(collection(db, "links"), linkObject);
                toast('New link added', { type: 'success', autoClose: 2000 });
            } else {
                toast('Link updated', { type: 'info', autoClose: 2000 });
                await setDoc(doc(db, "links", currentId), linkObject);
                setCurrentId('');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onDelete = async id => {
        const db = getFirestore();
        if (window.confirm('Are you sure you want to delete this link')) {
            await deleteDoc(doc(db, "links", id));
            toast('Link removed', { type: 'error', autoClose: 2000 });
        }
    }

    const getLinks = async () => {
        const db = getFirestore();
        onSnapshot(collection(db, "links"), (snapshot) => {
            const docs = [];
            snapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            })
            setLinks(docs);
        });
    }

    useEffect(() => {
        getLinks();
    }, []);

    return <div>
        <div className="col-md-4 p-2">
            <LinkForm {...{ addOrEditlink, currentId, links }} />
        </div>
        <div className="col-md-8 p-2">
            {links.map((link) => (
                <div className="card mb-1" key={link.id}>
                    <div className="card-body">
                        <div className='d-flex justify-content-between'>
                            <h4>{link.name}</h4>
                            <div>
                                <i className='material-icons text-danger' onClick={() => onDelete(link.id)}>close</i>
                                <i className='material-icons' onClick={() => setCurrentId(link.id)}>create</i>
                            </div>
                        </div>
                        <p>{link.description}</p>
                        <a href={link.url} target="_blank" rel="noreferrer" >Go to website</a>
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default Links;