import { Item, ItemID } from '../types'

interface Props {
    items: Item[]
    deleteItem: (id: ItemID) => void
}

export default function ItemsList({items, deleteItem}: Props) {
    return (
        <section>
            {!items.length ? (
                <h2>No hay elementos en la lista</h2>
            ) : (
                <ul>
                    {
                        items.map(item => {
                            return (
                                <li key={item.id}>
                                    <span>{item.value}</span>
                                    <button onClick={() => deleteItem(item.id)}>Eliminar</button>
                                </li>
                            )
                        })
                    }
                </ul>
            )}
        </section>
    )
}
