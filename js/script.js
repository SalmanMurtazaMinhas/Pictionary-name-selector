// console.log('okayyyy lesss go')
const introMusic = document.querySelector('#intro')
const spinMusic = document.querySelector('#spin')
const rightAnsMusic = document.querySelector('#right-ans')
const wrongAnsMusic = document.querySelector('#wrong-ans')
const BackgroundMusic = document.querySelector('#background')

let items = ["3B's", 'The Dynamic Duo', 'PetSpot', 'AlNokhatha', 'Favorr']

// document.querySelector(".info").textContent = items.join(" ");

const doors = document.querySelectorAll('.door')
document.querySelector('#spinner').addEventListener('click', spin)
document.querySelector('#spinner').addEventListener('click', () => {
  introMusic.play()
  setTimeout(() => {
    BackgroundMusic.play()
  }, 26000)
})
document.querySelector('#reseter').addEventListener('click', init)
document.querySelector('#reseter').addEventListener('click', () => {
  // BackgroundMusic.play()
})

async function spin() {
  init(false, 1, 2)
  for (const door of doors) {
    const boxes = door.querySelector('.boxes')
    const duration = parseInt(boxes.style.transitionDuration)
    boxes.style.transform = 'translateY(0)'
    await new Promise((resolve) => setTimeout(resolve, duration * 1000))
  }
}

function init(firstInit = true, groups = 1, duration = 1) {
  for (const door of doors) {
    if (firstInit) {
      door.dataset.spinned = '0'
    } else if (door.dataset.spinned === '1') {
      return
    }

    const boxes = door.querySelector('.boxes')
    const boxesClone = boxes.cloneNode(false)

    // const pool = ["[̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]"];
    const pool = ['🪙']
    if (!firstInit) {
      const arr = []
      for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
        arr.push(...items)
      }

      pool.push(...shuffle(arr))

      boxesClone.addEventListener(
        'transitionstart',
        function () {
          door.dataset.spinned = '1'
          this.querySelectorAll('.box').forEach((box) => {
            box.style.filter = 'blur(1px)'
          })
        },
        { once: true }
      )

      boxesClone.addEventListener(
        'transitionend',
        function () {
          this.querySelectorAll('.box').forEach((box, index) => {
            box.style.filter = 'blur(0)'
            if (index > 0) this.removeChild(box)
          })
        },
        { once: true }
      )
    }
    // console.log(pool);

    for (let i = pool.length - 1; i >= 0; i--) {
      const box = document.createElement('div')
      box.classList.add('box')
      box.style.width = door.clientWidth + 'px'
      box.style.height = door.clientHeight + 'px'
      box.textContent = pool[i]
      boxesClone.appendChild(box)
    }
    boxesClone.style.transitionDuration = `${duration > 100 ? duration : 1}s`
    boxesClone.style.transform = `translateY(-${
      door.clientHeight * (pool.length - 1)
    }px)`
    door.replaceChild(boxesClone, boxes)
    // console.log(door);
  }
}

function shuffle([...arr]) {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[m], arr[i]] = [arr[i], arr[m]]
  }
  console.log(arr)
  items = arr
  // items.pop()

  return arr.splice(-1, 1)
}

init()
