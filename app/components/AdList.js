import React from 'react';
import {
  StyleSheet,
  ScrollView
} from 'react-native';
import Ad from './Ad';

class AdList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let ads = this.props.ads ? this.props.ads.map((ad, i) => {
      return <Ad {...ad} key={i} keyval={i} />
    }) : null;
    return(
      <ScrollView>
        {ads}
      </ScrollView>
    )
  }
}

export default AdList;
