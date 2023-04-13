import React, { useState, useRef } from "react"
import People from './assets/people.png'
import Arrow from './assets/arrow.png'
import Trash from './assets/trash.png'
import axios from "axios"
import { Container, H1, Image, ContainerItens, InputLabel, Input, Button, User } from './styles'

const App = () => {

  const [users, setUsers] = useState([])
  const inputName = useRef()
  const inputAge = useRef()

  const addNewUser = async () => {
    const { data: newUser } = await axios.post("http://localhost:3001/users", {
      name: inputName.current.value,
      age: inputAge.current.value,
    });

    console.log(newUser)
    setUsers([...users, newUser]);
  }

  const deleteUser = (userId) => {
    const newUsers = users.filter((user) => user.id !== userId)

    setUsers(newUsers)

  }

  return (
    <Container>
      <Image alt="logo-imagem" src={People} />
      <ContainerItens>
        <H1>Olá!</H1>

        <InputLabel>Nome</InputLabel>
        <Input ref={inputName} placeholder="Nome"></Input>

        <InputLabel>Idade</InputLabel>
        <Input ref={inputAge} placeholder="Idade"></Input>

        <Button onClick={addNewUser}>Cadastrar <img alt="seta" src={Arrow} /></Button>
        
        <ul>
          {users.map((user) => (
            <User key={user.id}>
              console.log('user.id', 'user.id')
              <p>{user.name}</p> <p>{user.age}</p>
              <button onClick={() => deleteUser(user.id)}>
                <img src={Trash} alt="lixo" />
              </button>
            </User>
          ))}
        </ul>
      </ContainerItens>
    </Container>
  )
}
export default App
