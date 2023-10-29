import React from "react"
import {describe, test, expect} from "vitest"
import { userEvent } from "@testing-library/user-event"
import {render, screen} from "@testing-library/react"
import App from "../src/App"

describe("<App />",() => {
    // Definimos el tipo de test o describimos lo que hara nuestro test
    test("Add Item and Remove Item", async () => {
        // Renderizamos el componente que vamos a testear
        render(<App />)
        // Obtenemos los elemento que se utilizan para agregar un elemento
        // y usamos un evento de usuario donde da click al agregar
        const user = userEvent.setup();
        const input = screen.getByRole("textbox")
        expect(input).toBeDefined()
        const form = screen.getByRole("form")
        expect(form).toBeDefined()
        const button = form.querySelector("button")
        expect(button).toBeDefined()

        const itemUnique = crypto.randomUUID()
        await user.type(input, itemUnique)
        await user.click(button!)

        const list = screen.getByRole("list")
        expect(list.childNodes.length).toBe(1)

        const deleteButton =  list.querySelector("button")
        expect(deleteButton).toBeDefined()

        // En caso de que sigamos mostrando la lista aunque este vacia
        {
            /*await user.click(deleteButton!)
            expect(list.childNodes.length).toBe(0)
        */}
        // En caso de ya no mostremos la lista y mostremos un texto 
        await user.click(deleteButton!)
        const emptyList = screen.getByText("No hay elementos en la lista")
        expect(emptyList).toBeDefined()
    })
})