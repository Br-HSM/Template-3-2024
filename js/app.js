// setting menu
function showSettingMenu() {
    const menu = document.querySelector('.setting')
    menu.classList.toggle('show-setting-menu')
}

// cahnge color
let colorOption = localStorage.getItem('CO')
if (colorOption =! null) {
    document.documentElement.style.setProperty('--color-1',localStorage.getItem('CO'))

    document.querySelectorAll('.colors li').forEach(rmv => {
        rmv.classList.remove('active')

        if (rmv.dataset.color === localStorage.getItem('CO')) {
            rmv.classList.add('active')
        }

    })
}



const colors = document.querySelectorAll('.colors li')
colors.forEach(li => {
    li.addEventListener('click' , (clr) => {
        document.documentElement.style.setProperty('--color-1',clr.target.dataset.color)
        localStorage.setItem('CO' , clr.target.dataset.color)
        clr.target.parentElement.querySelectorAll('.active').forEach(rmv => {
            rmv.classList.remove('active')
        })
        clr.target.classList.add('active')
    })

})


// mobile menu
function showSideBar() {
    const menu = document.querySelector('.menu-mobile')
    menu.classList.add('show-mobile-menu')
}

function hideSideBar() {
    const menu = document.querySelector('.menu-mobile')
    menu.classList.remove('show-mobile-menu')
}

// backgroud changing
const backgroudOptionEl = document.querySelectorAll('.random-bg span')
backgroudOptionEl.forEach(sp => {
    sp.addEventListener('click', (span) => {
        span.target.parentElement.querySelectorAll('.active').forEach(sp1 => {
            sp1.classList.remove('active')
        })
        span.target.classList.add('active')
    })
})

let backgroudOptionBoolean = true
let backgroudOptionInterval

function rondomizeBackground() {
    if (backgroudOptionBoolean === true)
    backgroudOptionInterval = setInterval(() => {
        let images = ['image1.jpg','image2.jpg','image3.jpg','image4.jpg','image5.jpg']
        let randomImage = images[Math.floor(Math.random() * images.length)] 
        document.querySelector('.landing').style.backgroundImage = 'url("../image/' + randomImage + '")'
        localStorage.setItem('background' , randomImage)
    },1500)}

rondomizeBackground()

function backgroudRandomYes() {
    backgroudOptionBoolean = true
    rondomizeBackground()
    localStorage.setItem('boolean',false)
}

function backgroudRandomNo() {
    backgroudOptionBoolean = false
    clearInterval(backgroudOptionInterval)
    localStorage.setItem('boolean',true)
}

if (localStorage.getItem('boolean') === 'true') {
    document.querySelector('.landing').style.backgroundImage = 'url("../image/' + localStorage.getItem('background') + '")'
    backgroudOptionBoolean = false
    clearInterval(backgroudOptionInterval)

    document.querySelectorAll('.random-bg span').forEach(sp => {
            sp.parentElement.querySelectorAll('.active').forEach(sp1 => {
                sp1.classList.remove('active')
            })
        })
    document.querySelector('.random-bg .no').classList.add('active')  
}

// skills

window.onscroll = function () {

    if ( (scrollY + this.innerHeight) > document.querySelector('.skills-container').offsetTop ) {
        document.querySelectorAll('.skill-prc span').forEach(span => {
            span.style.width = span.dataset.prc
        })
    }
}


// about image

let aboutImage = document.querySelectorAll('.about-image-flex img')

aboutImage.forEach(img => {
    img.addEventListener('click', () => {

        let overlayImage = document.createElement('div')
        overlayImage.className = 'about-click-overlay'
        document.body.appendChild(overlayImage)

        let clickImage = document.createElement('div')
        clickImage.className = 'about-click-image'

        let aboutImage = document.createElement('img')

        aboutImage.src = img.src;
        clickImage.appendChild(aboutImage)
        document.body.appendChild(clickImage)

        let closeBtt = document.createElement('span')
        closeBtt.appendChild(document.createTextNode('X'))
        closeBtt.className = 'about-close-btt'
        clickImage.appendChild(closeBtt)

    })
})

document.addEventListener('click' , (e) => {

    if (e.target.className == 'about-close-btt') {
        e.target.parentNode.remove()
        document.querySelector('.about-click-overlay').remove()
    }
})

// nav bullets

document.querySelectorAll('.bullets-nav .bullet').forEach(blt => {
    blt.addEventListener('click' , (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView()
    })
})


document.querySelectorAll('.bullets-setting span').forEach(sp => {
    sp.addEventListener('click', (e) => {
        e.target.parentElement.querySelectorAll('.active').forEach(sp1 => {
            sp1.classList.remove('active')
        })
        e.target.classList.add('active')
        if (e.target.dataset.bullet == 'hide') {
            document.querySelector('.bullets-nav').style.display = 'none'
            localStorage.setItem('bullet',true)
        }
        else {
            document.querySelector('.bullets-nav').style.display = 'block'
            localStorage.setItem('bullet',false)

        }
    })
})

if (localStorage.getItem('bullet') == 'true') {
    document.querySelectorAll('.bullets-setting span').forEach(sp => {
        sp.parentElement.querySelectorAll('.active').forEach(sp1 => {
            sp1.classList.remove('active')
        })
    })
    document.querySelector('.bullets-setting .hide').classList.add('active')  
    document.querySelector('.bullets-nav').style.display = 'none'

}

// reset button

document.querySelector('.reset').onclick = function() {
    localStorage.clear()
    window.location.reload()
}