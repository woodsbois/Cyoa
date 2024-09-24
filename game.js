const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'would you vote a or vote b',
    options: [
      {
        text: 'vote a',
        nextText: 2
      },
      {
        text: 'vote b',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'you voted a',
    options: [
      {
        text: 'Vote a',
        nextText: 4
      },
      {
        text: 'vote b',
        nextText: 5
      },
      {
        text: 'vote c',
        nextText: 6
      }
    ]
  },
  {
    id: 3,
    text: 'you voted b',
    options: [
        {
          text: 'Vote a',
          nextText: 4
        },
        {
          text: 'vote b',
          nextText: 5
        },
        {
          text: 'vote c',
          nextText: 6
        }
    ]
  },
  {
    id: 4,
    text: 'you voted a',
    options: [
        {
          text: 'restart',
          nextText: -1
        }
    ]
  },
  {
    id: 5,
    text: 'you voted b',
    options: [
        {
          text: 'restart',
          nextText: -1
        }
    ]
  },
  {
    id: 6,
    text: 'you voted c',
    options: [
        {
          text: 'restart',
          nextText: -1
        }
    ]
  }
]

startGame()