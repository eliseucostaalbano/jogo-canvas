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

    update(){
        this.x = this.x + this.velo.x
        this.y = this.y + this.velo.y

    }
}

// desenhando o jogador
const x = canvas.width / 2
const y = canvas.height / 2

const jogador = new Jogador(x, y, 30, 'darkblue')
jogador.desenhar()

const tiro = new Projetil(canvas.width/ 2, canvas.height / 2, 5, 'black', {x:1 , y:1})
function animação(){
 requestAnimationFrame(animação)
   tiro.desenhar()
    tiro.update()
}
// desenhando os projeteis
addEventListener('click', (event) => {

})

animação()