
// Seleciona os elementos do formulário.
const form = document.querySelector('form')
const amount = document.querySelector('input#amount')
const expense = document.querySelector('input#expense')
const category = document.querySelector('select#category')
const ul = document.querySelector('ul')


//Captura o evento de input e retira as letras deixando apenas números
amount.addEventListener('input', () => {
    let value = amount.value.replace(/\D/g,"")

    //Transforma o valor em centavos (exemplo: 150/100 = 1.5 que é equivalente a R$ 1,50)
    value = Number(value) / 100

    amount.value = formatCurrencyBRL(value) //Retorna o valor formatado
})

//Formata o valor para moeda brasileira
function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
 
    return value
}

form.addEventListener('submit', (event) => {
    //Previne o comportamento padrao de recarregar a página.
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        create_at: new Date().toLocaleString("pt-BR", {
            hour:"2-digit",
            minute: "2-digit",
            day:"2-digit",
            month:"2-digit",
            year:"2-digit",
        }),
    }

    expenseAdd(newExpense)
})

function expenseAdd(newExpense) {

    try {
        //Cria um novo li, acrescenta classe e coloca dentro da ul
        const newLi = document.createElement('li')
        newLi.classList.add('expense')
        ul.appendChild(newLi)

        //Criando icone da categoria e adicionando atributos à imagem.
        const imgIcon = document.createElement('img')
        imgIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`)
        imgIcon.setAttribute("alt", newExpense.category_name)


//-----------<div><strong> </strong> <span> </span></div>-----------------      
        //Cria uma nova div e acrescenta classe
        const newDiv = document.createElement('div')
        newDiv.classList.add('expense-info')

        //Cria uma tag strong com conteúdo
        const strong = document.createElement('strong')
        strong.textContent = newExpense.expense

        //Cria uma tag span e acrescenta conteúdo
        const span1 = document.createElement('span')
        span1.textContent = newExpense.category_name

        //Acrescenta as tags strong e span dentro da div criada
        newDiv.appendChild(strong)
        newDiv.appendChild(span1)
    

        //Cria uma segunda span acrescentando classe e conteúdo
        const span2 = document.createElement('span')
        span2.classList.add('expense-amount')
        span2.innerHTML = `<small>R$</small> ${newExpense.amount.replace("R$", "")}`
 

        const imgIcon2 = document.createElement('img')
        imgIcon2.classList.add('remove-icon')
        imgIcon2.setAttribute('src', "./img/remove.svg")
        imgIcon2.setAttribute('alt', "botão de excluir")

        //Acrescenta as tags div e span na li criada
        newLi.append(imgIcon, newDiv, span2, imgIcon2)

    } catch (error) {
        alert("Deu ruim")
    }

}

