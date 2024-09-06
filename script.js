const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')


canvas.width = innerWidth
canvas.height = innerHeight

// Criando o jogador
class Jogador {
    constructor(x, y, tamanho, cor) {
        this.x = x
        this.y = y
        this.radius = tamanho
        this.color = cor
    }

    desenhar() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

}

// Criando projetil
class Projetil {
    constructor(x, y, tamanho, cor, velocidade) {
        this.x = x
        this.y = y
        this.radius = tamanho
        this.color = cor
        this.velo = velocidade
    }

    desenhar() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update() {
        this.desenhar()
        this.x = this.x + this.velo.x
        this.y = this.y + this.velo.y

    }
}

// Criando inimigos
class Inimigo {
    constructor(x, y, tamanho, cor, velocidade) {
        this.x = x
        this.y = y
        this.radius = tamanho
        this.color = cor
        this.velo = velocidade
    }

    desenhar() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update() {
        this.desenhar()
        this.x = this.x + this.velo.x
        this.y = this.y + this.velo.y

    }
}

// Criando as variaveis do jogo
const x = canvas.width / 2
const y = canvas.height / 2

const jogador = new Jogador(x, y, 30, 'darkblue')
const tiros = []
const inimigos = []

function spawnInimigos(){
   setInterval(() =>{
   const tamanho  = Math.random() * (30 - 5) + 5
   let x 
   let y 
   if(Math.random() < 0.5){
     x = Math.random() < 0.5 ? 0 - tamanho : canvas.width + tamanho
     y = Math.random() * canvas.height
    //  y = Math.random() < 0.5 ? 0 - tamanho : canvas.height + tamanho
   } else{
      x = Math.random() * canvas.width
      y = Math.random() < 0.5 ? 0 - tamanho : canvas.height + tamanho
   }
   const cor  = 'black'
   const angulo = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
   const velo = {
     x: Math.cos(angulo),
     y: Math.sin(angulo)
   }

    inimigos.push(new Inimigo(x, y, tamanho, cor, velo))
    } , 1000)
}
// desenhando o jogo
function animação() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    jogador.desenhar()
    requestAnimationFrame(animação)
    tiros.forEach((tiro) => {
        tiro.update()
    })

    inimigos.forEach(inimigo => {
        inimigo.update()
    })
}

addEventListener('click', (event) => {
    const angulo = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2)
    
   const velo = {
     x: Math.cos(angulo),
     y: Math.sin(angulo)
   }

    tiros.push(new Projetil(canvas.width / 2, canvas.height / 2, 5, 'silver', velo))
})

animação()
spawnInimigos()