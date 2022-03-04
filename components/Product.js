import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback,Button,TextInput,TouchableOpacity,value,View } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import axios from 'axios'
import materialTheme from '../constants/Theme';
const { width } = Dimensions.get('screen');
class Product extends React.Component {
  state = {
    counter: 0,
    comment : "",
    data:[]
  }
  onIncrement = () => {
    this.setState({
      counter: this.state.counter + 1,
    })
    console.log(this.state.counter)
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val})
  }
postcomment=()=>{
  let options ={
    des: this.state.comment
  }
  axios.post('http://192.168.22.185:3000/api/items/postcomment',options).then((data)=>{
    console.log(data)
  })
}
componentDidMount() {
  axios.get('http://192.168.22.185:3000/api/items/getcomment').then((data)=>{
     console.log(data.data)
     this.setState({
       data:data.data
     })
    //  alert(data)
})
}
  render() {
    const { navigation, product, horizontal, full, style, priceColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];
    return (
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile', { product: product })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            {/* <Image source={{ uri: product.image }} style={imageStyles} /> */}
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro', { product: product })}>
          <Block flex space="between" style={styles.productDescription}>
            {/* <Text size={14} style={styles.productTitle}>{product.title}</Text> */}
            {/* <Text size={12} muted={!priceColor} color={priceColor}>{product.price}</Text> */}
            {this.state.data.map((elem)=>{
              <Text>{elem.des}</Text>
            })}
            <Button
            title="Like"  onPress={this.onIncrement}/>
            <TextInput style = {styles.input} onChangeText={val => this.onChangeText('comment', val)}
            />
            <TouchableOpacity
            style = {styles.submitButton}
            >
            <Text style = {styles.submitButtonText} onPress={this.postcomment}> Submit </Text></TouchableOpacity>
          </Block>
        </TouchableWithoutFeedback>
        <View>
        </View>
      </Block>
    );
  }
}
export default withNavigation(Product);
const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  submitButton: {
    backgroundColor: '#7A42F4',
    padding: 10,
    margin: 5,
    height: 40,
    width:80
 },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7A42F4',
    borderWidth: 1
 },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 1,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 3,
    marginTop: 6,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  button: {
    position: 'relative',
    left: 21
  }
});









