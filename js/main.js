/**
 * Tableau contenant les données du jeu (V pour case vide, O pour joueur O et X pour joueur X)
 * X: case contenant le jeton X
 * O: case contenant le jeton O
 * V: case vide
 *
 * Le jeu du morpion possède 9 case. Ce tableau contiendra donc 9 entrées
 *
 * Exemple de ce que contiendra le tableau lors de la partie
 * si le joueur X, joue sur la case en haut à gauche (la première case), on aura un tableau comme ceci ['X', 'V', 'V, 'V', 'V, 'V', 'V, 'V', 'V']
 * si le joueur O, joue sur la case en bas à droite (la dernière case), on aura un tableau comme ceci ['X', 'V', 'V, 'V', 'V, 'V', 'V, 'V', 'O']
 * @type {*[]}
 */
let damier = [];


/**
 * Variable contenant le jeton (O ou X) du joueur dont c'est le tour
 * @type {?string}
 */
let joueur = null

/**
 * Contient l'élément "#start"
 * @type {Node}
 */

const boutonStart = document.getElementById("start");

/**
 * Contient les éléments ".case img"
 * @type {NodeList}
 */

const caseDuJeu = document.querySelectorAll(".case img");

const auClickSurBoutonStart = () => {
   
    boutonStart.addEventListener("click", () => demarrerPartie() );
}

const auClickSurLeDamier = () => {
    // TODO: Créer un événement au "click" sur l'image d'une case ( ".case img" )
    caseDuJeu.forEach(caseDuJeu => caseDuJeu.addEventListener("click", () =>  auClickSurUnElementDuDamier( caseDuJeu.dataset.case ) ));
    // parcoure le tableau des éléments grâce à une boucle

  
}

/**
 * Cette fonction démarre la partie
 *
 * @return  {void}
 */
const demarrerPartie = () => {
    console.log("La partie commence !");
    // On initialise le tableau damier
    initDamier();

    // On remplit chaque case du damier avec V
    dessineDamier();

    // On choisit aléatoirement si O ou X commence à jouer
    if (Math.random() >= 0.5) {
        joueur = "O";
    } else {
        joueur = "X";
    }

    // On affiche quel joueur joue dans "#zonedetexte" (O ou X)
    afficheTexte("Joueur : " + joueur);
}

/**
 * Cette fonction remplit le tableau damier qui contiendra les jetons des joueurs :
 * Elle remplit chaque case du tableau "damier[]" d'un 'V' (qui correspond à 'case vide'),
 * sachant que le damier comporte 9 cases.
 *
 * @return  {void}
 */
const initDamier = () => {
    damier = [];
   
    for(i=0; i<9; i++){
        damier.push('V');
    }
   
}

/**
 * Cette fonction dessine le damier du morpion dans la page HTML
 * à partir des informations contenues dans le tableau damier.
 *
 * @return  {void}
 */
const dessineDamier = () => {
  
    damier.forEach(function callback(value, index) {
       
        if(damier[index] =='V'){
           
            caseDuJeu[index].setAttribute("src", "./img/vide.jpg");

        }
        else if(damier[index] == 'O'){
            
            caseDuJeu[index].setAttribute("src", "./img/rond.png");
        }
        else if(damier[index] == 'X'){
           
            caseDuJeu[index].setAttribute("src", "./img/croix.png");
        }
      });

}

/**
 * Cette fonction permet d'afficher le texte de l'argument
 * texte dans la span #zonedetexte.
 *
 * @param   {string}  texte  le text à afficher
 *
 * @return  {void}
 */
const afficheTexte = (texte) => {
    // TODO: remplace le texte de #zonedetexte par la variable texte
        // sélectionne l'élément #zonedetexte et stocke le dans une constante
        // remplace le text de cet élément avec le la variable texte
        // replacer le texte d'un élément: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
        const zoneDeTexte = document.getElementById("zonedetexte");
        zoneDeTexte.textContent = texte;
}

/**
 * Cette fonction parcours le tableau "damier[]"
 * et retourne le nombre de cases "vides" (contenant 'V') du tableau.
 *
 * @return int
 */
const nbCaseVide = () => {
    let nombreDeCaseVide = 0;
    damier.forEach(element => {
        if(element == 'V'){
            nombreDeCaseVide++;
        }
    });
   
    return nombreDeCaseVide;
}

/**
 * Cette fonction vérifie si "joueur" est X ou O
 * et change la variable joueur en fonction.
 *
 * @return  {void}
 */
const alterneJoueur = () => {
    console.log('Le joueur est = ' + joueur);
    // TODO: si la variable joueur est égale à 'X'
        if(joueur=='X'){
            console.log("true");
            joueur='O';
        }
        else if(joueur=='O'){
            joueur ='X';
        }
    // TODO: si la variable joueur est égale à 'O'
        // Change la valeur de la variable joueur par 'X'
}

/**
 * Cette fonction appelle la majorité des autres fonctions
 * et se lance lors d'un click sur une case
 *
 * @param   {int}  numeroDeCase  le numéro de la case
 *
 * @return  {void}
 */
