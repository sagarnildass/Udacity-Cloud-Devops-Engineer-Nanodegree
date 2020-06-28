import React from 'react';
import bcrypt from 'bcryptjs';
import {
  Container, Grid, Input, Button, Message, Menu,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const SALT_ROUNDS = 10;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textToEncrypt: '',
      textToDecrypt: '',
      hashToDecrypt: '',
      encryptedText: '',
      decryptionMatched: false,
      displayEncryptionResult: false,
      displayDecryptionResult: false,
    };

    this.encrypt = () => {
      const { textToEncrypt } = this.state;
      const encryptedText = bcrypt.hashSync(textToEncrypt, SALT_ROUNDS);
      this.setState({ encryptedText, displayEncryptionResult: true });
    };

    this.decrypt = () => {
      const { textToDecrypt, hashToDecrypt } = this.state;
      const decryptionMatched = bcrypt.compareSync(textToDecrypt, hashToDecrypt);
      this.setState({ decryptionMatched, displayDecryptionResult: true });
    };

    this.onChangeTextToEncrypt = (event) => {
      this.setState({ textToEncrypt: event.target.value, displayEncryptionResult: false });
    };

    this.onChangeTextToDecrypt = (event) => {
      this.setState({ textToDecrypt: event.target.value, displayDecryptionResult: false });
    };

    this.onChangeHashToDecrypt = (event) => {
      const { target } = event;
      if (!target.value.startsWith('$')) {
        target.value = '';
        return;
      }

      this.setState({ hashToDecrypt: event.target.value, displayDecryptionResult: false });
    };

    this.onDismissEncryptionResult = () => {
      this.setState({ displayEncryptionResult: false });
    };

    this.onDismissDecryptionResult = () => {
      this.setState({ displayDecryptionResult: false });
    };
  }

  render() {
    const {
      encryptedText,
      displayEncryptionResult,
      displayDecryptionResult,
      decryptionMatched,
      textToEncrypt,
      textToDecrypt,
      hashToDecrypt,
    } = this.state;

    let encryptionResultMessage;
    let decryptionResultMessage;

    if (displayEncryptionResult) {
      encryptionResultMessage = (
        <Message
          id="encryption-result"
          info
          header="Result:"
          content={encryptedText}
          onDismiss={this.onDismissEncryptionResult}
        />
      );
    }

    if (displayDecryptionResult) {
      decryptionResultMessage = (
        <Message
          id="decryption-result"
          success={decryptionMatched}
          negative={!decryptionMatched}
          header="Result:"
          content={decryptionMatched ? 'Hash and text match!' : "Hash and text don't match."}
          onDismiss={this.onDismissDecryptionResult}
        />
      );
    }

    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item header>Bcrypt Sandbox</Menu.Item>
            <Menu.Item>A tool for encrypting and decrypting text with bcrypt</Menu.Item>
          </Container>
        </Menu>
        <Container style={{ marginTop: '7em' }}>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <h2 className="ui center aligned header">
                  <i className="random icon" />
                  Encryption
                </h2>
                <Input
                  id="text-to-encrypt"
                  type="text"
                  placeholder="Enter some text to encrypt"
                  onChange={this.onChangeTextToEncrypt}
                  fluid
                  action
                >
                  <input />
                  <Button
                    id="encrypt-button"
                    color="blue"
                    onClick={this.encrypt}
                    disabled={!textToEncrypt}
                  >
                    Encrypt
                  </Button>
                </Input>
                {encryptionResultMessage}
              </Grid.Column>
              <Grid.Column>
                <h2 className="ui center aligned header">
                  <i className="retweet icon" />
                  Decryption
                </h2>
                <Input
                  id="hash-to-decrypt"
                  type="text"
                  placeholder="Enter the hash to check"
                  onChange={this.onChangeHashToDecrypt}
                  fluid
                />
                <Input
                  id="text-to-decrypt"
                  type="text"
                  placeholder="Enter the text to check against"
                  onChange={this.onChangeTextToDecrypt}
                  fluid
                />
                <Button
                  id="decrypt-button"
                  color="blue"
                  onClick={this.decrypt}
                  disabled={!textToDecrypt || !hashToDecrypt}
                  fluid
                >
                  Check if hash and text match
                </Button>
                {decryptionResultMessage}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
