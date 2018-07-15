import React,{Component} from 'react';
import {View,Text,ScrollView,Dimensions} from 'react-native';
import {Button} from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends Component {
    //aqui eu renderizo os que ta escrito nos slides.. ele ficar grande e bonitinho é tudo com os estilos
    renderSlides(){
        return this.props.data.map((slide,index) => {
            return(
                <View 
                    key ={slide.text} 
                    style={[styles.slideStyle,{backgroundColor:slide.color}]}
                >
                    <Text style={styles.textStyle}>{slide.text}</Text>
                    {this.renderLastSlide(index)}
                </View>
            )
        })
    }
    renderLastSlide(index){
        if (index === this.props.data.length - 1) {
            return(
                <View  style={{marginTop:13}}>
                    <Button
                        title="Ir pro App!"
                        raised
                        //buttonStyle e textStyle.. pois 1 vc customiza o botao todo e no textStyle vc customiza o texto dentro do botao
                        buttonStyle={styles.buttonStyle}
                        //se fosse this.props.onComplete() a funcao seria disparada no instante que o botao fosse renderizado
                        onPress={this.props.onComplete}
                
                />
                </View>
            )
        }
    }
    render() {
        return (
            <ScrollView
                horizontal // faz com que o scroll view seja horizontal
                style={{flex:1} }
                pagingEnabled //faz com que nao deixe parar entre os slides..
            >
                {this.renderSlides()}
            </ScrollView>
        )
    }
}

const styles = {
    textStyle:{
        fontSize:30,
        color:'white'  
    },
    slideStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        //o width com screenwitdh faz com que elas fiquem certinnho
        width:SCREEN_WIDTH
    },
    buttonStyle:{
        backgroundColor:'#0288D1'
    }
}