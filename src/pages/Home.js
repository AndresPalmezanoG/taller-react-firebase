import React, { useEffect, useState } from 'react';
import { db } from "../firebase";
import { Button, Card, Grid, Container, Image, Modal } from 'semantic-ui-react';
import { useNavigate, userNavigate } from "react-router-dom";
import { collection, onSnapshot } from 'firebase/firestore';
import ModalComp from '../commponents/ModalComp';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            });
            setUsers(list);
            setLoading(false);
        }, (error) => {
            console.log(error);
        });

        return () => {
            unsub();
        };
    }, []);

const handleModal = (item) => {
    setOpen(true);
    setUser(item)
};

    return (
        <Container>
                <Grid columns={3} stackable>
                    {users && users.map((item) => (
                        <Grid.Column key={item.id}>
                            <Card.Content>
                                <Image
                                    src={item.img}
                                    size="medium"
                                    style={{
                                        height: "150px",
                                        width: "150px",
                                        borderRadius: "50%",
                                    }}
                                />
                                <Card.Header sryle={{ marginTop: "10px" }}>
                                    {item.name}
                                </Card.Header>
                                <Card.Description>
                                    {item.mail}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div>
                                    <Button color="green"
                                        onClick={() => navigate(`/update/${item.id}`)}>
                                        Update
                                    </Button>
                                    <Button color="grey"
                                        onClick={() => handleModal(item)}>
                                        View
                                    </Button>
                                    {open && (
                                        <ModalComp
                                        open={open}
                                        setOpen={setOpen}
                                        handleDelete={() => console.log("delete")}
                                        {...user}
                                        />
                                    )}
                                </div>
                            </Card.Content>
                        </Grid.Column>
                    ))}
                </Grid>
        </Container>
    )
}

export default Home