
// NOTE: 
// This is the final source code file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-3

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1)
  const secondNum = parseFloat(n2)
  if (operator === 'add') return firstNum + secondNum
  if (operator === 'subtract') return firstNum - secondNum
  if (operator === 'multiply') return firstNum * secondNum
  if (operator === 'divide') return firstNum / secondNum
}

const getKeyType = key => {
  const { action } = key.dataset
  if (!action) return 'number'
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) return 'operator'
  // For everything else, return the action
  return action
}

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent
  const keyType = getKeyType(key)
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType
  } = state

  if (keyType === 'number') {
    return displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate'
      ? keyContent
      : displayedNum + keyContent
  }

  if (keyType === 'decimal') {
    if (!displayedNum.includes('.')) return displayedNum + '.'
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
    return displayedNum
  }

  if (keyType === 'operator') {
    return firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum
  }

  if (keyType === 'clear') return 0

  if (keyType === 'calculate') {
    return firstValue
      ? previousKeyType === 'calculate'
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum
  }
}

const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
  const keyType = getKeyType(key)
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType
  } = calculator.dataset

  calculator.dataset.previousKeyType = keyType

  if (keyType === 'operator') {
    calculator.dataset.operator = key.dataset.action
    calculator.dataset.firstValue = firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculatedValue
      : displayedNum
  }

  if (keyType === 'calculate') {
    calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
      ? modValue
      : displayedNum
  }

  if (keyType === 'clear' && key.textContent === 'AC') {
    calculator.dataset.firstValue = ''
    calculator.dataset.modValue = ''
    calculator.dataset.operator = ''
    calculator.dataset.previousKeyType = ''
  }
}

const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key)
  Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

  if (keyType === 'operator') key.classList.add('is-depressed')
  if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
  if (keyType !== 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]')
    clearButton.textContent = 'CE'
  }
}

const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.calculator__display')
const keys = calculator.querySelector('.calculator__keys')

keys.addEventListener('click', e => {
  if (!e.target.matches('button')) return

  const key = e.target
  const displayedNum = display.textContent
console.log(key)
  if (key.textContent == 2) {  
    console.log(getKeyType(key)+key.textContent)
  }
  
  const resultString = createResultString(key, displayedNum, calculator.dataset)

  display.textContent = resultString
  updateCalculatorState(key, calculator, resultString, displayedNum)
  updateVisualState(key, calculator)
})


addEventListener('keydown', e => {
   const displayedNum = display.textContent
   key = keys.children
console.log(e.key)
    switch (e.key) {
  case '0':
    key = key[13]
    break;
  case '1':
    key = key[10]
    break;
  case '2':
     key = key[11]
    break;
  case '3':
     key = key[12]
    break;
  case '4':
    key = key[7]
    break;
  case '5':
    key = key[8]
    break;
  case '6':
    key = key[9]
    break;
  case '7':
    key = key[4]
    break;
  case '8':
    key = key[5]
    break;
  case '9':
    key = key[6]
    break;
  case 'Enter':
    key = key[16]
    break;
  case '+':
    key = key[0]
    break;
  case '/':
    key = key[3]
    break;
  case '*':
    key = key[2]
    break;
  case '-':
    key = key[1]
    break;
  case 'Backspace':
    key = key[15]
    break;

  default:   return
}
 // console.log( key.textContent)
 //  if (key.textContent == 5) {  
 //    console.log(getKeyType(key)+key.textContent)
 //  }
  
  const resultString = createResultString(key, displayedNum, calculator.dataset)

  display.textContent = resultString
  updateCalculatorState(key, calculator, resultString, displayedNum)
  updateVisualState(key, calculator)

  if (e.key == 2) {  

  console.log('ok')
 }
  console.log(e+e.key)
  
})
      key.classList.add('is-depressed')
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.operator = action
    }

    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
      } else {
        key.textContent = 'AC'
      }

      display.textContent = 0
      calculator.dataset.previousKeyType = 'clear'
    }

    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
      clearButton.textContent = 'CE'
    }

    if (action === 'calculate') {
      let firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      let secondValue = displayedNum

      if (firstValue) {
        if (previousKeyType === 'calculate') {
          firstValue = displayedNum
          secondValue = calculator.dataset.modValue
        }

        display.textContent = calculate(firstValue, operator, secondValue)
      }

      calculator.dataset.modValue = secondValue
      calculator.dataset.previousKeyType = 'calculate'
    }
  }
})
