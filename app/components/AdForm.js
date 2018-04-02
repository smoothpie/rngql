import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight,
  Modal
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const addAdMutation = gql`
  mutation ($title: String!, $content: String!, $date: String!, $city: String!, $genre: String!, $similarActs: String!) {
    createAd(title: $title, content: $content, date: $date, city: $city, genre: $genre, similarActs: $similarActs) {
      id
    }
  }
`

class AdForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      city: '',
      genre: '',
      similarActs: ''
    }
  }

  addAd = async () => {
    let date = new Date().toDateString();
    const { title, content, city, genre, similarActs } = this.state;
    await this.props.addAdMutation({
      variables: {title, content, date, city, genre, similarActs}
    })
    this.props.onComplete();
    this.setState({
      title: '',
      content: '',
      city: '',
      genre: '',
      similarActs: ''
    })
  }

  render() {
    return(
      <View>
        <Modal
          visible={this.props.showAdForm}
          transparent={false}
          animationType="slide"
          >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Bandup</Text>
            </View>
            <View style={styles.adForm}>
              <Text style={styles.adFormHeader}>Найди себе кореша</Text>
              <TextInput
                value={this.state.title}
                placeholder="Название объявления"
                onChangeText={(title) => this.setState({title})}
                style={styles.adFormInput}
                ></TextInput>
              <TextInput
                value={this.state.content}
                placeholder="Подробности"
                multiline={true}
                onChangeText={(content) => this.setState({content})}
                style={styles.adFormContentInput}
                ></TextInput>
              <TextInput
                value={this.state.city}
                placeholder="Город"
                onChangeText={(city) => this.setState({city})}
                style={styles.adFormInput}
                ></TextInput>
              <TextInput
                value={this.state.genre}
                placeholder="Жанр"
                onChangeText={(genre) => this.setState({genre})}
                style={styles.adFormInput}
                ></TextInput>
              <TextInput
                value={this.state.similarActs}
                placeholder="Похожие исполнители"
                onChangeText={(similarActs) => this.setState({similarActs})}
                style={styles.adFormInput}
                ></TextInput>
              <View style={styles.adFormBtnContainer}>
                <Button
                  onPress={this.addAd}
                  title="Отправить"
                  style={styles.adFormBtn}
                  color="#fff"
                  />
              </View>

              <TouchableHighlight
                onPress={this.props.onComplete}
                style={styles.adFormCancel}
                >
                <Text>Я передумал</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#161616'
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  adForm: {
    flex: 1,
    padding: 15,
    alignItems: 'stretch'
  },
  adFormHeader: {
    fontSize: 18,
    textAlign: 'center'
  },
  adFormInput: {
    width: '100%',
    height: 40,
    marginTop: 10,
    paddingLeft: 15,
    justifyContent: 'center',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
  },
  adFormContentInput: {
    width: '100%',
    height: 100,
    marginTop: 10,
    paddingLeft: 15,
    justifyContent: 'center',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
  },
  adFormBtnContainer: {
    width: '100%',
    backgroundColor: '#6191dd',
    borderRadius: 5,
    height: 50,
    marginTop: 10,
    justifyContent: 'center'
  },
  adFormCancel: {
    alignItems: 'center',
    marginTop: 10
  }
})

export default graphql(addAdMutation, {name: 'addAdMutation'})(AdForm)