const auClickSurUnElementDuDamier = (numeroDeCase) => {
    
    if (joueur === null) { // la partie n'a pas commencée
        afficheTexte("Cliquer sur Démarrer pour commencer une partie")
        return
    }

    if (damier[numeroDeCase] !== 'V') { // La case jouée n'est pas vide, on ne peut pas jouer sur une case déjà jouée !
        afficheTexte("La case jouée n'est pas vide, recommencez")
        return
    }

    // Enregistre le jeu du joueur
    damier[numeroDeCase] = joueur

    // On actualise le Damier sur la page
    dessineDamier();
    
    // On vérifie les alignements
    if (alignement(joueur)) {
        // Affiche un message de victoire
        afficheTexte('Le joueur ' + joueur + ' a gagné !!!! Cliquez sur "Démarrer une partie pour" recommencer')
        joueur = null // Arrêt de la partie
        return
    }
    // Vérifie que la partie est nulle
    if (nbCaseVide() === 0) {
        afficheTexte("Partie nulle, aucun joueur n'a gagné, cliquez sur Démarer pour recommencer")
        joueur = ""
        return
    }

    // La partie continue, on passe le tour à l'autre joueur
    alterneJoueur()
    afficheTexte("Joueur : " + joueur)
}

/**
 * Cette fonction vérifie si UNE ligne aligne 3 jetons X ou O
 * Si c'est le cas, elle retourne true, sinon false
 *
 * @param   {int}       numligne  le numéro de la ligne à vérifier
 * @param   {string}   jeton     le jeton du joueur: 'X' ou 'O'
 *
 * @return  {bool}            return true si une ligne est compléte, false sinon
 */
const alignementLigne = (jeton) => {
    // TODO: Pour compléter cette fonction, il va falloir faire un console.log(damier)
    // et analyser son contenu.
    // Exemple : S'il y a 3 'O' à la ligne 1, on retourne true. Sinon on retourne false.
    if((damier[0]==jeton) && (damier[1]==jeton) && (damier[2]==jeton)){
        console.log("LIGNE 1 OK");
      return true;
    }
   else if((damier[3]==jeton) && (damier[4]==jeton)&& (damier[5]==jeton)){
    console.log("LIGNE 2 OK");
    return true;
   }
   else if((damier[6]==jeton) && (damier[7]==jeton)&& (damier[8]==jeton)){
    return true;
   }
   else{
    return false;
   }
}

/**
 * Cette fonction vérifie si UNE colonne (numcolonne) algine 3 jetons X ou O (jeton)
 * Si c'est le cas, elle retourne true, sinon false
 *
 * @param   {int}      numcolonne  le numéro de la colonne à vérifier
 * @param   {string}   jeton     le jeton du joueur: 'X' ou 'O'
 *
 * @return  {bool}            return true si une colonne est compléte, false sinon
 */
const alignementColonne = (jeton) => {
    if((damier[0]==jeton) && (damier[3]==jeton) && (damier[6]==jeton)){
        console.log("COLONNE 1 OK");
      return true;
    }
   else if((damier[1]==jeton) && (damier[4]==jeton)&& (damier[7]==jeton)){
    console.log("COLONNE 2 OK");
    return true;
   }
   else if((damier[3]==jeton) && (damier[5]==jeton)&& (damier[8]==jeton)){
    return true;
   }
   else{
    return false;
   }
}

/**
 * Cette fonction vérifie si une des 2 diagonales aligne 3 jetons X ou O
 *
 * @param   {string}   jeton     le jeton du joueur: 'X' ou 'O'
 *
 * @return  {bool}            return true si une diagonal est compléte, false sinon
 */
const alignementDiagonale = (jeton) => {
   if((damier[0]==jeton) && (damier[4]==jeton) && (damier[8]==jeton) ){
      return true;
    }
   else if((damier[2]==jeton) && (damier[4]==jeton) && (damier[6]==jeton)){
    return true;
   }
   else{
    return false;
   }
    
}

/**
 * Cette fonction vérifie tous les alignements : horizontal, vertical et diagonal.
 * Pour vérifier cela, elle parcourt le tableau damier qui contient les informations sur le jeu.
 * Elle renvoie true si un alignement est complet, false sinon
 *
 * @param   {string}  jeton  Peut être 'X' ou 'O'
 *
 * @return  {void}
 */
const alignement = (jeton) => {
    if(alignementLigne(jeton)){
        return true;
    }
    else if(alignementColonne(jeton)){
        return true;
    }
    else if(alignementDiagonale(jeton)){
        return true;
    }
    else{return false;}
    
}
(function () {
    // cette fonction s'auto-appelle: elle est exécutée au chargement du script
    console.log("Hello World!") // tu peux utiliser cette fonction pour afficher n'importe quelle variable dans la console du navigateur

    // appelle la fonction auClickSurBoutonStart()
    auClickSurBoutonStart();

    // appelle la fonction auClickSurLeDamier()
    auClickSurLeDamier();

}())
