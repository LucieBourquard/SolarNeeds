
function validEnvoi() {
    if(window.document.querySelector("#i_nom").value === "" &&
            window.document.querySelector("#i_prenom").value=== ""){
        alert("Le nom ou le prénom doivent être remplis"); //on affiche un message
    }
    else if(window.document.querySelector("#i_email").value === ""){
        alert("L'email doit être rempli"); //on affiche un message
    }
    else if (!window.document.querySelector("input[type=radio]:checked")){
        alert("Veuillez sélectionner un motif de contact"); //on affiche un autre message
    }
    else{
        let question = "Souhaitez-vous réellement utiliser l'adresse suivante : "
            + window.document.querySelector("#i_email").value;
        if (confirm(question)) {
            console.log("Formulaire de contact prêt à l'envoi. Il ne manque plus que le fichier php pour gérer la réception des données! A la place on réinitialise les champs textes");
            window.document.querySelector("#i_nom").value = ""; //on réinitialise le champ
            window.document.querySelector("#i_prenom").value= ""; //on réinitialise le champ
            window.document.querySelector("#i_email").value= ""; //on reinitialise le champ
            //pour l'envoyer : window.document.querySelector("#form_contact").submit();
        }
    }
}

window.addEventListener("load", function(){
    window.document.querySelector("#btn_envoyer").addEventListener("click", validEnvoi);
    console.log("ok !");
});





