import firebase from 'firebase'


// FUNÇOES PARA O FIREBASE


export function adicionarNaGeladeira(x){
    firebase.database().ref().child('items').set({
        nome:x
    })

}

export function criarItem(x,y,z){
    if(x==''){
        alert('Preencha o Campo do nome')
    }else if(y==''){
        alert('Preencha o campo da quantidade')
    }else if(z==''){
        alert('Preencha o campo do preço')
    }else{
        var nome=firebase.auth().currentUser.displayName;
        var id=firebase.auth().currentUser.uid;
        // this.getRef().child('users/'+id).set({
        //     admin:false,
        //     nome:nome
        // })
        var usersRef =this.getRef().child('queijos/'+id+"/"+ x);
        usersRef.set({
        quantidade:y,
        preço:z
    })
        alert('Queijo Adicionado');
    }
}