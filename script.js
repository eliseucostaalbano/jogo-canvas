const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')


canvas.width = innerWidth
canvas.height = innerHeight

// Criando o jogador
class Jogador {
    constructor(x, y, radius, cor) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = cor
    }

    desenhar() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

}
const x = canvas.width / 2
const y = canvas.height / 2

const jogador = new Jogador(x, y, 30, 'darkblue')
jogador.desenhar()
