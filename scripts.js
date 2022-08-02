const input = document.getElementById('input-word')
const popup = document.querySelector('.popup-wrapper')

const hintContainer = document.querySelector('[hint-container]')
const attemptContainer = document.querySelector('[attempt-container]')

class Game{
    constructor(hints, response){
        this.response = response.toUpperCase()
        this.hints = []

        hints.forEach(h => this.hints.push(h.toUpperCase()))
    }

    ShowPopup(win){//true -> win | false -> lose
        const status = document.getElementById('popup-status')
        win ? status.textContent = "VOCÊ GANHOU" : status.textContent = "VOCÊ PERDEU";
        document.getElementById('popup-answer').textContent = "A palavra era: " + this.response
        popup.style = 'display: flex;'
    }

    SetAnimation(obj, animation){
        obj.classList.add(animation)

        obj.addEventListener('animationend', ev => {
            ev.animationName === animation ? obj.classList.remove(animation) : null;
        })
    }

    CreateElement(type, className, text){
        const el = document.createElement(type)
        el.classList.add(className)
        el.textContent = text
        return el
    }

    Clear(obj){
        obj.value = '';
    }

    SetInitialConfigs(){
        hintContainer.appendChild(this.CreateElement('h2', 'hint', this.hints[0]))
        this.Clear(input)
    }

    TreatingString(string){//return true or false
        if((string.trim().split(" ").length > 1) || (string.trim().length === 0)) return null
        else return string.trim().toUpperCase()
    }
    
    AddAttempt(word){
        attemptContainer.appendChild(this.CreateElement('div', 'attempt', this.TreatingString(word)))
    }
    
    AddHint(all){ //all == true -> add all hints
        if(!all){
            hintContainer.appendChild(this.CreateElement('div', 'hint', this.hints[hintContainer.children.length]))
        }
        else{
            this.hints.forEach(w => hintContainer.appendChild(this.CreateElement('div', 'hint', this.hints[hintContainer.children.length])))
        }
    }

    UpdateScreen(word){
        if(word === this.response){
            this.AddAttempt(word)
            this.AddHint(true)
            input.disabled = true
            this.Clear(input)
            this.ShowPopup(true)
        }
        else{
            if(attemptContainer.children.length + 1 === 5){
                this.AddAttempt(word)
                this.AddHint(true)
                input.disabled = true
                this.Clear(input)
                this.ShowPopup(false)
            }
            else{
                this.AddAttempt(word)
                this.AddHint(false)
                this.Clear(input)
            }
        }
    }

    Attempt(word){
        if(this.TreatingString(word) !== null){
            this.UpdateScreen(this.TreatingString(word))
        }
        else{
            this.SetAnimation(input, 'shake')
        }
    }
}

const game = new Game(['rosca', 'desleixado', 'comida', 'sujo', 'focinho'], "porca")

game.SetInitialConfigs()

document.addEventListener('keydown', ev => {
    ev.key == 'Enter' ? game.Attempt(input.value) : null;
})

popup.addEventListener('click', ev => {
    ev.target.classList == 'popup-wrapper' ? popup.style.display = 'none' : null;

    document.addEventListener('click', ev => {
        ev.target.classList == 'main' ? popup.style.display = 'flex' : null;
    })
})

