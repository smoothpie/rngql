import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Ad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.ad}>
        <Text style={styles.adTitle}>{this.props.title}</Text>
        <Text style={styles.adContent}>{this.props.content}</Text>
        <Text style={styles.adDate}>{this.props.date}</Text>
        <View style={styles.chipContainer}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{this.props.city}</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{this.props.genre}</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{this.props.similarActs}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ad: {
    flex: 1,
    height: 170,
    padding: 15,
    backgroundColor: '#dbdde0',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#161616'
  },
  adTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#161616'
  },
  adContent: {
    color: 'grey'
  },
  adDate: {
    color: '#bcbcbc',
    fontSize: 12
  },
  chipContainer: {
    flexDirection: 'row'
  },
  chip: {
    backgroundColor: '#383838',
    borderRadius: 5,
    padding: 5,
    marginRight: 5
  },
  chipText: {
    color: '#fff',
    fontSize: 12
  }
})
