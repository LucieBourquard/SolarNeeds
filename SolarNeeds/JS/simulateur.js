/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Fonction qui retourne un entier depuis une valeur prise dans le DOM
 * 
 * @param {String} id
 * @return {integer}
 */
export function recupValeur(id) {
    var valeur = parseInt(window.document.querySelector(id).value);
    if (isNaN(valeur)) {
        window.document.querySelector(id).value = 0;
        return 0;
    } else {
        return valeur;
    }
}

/**
 * Listener sur le bouton, calcul et affichage du résultat
 * 
 */
window.addEventListener('load', function () {


    // tabInputs est une collection de <input>
    let tabInputs = window.document.querySelectorAll("input");

    // Parcours de tabInputs en s'appuyant sur le nombre de <input>
    for (let i = 0; i < tabInputs.length; i++) {

        // Ajout d'un Listener sur tous les <input> sur l'évènement onKeyUp
        tabInputs[i].addEventListener("keyup", calcResult);
    }

    window.document.querySelector('#num_ville').addEventListener("change", function() {
        calcResult();
    });
    
    // Gestion de l'input de type range (recopie de la valeur dans l'output)
    window.document.querySelector('#num_appareils').addEventListener('change', function () {
        window.document.querySelector('#o_num_appareils').value = recupValeur('#num_appareils');
        calcResult();
    });
    
    window.document.querySelector('input[type="reset"]').addEventListener('click', function () {
        window.document.querySelector('#remuneration').remove();
    });

});

/**
 * Fonction principale qui s'occupe de récupérer les valeurs, calculer le bénéfice annuel
 * en éléctricité et qui l'affiche
 * 
 * @returns {undefined}
 */
function calcResult() {
    
    // Déclaration et affectation des variables
    let ville = recupValeur("#num_ville");
    let appareils = recupValeur("#num_appareils");
    let nbPanneau = recupValeur("#num_panneau"); 
    let benef = recupProd(ville,nbPanneau) - recupCons(appareils);
    let gain = recupGain(benef);
    let remuneration = benef;

    // Affichage du résultat
    afficheBenef(Math.round(benef),Math.round(gain));
}

/**
 * Fonction qui retourne la production annuelle
 * @param {integer} nb
 * @returns {integer}
 */
function recupProd(nb,nb2) {
    const soleil = 12;
    return (nb * nb2 * soleil);
}

/**
 * Fonction qui retourne la consomation annuelle
 * @param {integer} nb
 * @returns {integer}
 */
function recupCons(nb) {
    const cons = 120;
    return (nb * cons);
}

/**
 * Fonction qui retourne le gain annuel (positif ou négatif)
 * @param {integer} nb
 * @returns {float}
 */
function recupGain(nb) {
    const prixV = 0.1;
    const prixA = 0.1450;
    if (nb > 0){
        return (nb * prixV);
    }
    else if (nb < 0){
        return (nb * prixA);
    }
    else if (nb === 0){
        return 0;
    }
}

/**
 * Procédure qui gère l'affichage en fonction de la production annuelle
 * 
 * @param {integer} benef
 * @param {float} gain
 * @returns {void}
 */
function afficheBenef(benef,gain) {
    let elH2 = window.document.querySelector('#remuneration');
    /* utilisation de #result au lieu de #benef pour réutiliser les règles
     * CSS définie dans simulateur.css
     * Si #result (<h2 id='result'></h2>) n'existe pas, on le créé */
    if (!elH2) {
        elH2 = window.document.createElement('h2');
        elH2.id = 'remuneration';
        window.document.querySelector('#recueilinfos').appendChild(elH2);
    }
    
    // Gestion de l'affichage avec gestion particulière pour benef positif, négatif ou nul.
    if (benef === 0) {
        elH2.innerHTML = 'Votre production annuelle est de ' + benef + ' kWh, vous êtes à l\'équilibre !';
    } else if (benef >= 0) {
        elH2.innerHTML = 'Vous produisez ' + benef + ' kWh de plus par rapport à vos besoins, félicitations ! Vous pouvez vendre pour ' + gain + ' € d\'électricité';
    } else {
        elH2.innerHTML = 'Vous ne produisez pas assez. Vous avez besoin de ' + (-benef) + ' kWh supplémentaires. Votre facture annuelle sera de ' + (-gain) + ' € ';
    }
}
