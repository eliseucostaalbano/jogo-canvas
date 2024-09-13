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

const jogador = new Jogador(x, y, 10, 'white')
const tiros = []
const inimigos = []
let animaçaoId
// Criando  as  funções do jogo
function spawnInimigos() {
    setInterval(() => {
        const tamanho = Math.random() * (30 - 5) + 5
        let x
        let y
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - tamanho : canvas.width + tamanho
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - tamanho : canvas.height + tamanho
        }
        const cor = `hsl(${Math.random() * 360} , 50%, 50%)`
        const angulo = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
        const velo = {
            x: Math.cos(angulo),
            y: Math.sin(angulo)
        }

        inimigos.push(new Inimigo(x, y, tamanho, cor, velo))
    }, 1000)
}

function animação() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    jogador.desenhar()
    animaçaoId = requestAnimationFrame(animação)
    tiros.forEach((tiro, index) => {
        tiro.update()
        //  remover das pontas da tela
        if (tiro.x + tiro.radius < 0 || 
            tiro.x - tiro.radius > canvas.width || 
            tiro.y + tiro.radius < 0 || 
            tiro.y - tiro.radius > canvas.height) {
            setTimeout(() => {
                tiros.splice(index, 1)
            }, 0)
        }

    })

    inimigos.forEach((inimigo, index) => {
        inimigo.update()
        const dist = Math.hypot(jogador.x - inimigo.x, jogador.y - inimigo.y)
        // fim de jogo
        if (dist - inimigo.radius - jogador.radius < 1) {
            cancelAnimationFrame(animaçaoId)
        }


        tiros.forEach((tiro, tiroIndex) => {
            const distancia = Math.hypot(tiro.x - inimigo.x, tiro.y - inimigo.y)
            // objetos se tocam
            if (distancia - inimigo.radius - tiro.radius < 1) {
                setTimeout(() => {
                    inimigos.splice(index, 1)
                    tiros.splice(tiroIndex, 1)
                }, 0)
            }
        })
    })
}
// Chamando as funções
addEventListener('click', (event) => {
    const angulo = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2)

    const velo = {
        x: Math.cos(angulo) * 5,
        y: Math.sin(angulo) * 5
    }

    tiros.push(new Projetil(canvas.width / 2, canvas.height / 2, 5, 'white', velo))
})

animação()
spawnInimigos()