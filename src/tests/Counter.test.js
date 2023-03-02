import { getByAltText, render, screen } from "@testing-library/react"
import  userEvent from "@testing-library/user-event"
import Counter from "../components/Counter"

describe("Counter", ()=>{

    //se titulo foi renderizado
    test("deve aumentar em 3 o contador quando o botão de incremento for clicado  3 vezes", async () =>{
       const user = userEvent.setup()

       //renderizar o componente na tela o counter
       render(<Counter/>)

    //    screen.logTestingPlaygroundURL() //ver cmo pega o botão soma

       const button = screen.getByRole('button', { 
        name: /\+/i })

        const item = screen.getByText(/0/i)

        await user.click(button)
        await user.click(button)
        await user.click(button)

        expect(item).toBeInTheDocument("3")

    })
}) 