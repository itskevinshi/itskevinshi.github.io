import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4'

const config = {
  theme: 'system',
  type: 'outIn',
  flipped: false,
  cells: 9,
}

const ctrl = new Pane({
  title: 'Config',
  expanded: true,
})

let genStyles

const update = () => {
  document.documentElement.dataset.theme = config.theme
  document.documentElement.dataset.transition = config.type
  document.documentElement.dataset.flipped = config.flipped
  header.innerText = config.flipped
    ? 'Using Only CSS Masks'
    : 'Pixelated View Transitions'
  if (genStyles) genStyles()
}

const sync = (event) => {
  if (
    !document.startViewTransition ||
    (event && event.target.controller.view.labelElement.innerText !== 'Theme')
  )
    return update()
  document.startViewTransition(() => update())
}

ctrl.addBinding(config, 'type', {
  label: 'Type',
  options: {
    Out: 'out',
    outIn: 'outIn',
  },
})

ctrl.addBinding(config, 'theme', {
  label: 'Theme',
  options: {
    System: 'system',
    Light: 'light',
    Dark: 'dark',
  },
})

ctrl.addBinding(config, 'cells', {
  label: 'per Row',
  min: 3,
  max: 21,
  step: 2,
})

ctrl.on('change', sync)

const header = document.querySelector('h1')

// const changeContent = () => {}

ctrl.addButton({ title: 'Transition' }).on('click', () => {
  config.flipped = !config.flipped
  sync()
})
update()

// Masking "hack", it's gross but it works™
const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1))
    // Swap elements at index i and j
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const getPositions = (frame, pos) => {
  const slices = []
  for (let i = 0; i < config.cells; i++) {
    if (i < frame) {
      slices.push(pos.slice(i * config.cells, (i + 1) * config.cells))
    } else {
      slices.push(pos.slice(frame * config.cells, (frame + 1) * config.cells))
    }
  }
  return slices.join(',')
}

const getFrames = (positions) => {
  let frames = ''
  const shuffled = shuffleArray(positions)
  for (let f = 1; f < config.cells; f++) {
    // const linearFrame = Math.floor((100 / perLine) * f)
    const sineFrame = Math.floor(
      Math.sin((f / config.cells) * (Math.PI / 2)) * 100
    )
    frames += `${sineFrame}% {
      --mp: ${getPositions(f, shuffled)};
    }`
  }
  frames += `100% { --mp: ${positions.join(',')}; }`
  return frames
}

genStyles = () => {
  const sheet = document.querySelector('#vt')
  const positions = []
  const mid = Math.ceil(config.cells * 0.5)

  // there are 64 possible squares right so generate all the masks
  for (let p = 0; p < Math.pow(config.cells, 2); p++) {
    const x = p % config.cells
    const y = Math.floor(p / config.cells)
    const xm = x + 1 - mid
    const ym = y + 1 - mid
    positions.push(
      `calc(50% + (var(--ms) * ${xm})) calc(50% + (var(--ms) * ${ym}))`
    )
  }

  const maskIn = `@keyframes maskIn {${getFrames(positions)}}`
  const maskOut = `@keyframes maskOut {${getFrames(positions)}}`
  // set things on the root for the View Transitions
  sheet.innerHTML = `
    :root {
      --mi: ${new Array(Math.pow(config.cells, 2))
        .fill('linear-gradient(#fff 0 0)')
        .join(',')};
      --size: ${Math.ceil(100 / config.cells)};
    }
    ${maskIn}
    ${maskOut}
  `
}

genStyles()
