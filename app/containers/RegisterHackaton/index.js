import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Container, Content } from 'native-base';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from './actions';
import * as selectors from './selectors';

import Input from '../../components/InputItem';
import styles from './style';
import strings from '../../localization';

class RegisterHackaton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  render() {
    const { isRegistering } = this.props;
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.title}>
            Hello Hackers!
          </Text>
          <Text style={styles.text}>
            Silahkan mendaftar sebagai partisipan hackaton dengan mengirimkan github link kalian dibawah ini.{'\n'}{'\n'}
            Syarat dan Ketentuan : {'\n'}{'\n'}
            1. Kami akan melakukan proses penyaringan peserta dan akan kami informasikan selambat-lambatnya 1 x 24 jam sejak kamu mendaftar.{'\n'}{'\n'}
            2. Bagi peserta yang terpilih akan dikenakan biaya commitment fee sebesar Rp 150.000 yang akan dikembalikan setelah acara selesai.{'\n'}{'\n'}
            3. Untuk mempersiapkan diri, kamu dapat mempelajari terlebih dahulu di https://mainapi.net yang akan digunakan sebagai API wajib pada hackaton.{'\n'}{'\n'}
          </Text>
          <Text style={styles.text}>
            Informasi lebih lanjut tentang DevSummit Hackathon dapat kamu lihat di https://devsummit.io/hackathon
          </Text>
          <TextInput
            style={styles.input}
            placeholder={'Insert your GitHub username or URL'}
            placeholderTextColor={'#BDBDBD'}
            onChangeText={(text) => {
              this.setState({ text });
            }}
            value={this.state.text}
            underlineColorAndroid={'transparent'}
          />
          <TouchableOpacity style={styles.button} onPress={() => this.props.registerHackaton()}>
            {isRegistering ?
              <ActivityIndicator color="#FFFFFF" size="small" /> :
              <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Daftar sekarang</Text>
            }
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = () =>
  createStructuredSelector({
    isRegistering: selectors.getIsRegistering()
  });

export default connect(mapStateToProps, actions)(RegisterHackaton);
