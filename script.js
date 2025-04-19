const button = document.querySelector('.btn-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

let minhaListaDeItens = []

function adicionarNovaTarefa() {
  if (input.value.trim() !== '') {
    minhaListaDeItens.push({
      tarefa: input.value,
      concluida: false
    })

    input.value = ''
    mostrarTarefas()
  }
}

function mostrarTarefas() {
  let novaLi = ''

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi += `
      <li class="task ${item.concluida ? 'done' : ''}">
        <!-- Corrigindo o nome da função para 'concluirItem' -->
        <img src="./img/checked - Copia.png" alt="check-na-tarefa" onclick="concluirItem(${posicao})">
        <p>${item.tarefa}</p>
        <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
      </li>
    `
  })

  listaCompleta.innerHTML = novaLi

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function concluirItem(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida
  mostrarTarefas()
}

function recarregarTela() {
  const tarefasDoLocalStorage = localStorage.getItem('lista')


  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
  }

  mostrarTarefas()
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1)
  mostrarTarefas()
}

recarregarTela()
button.addEventListener('click', adicionarNovaTarefa)
