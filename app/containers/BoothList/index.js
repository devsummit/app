import React, { Component } from 'react';
import {
  Container,
  Content,
  Button,
  Text,
  Card,
  CardItem,
  Body
} from 'native-base';
import { View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import HeaderPoint from '../../components/Header';
import styles from './styles';
import * as selectors from './selectors';
import * as actions from './actions';


class BoothList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchBoothList();
  }

  render() {
    const { booth } = this.props;
    return (
      <Container style={styles.container}>
      <Content>
        <HeaderPoint title="BOOTH" />
        <Button
          primary
          style={styles.btnBooth}
          onPress={() => Actions.boothInfo()}
        >
          <Text>Become booth</Text>
        </Button>
        <Content style={styles.content}>
          {booth.map(data => (
            <Card key={data.id} >
              <Body>
                <View style={styles.profileSection}>
                  <Image
                    style={styles.profilePic}
                    source={{ uri: data.logo_url }}
                  />
                </View>
              </Body>
              <CardItem style={styles.itemNameSection}>
                <Body>
                  <View style={styles.bodySection}>
                    <View style={styles.nameSection}>
                      <Text style={styles.name}>{data.user.first_name} {data.user.last_name}</Text>
                      <Text numberOfLines={3} style={styles.summary} >
                        {data.summary}
                      </Text>
                    </View>
                  </View>
                </Body>
              </CardItem>
              <CardItem footer style={styles.footerSection}>
                <Button
                  bordered
                  style={styles.footerButton}
                  onPress={() => {
                    Actions.boothInfo({
                      summary: data.summary,
                      user: data.user,
                      photo: data.logo_url
                    });
                  }}
                >
                  <Text style={styles.footerButtonText}>See more</Text>
                </Button>
              </CardItem>
            </Card>
          ))}
        </Content>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  booth: selectors.getListBooth()
});
export default connect(mapStateToProps, actions)(BoothList);
