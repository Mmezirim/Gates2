class Calculator {
    constructor (upperScreenTextElement, lowerScreenTextElement) {
        this.previousScreenTextElement = previousScreenTextElement
        this.currentScreenTextElement = currentScreenTextElement
        this.clear ()
    } 
    
    clear () {
        this.currentScreen = ''
        this.previousScreen = ''
        this.operation = undefined


    }

    delete () {
        this.currentScreen = this.currentScreen.toString().slice (0, -1)

    }

    appendNumber (number)  {
        if (number ==='.'&& this.currentScreen.includes('.')) return
        this.currentScreen = this.currentScreen.toString() + number.toString()    
    }

    chooseOperation (operation) {
        if (this.currentScreen === '')  return
        if (this.previousScreen !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousScreen = this.currentScreen
        this.currentScreen = ''

    }

    compute ()  {
        let computation
        const prev = parseFloat(this.previousScreen)
        const current = parseFloat(this.currentScreen)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
                
        }
        this.currentScreen = computation
        this.operation = undefined
        this.previousScreen = ''


    }

    getDisplayNumber(number) {
        const stringNumber = number.toString ()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }   else {
            integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }   else {
            return integerDisplay
        }
    }

    updateDisplay()  {
        this.currentScreenTextElement.innerText =
         this.getDisplayNumber(this.currentScreen)
        if (this.operation != null) {
            this.previousScreenTextElement.innerText = 
                `${this.getDisplayNumber(this.previousScreen)} ${this.operation}`
        } else {
            this.previousScreenTextElement.innerText =''
        }
    }
} 



 const numberButtons = document.querySelectorAll('[data-number]')
 const operationButtons = document.querySelectorAll('[data-operation]')
 const equalsButtons = document.querySelector('[data-equals]')
 const deleteButtons = document.querySelector('[data-delete]')
 const allClearButtons = document.querySelector('[data-all-clear]')
 const previousScreenTextElement = document.querySelector('[data-previous-screen]')
 const currentScreenTextElement = document.querySelector('[data-current-screen]')

 const calculator = new Calculator (previousScreenTextElement, currentScreenTextElement)

 numberButtons.forEach(button => {
    button.addEventListener ('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay ()

    })
 })

    operationButtons.forEach(button => {
        button.addEventListener ('click', () => {
            calculator.chooseOperation(button.innerText)
            calculator.updateDisplay ()
    
     })
 })

equalsButtons.addEventListener ('click', button => {
     calculator.compute()
     calculator.updateDisplay()
 })
 
 allClearButtons.addEventListener ('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButtons.addEventListener ('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
