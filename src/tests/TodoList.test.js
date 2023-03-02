import { getByAltText, render, screen } from "@testing-library/react"
import  userEvent from "@testing-library/user-event"
import TodoList from "../components/TodoList"

describe("TodoList", ()=>{

    //se titulo foi renderizado
    test("deve renderizar com título", () =>{
        render(<TodoList/>)
        // screen.debug() = console.log
        // const title = screen.getByText("Todo List")
        const title = screen.getByText(/todo List/i) //com regex //i
        expect(title).toBeInTheDocument()
    })

    test("deve renderizar com input vazio", () =>{
        render(<TodoList/>)
        // screen.debug() //= console.log
        const input = screen.getByPlaceholderText(/enter a todo/i) ////com regex //i
        expect(input).toHaveValue("") //matchers
    })

    test("deve atualizar valor do input ao ser digitado", async() =>{
        const user = userEvent.setup() //simula usuario, pessoa
        
        render(<TodoList/>)
        // screen.debug() //= console.log
        const input = screen.getByPlaceholderText(/enter a todo/i) ////com regex //i

        //interagir

        await user.type(input, "Revisar React") //simulou pessoa vindo com ponteiro colocano em cima do input selecionando e digitando letra a letra

        //assertiva acerca do valor do input, valor que espero
        expect(input).toHaveValue("Revisar React") //matchers


        
    })

    test("deve renderizar uma nova tarefa ao digitar no input e pressionar enter", 
    async() =>{
        const user = userEvent.setup() //simula usuario, pessoa
        
        render(<TodoList/>)
       
        const input = screen.getByPlaceholderText(/enter a todo/i) ////com regex //i

        //interagir

        await user.type(input, "Revisar React{enter}") //simulou pessoa vindo com ponteiro colocano em cima do input selecionando e digitando letra a letra{enter simula tecla apertada}

        const item = screen.getByText("Revisar React") //espera selecionar o item

        expect(input).toHaveValue("") //input vazio
        expect(item).toBeInTheDocument()// espera que item exista no doc

        //comando para brir palyground
        //screen.logTestingPlaygroundURL()


    })

    
    test("deve alterar status da tarefa qdo botão de alterar status for clicado", 
    async() =>{
        const user = userEvent.setup() //simula usuario, pessoa
        
        render(<TodoList/>)
       
        const input = screen.getByPlaceholderText(/enter a todo/i) ////com regex //i

        //interagir

        await user.type(input, "Revisar React{enter}") //simulou pessoa vindo com ponteiro colocano em cima do input selecionando e digitando letra a letra{enter simula tecla apertada}

        // screen.logTestingPlaygroundURL()


        const toggleBtn = screen.getByRole('button',{
            name: /toggle/i
        })
        
        const item = screen.getByText("Revisar React") //espera selecionar o item

        await user.click(toggleBtn)
        expect(item).toHaveStyle("text-decoration: line-through")


        await user.click(toggleBtn)
        expect(item).toHaveStyle("text-decoration: none")

       
        //comando para brir playground
        //screen.logTestingPlaygroundURL()


    })

    test("deve remover a tarefa quando  botão de delete for clicado", 
    async() =>{
        const user = userEvent.setup() //simula usuario, pessoa
        
        render(<TodoList/>)
       
        const input = screen.getByPlaceholderText(/enter a todo/i) ////com regex //i

        //interagir

        await user.type(input, "Revisar React{enter}") //simulou pessoa vindo com ponteiro colocano em cima do input selecionando e digitando letra a letra{enter simula tecla apertada}

        const deleteBtn = screen.getByRole('button', {name:/delete/i})

        const item = screen.queryByText("Revisar React") //espera selecionar o item

        await user.click(deleteBtn) //click para deletar
        expect(item).not.toBeInTheDocument() //espera que este item não esteja na documentação


    })

})