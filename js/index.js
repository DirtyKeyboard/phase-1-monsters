/*IDs:
monster-container -- show existing monsters here
create-monster -- put the form here
back -- back page btn
forward -- forward page btn
///   ?_limit=50&_page=1
*/

let currentPage = 1;
const URL = "http://localhost:3000/monsters"
document.addEventListener('DOMContentLoaded', run)
function run()
{
    const formContainer = document.getElementById('create-monster')
    const form = document.createElement('form')
    const nameIn = document.createElement('input')
    const ageIn = document.createElement('input')
    const descIn = document.createElement('input')
    const submitBtn = document.createElement('input')


    form.id = 'create-monster'
    nameIn.type = 'text'
    ageIn.type = 'number'
    descIn.type = 'text'
    nameIn.placeholder = 'Monster name';
    ageIn.placeholder = 'Monster age';
    descIn.placeholder = 'Description';
    submitBtn.type = 'submit'
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            },
            body: JSON.stringify({ 
                name: nameIn.value,
                age: ageIn.value,
                description: descIn.value })
        })
        form.reset();
    })



    form.append(nameIn,ageIn,descIn,submitBtn)
    formContainer.append(form)


    //Add page up / page down functionality
    const fBtn = document.getElementById('forward')
    const bBtn = document.getElementById('back')

    fBtn.addEventListener('click', handleClick)
    bBtn.addEventListener('click', handleClick)

    console.log('DOM Loaded. Begin data fetch.')
    fetch(`${URL}/?_limit=50&_page=1`)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(el => showMonster(el))
    })
}

function clearMonsters()
{
    const container = document.getElementById('monster-container')
    container.innerHTML = "";
}

function showMonster(m)
{
    //monster has, .name, .age, .description
    //<div>
    //H2 Tag for the name
    //H4 Tag for the age
    //p Tag for the bio
    //</div> --> ALL OF THIS IN A DIV TAG!!!
    const container = document.getElementById('monster-container')

    const nameTag = document.createElement('h2')
    const ageTag = document.createElement('h4')
    const bio = document.createElement('p')
    const card = document.createElement('div')
    nameTag.textContent = m.name
    ageTag.textContent = "Age: " + m.age
    bio.textContent = "Bio: "+ m.description
    card.append(nameTag, ageTag)
    card.append(bio)
    container.append(card)
}

function fetchAndShow()
{
    clearMonsters();
    fetch(`${URL}/?_limit=50&_page=${currentPage}`)
    .then(resp => resp.json())
    .then(d => d.forEach(showMonster))
}

function handleClick(e)
{
    if (e.target.id === 'forward')
    {
        currentPage++;
        fetchAndShow();
    }
    else if (e.target.id === 'back' && currentPage === 1)
        alert('You are on page 1!')
    else
    {
        currentPage--;
        fetchAndShow();
    }
}