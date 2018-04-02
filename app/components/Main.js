import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import AdList from './AdList';
import Ad from './Ad';
import AdForm from './AdForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const allAdsQuery = gql`
  query {
	  allAds(orderBy: createdAt_DESC) {
      id
	    title
	    content
      date
	    city
	    genre
	    similarActs
	  }
  }
`

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ads: [],
      showAdForm: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.allAdsQuery.loading && !nextProps.allAdsQuery.error) {
      return {
        ads: nextProps.allAdsQuery.allAds
      }
    }
    return null
  }

  toggleAdForm = () => {
    this.setState({
      showAdForm: !this.state.showAdForm
    })
  }

  render() {
    const { ads } = this.state;
    if (this.props.allAdsQuery.loading) {
      return (
        <View style={styles.loaderContainer}>
          <Text style={styles.loader}>Loading...</Text>
        </View>
      )
    }
    return (
      <View style={styles.container} key={this.props.keyval}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Bandup</Text>
        </View>

        <AdList ads={ads} />

        <View style={styles.footer}>
          <Button
            onPress={this.toggleAdForm}
            title="Создать объявляшку"
            color="#fff"
          />
        </View>

        <AdForm
          showAdForm={this.state.showAdForm}
          onComplete={() => {
            this.props.allAdsQuery.refetch()
            this.toggleAdForm()
          }}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    height: '100%'
  },
  loader: {
    textAlign: 'center',
    fontSize: 20
  },
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
  footer: {
    backgroundColor: '#6191dd',
    padding: 5
  }
})

export default graphql(allAdsQuery, {name: 'allAdsQuery'})(Main)
