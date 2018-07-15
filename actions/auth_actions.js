// -MM- MODIFICAR A FUNCAO LA EM BAIXO PARA USAR O CODIGO EM OUTRO APP
import {AsyncStorage} from 'react-native';
import { Facebook } from 'expo';

import {   FB_LOGIN_SUCESS,FB_LOGIN_FAIL } from './types';

// HOW TO USE AsyncStorage
//AsyncStorage.setItem('fb_token',token);
//AsyncStorage.getItem('fb_token')
//AsyncStorage retorna nao instantanemanete lol kkk

export const facebookLogin = () => async dispatch =>{
    //vai e pega o fb token do proprio device... como eu sei q isso vai demorar um tempo eu uso o await.
    //depois bota na variavel token
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
         //SE O TOKEN EXISTIR:
         //Dispatch an action saying FB login is done
         dispatch({type:FB_LOGIN_SUCESS,payload:token});
    }else{
        //SE O TOKEN NAO EXISTIR:
        //start up FB login progress    criar o token
        doFacebookLogin(dispatch);
    }
}

//-MM-
//helper function
const doFacebookLogin = async dispatch => {                           //-MM- AppId no developers.facebook
    let {type,token} = await Facebook.logInWithReadPermissionsAsync('182398962543309',{
        permissions:['public_profile']
    });

    //caso algo de errado
    if(type==='cancel'){
        return dispatch({type:FB_LOGIN_FAIL})
    }

    await AsyncStorage.setItem('fb_token',token);
    dispatch({type:FB_LOGIN_SUCESS,payload:token});
};
