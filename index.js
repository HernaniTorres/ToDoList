let input = document.getElementById('task');
let tasksCreated = document.getElementById('tasks_created');
let nameTasks = document.getElementById('nameTasks');
let TasksToDo = [];

// Adiciona a tarefa ao clicar no ícone de + ou pressionar Enter
document.getElementById('button_icon').addEventListener('click', function () {
    addTask();
});

document.getElementById('task').addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    let inputValue = input.value.trim();

    // Verificar se o input não está vazio e evitar duplicação
    if (inputValue !== "" && !TasksToDo.includes(inputValue)) {
        TasksToDo.push(inputValue);
        
        // Criar os novos elementos para o item mais recente
        let index = TasksToDo.length - 1;

        // Criar o label para a tarefa
        let labelTask = document.createElement('label');
        labelTask.style.marginLeft = '15px';
        labelTask.style.cursor = 'pointer';
        labelTask.style.marginTop = '15px';
        labelTask.innerText = inputValue;
        labelTask.setAttribute('for', 'input' + index);
        labelTask.id = 'group' + index;

        // Criar o checkbox para marcar a tarefa como concluída
        let inputCheck = document.createElement('input');
        inputCheck.style.marginLeft = '15px';
        inputCheck.style.marginTop = '15px';
        inputCheck.type = 'checkbox';
        inputCheck.name = 'group';
        inputCheck.value = inputValue; 
        inputCheck.id = 'input' + index;

        // Adicionar o ouvinte de evento para o checkbox
        inputCheck.addEventListener('change', function() {
            if (inputCheck.checked) {
                labelTask.style.textDecoration = 'line-through';  // Aplica a linha no texto
            } else {
                labelTask.style.textDecoration = 'none';  // Remove a linha quando o checkbox não está marcado
            }
        });

        
        // Criar o ícone de lixeira para excluir a tarefa
        let buttonTrash = document.createElement('button');
        buttonTrash.innerHTML = "🗑️";  // ícone de lixeira
        buttonTrash.style.cursor = 'pointer';
        buttonTrash.style.fontSize = '20px';
        buttonTrash.style.marginLeft = '15px'; // Distância do ícone da lixeira
        buttonTrash.style.marginRight = '15px'; // Espaçamento à direita
        buttonTrash.style.background = 'none';
        buttonTrash.style.border = 'none';
        buttonTrash.style.transition = '0.3s';  // Adicionando uma transição suave

        // Efeito de hover no ícone de lixeira
        buttonTrash.addEventListener('mouseenter', function() {
            buttonTrash.style.color = '#e74c3c'; // Mudar a cor do ícone quando o mouse passar sobre ele
            buttonTrash.style.transform = 'scale(1.2)';  // Aumentar o tamanho do ícone
        });

        buttonTrash.addEventListener('mouseleave', function() {
            buttonTrash.style.color = 'black'; // Voltar à cor original
            buttonTrash.style.transform = 'scale(1)';  // Voltar ao tamanho original
        });

        // Função para excluir a tarefa
        buttonTrash.addEventListener('click', function () {
            labelTask.remove();
            inputCheck.remove();
            buttonTrash.remove();
            // Remover a tarefa do array
            TasksToDo.splice(index, 1);
        });

        // Criar um contêiner para agrupar a tarefa
        let taskWrapper = document.createElement('div');
        taskWrapper.style.display = 'flex';  // Usar flexbox
        taskWrapper.style.justifyContent = 'space-between'; // Garantir que o checkbox e o ícone fiquem em extremos opostos
        taskWrapper.style.alignItems = 'center';  // Alinhar verticalmente os itens
        taskWrapper.style.width = '100%';  // Garantir que o contêiner ocupe toda a largura disponível

        // Ajuste para o input e o label ocuparem o espaço à esquerda
        labelTask.style.flexGrow = '1';  // Fazer o label ocupar o espaço restante
        inputCheck.style.marginRight = '10px';  // Distância entre o checkbox e o label

        // Adicionar os elementos ao contêiner
        taskWrapper.append(inputCheck);
        taskWrapper.append(labelTask);
        taskWrapper.append(buttonTrash);

        // Adicionar o contêiner da tarefa ao contêiner principal
        tasksCreated.append(taskWrapper);

        // Adicionar a linha de separação após o label (opcional)
        labelTask.appendChild(document.createElement('br'));

        let hr = document.createElement('hr');
        hr.style.border = 'none';  // Remove a borda padrão
        hr.style.height = '0.5px'; // Define a espessura da linha
        hr.style.backgroundColor = 'rgba(120, 118, 120, 0.34)'; // Define a cor da linha
        labelTask.appendChild(hr);
        
    }

    // Limpar o campo de input após adicionar a tarefa
    input.value = '';
}
