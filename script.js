// Script 1: Ajustar el padding superior del contingut per evitar que es solapi amb el navbar fix
// Funció per ajustar el padding superior del contingut en funció de la mida del navbar
function ajustarEspai() {

    const navbar = document.querySelector(".fixed-top");
    
    const postNav = document.querySelector("#post-navbar");
    
    const navbarHeight = navbar.offsetHeight;  // Altura dinàmica del navbar
    
    postNav.style.paddingTop = `${navbarHeight}px`;  // Estableix el padding-top al contingut amb la id "post-nav"
}

    // Executar la funció quan la pàgina es carrega o la finestra canvia de mida
    window.addEventListener("load", ajustarEspai);

    window.addEventListener("resize", ajustarEspai);


// Script 2: Mostrar/Ocultar els blocs de text al peu de pàgina i desplaçar la pàgina
// Aquest script fa que quan es fa clic a un enllaç, es mostri o amagui el bloc de text corresponent
document.querySelectorAll('.toggle-text').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Evita que l'enllaç realitzi la seva acció per defecte (que normalment seria obrir una nova pàgina)

        // Obté el valor de l'atribut "data-target" de l'enllaç clicat
        const targetId = this.getAttribute('data-target');
        const targetBlock = document.getElementById(targetId); // Busca el bloc de text que es correspon amb aquest id

        // Comprovem si el bloc ja està visible
        if (targetBlock.style.display === 'block') {
            // Si està visible, el tanquem
            targetBlock.style.display = 'none';
        } else {
            // Si no està visible, el mostrem
            // Ocultem tots els altres blocs visibles
            document.querySelectorAll('.legal-text').forEach(block => block.style.display = 'none');
            
            targetBlock.style.display = 'block'; // Mostra el bloc de text seleccionat
        }

        // Desplaçar la pàgina fins al bloc de contingut
        targetBlock.scrollIntoView({
            behavior: 'smooth', // Desplaçament suau
            block: 'start' // Desplaçar la secció al principi de la pantalla
        });
    });
});

// Script 3: Canviar el color del text quan el ratolí passa per sobre
// Afegeix una interacció visual canviant el color de l'enllaç quan el ratolí passa per sobre
document.querySelectorAll('.toggle-text').forEach(link => {
    link.addEventListener('mouseover', function () {
        this.style.color = "#ff6347"; // Quan el ratolí passa per sobre, es canvia el color del text a "tomato"
    });
    link.addEventListener('mouseout', function () {
        this.style.color = "#ffffff"; // Quan el ratolí surt de l'enllaç, el color torna a ser blanc
    });
});

// Script 4 botó búsqueda
function highlightAndScroll() {
    const searchText = document.getElementById('destinacio').value.trim();

    if (searchText === "") {
        alert("Por favor, introduce una palabra para buscar.");
        return;
    }

    const regex = new RegExp(`(${searchText})`, 'gi');

    function highlightText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const newText = node.textContent.replace(regex, `<span class="highlight">$1</span>`);
            if (newText !== node.textContent) {
                const span = document.createElement('span');
                span.innerHTML = newText;
                node.replaceWith(...span.childNodes); 
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(child => highlightText(child));
        }
    }

    const bodyElement = document.getElementById('index'); 
    highlightText(bodyElement);

    const firstResult = document.querySelector('.highlight');
    if (firstResult) {
        firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => {
            const highlightedElements = document.querySelectorAll('.highlight');
            highlightedElements.forEach(element => {
                element.classList.remove('highlight');
            });
        }, 2000); 
    } else {
        alert("No se encontraron coincidencias.");
    }
}

// Script 5, cookies
if (localStorage.getItem('cookies_accepted') !== 'true') {
    document.getElementById('cookie-consent').style.display = 'block';
}

document.getElementById('accept-cookies').onclick = function() {
    document.getElementById('cookie-consent').style.display = 'none';
    
    localStorage.setItem('cookies_accepted', 'true');
};
