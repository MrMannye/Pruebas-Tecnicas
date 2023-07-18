import { User } from "../types"

interface Props {
    users: User[],
    showColors: boolean,
    deleteUser: (email: string) => void
}

function UsersList({ users, showColors, deleteUser }: Props) {
    return (
        <table style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                        const background = index % 2 === 0 ? '#333' : '#555';
                        const color = showColors ? background : 'transparent';
                        return (
                            <tr key={user.email} style={{ width: "100%", backgroundColor: color }}>
                                <td>
                                    <img src={user.picture.thumbnail} alt="Image User" />
                                </td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button onClick={() => deleteUser(user.email)}>Borrar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default UsersList