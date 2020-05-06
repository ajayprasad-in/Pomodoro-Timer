import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Vibration } from 'react-native';
import ViewCount from './ViewCount'

export default class App extends React.Component {

  state = {
    minuteVal: "00",
    secondVal: "00",
    minuteBreakVal: "00",
    secondBreakVal: "00",
    headingMsg: "",
    minuteWorkTimer: "00",
    secondWorkTimer: "00",
    minuteBreakTimer: "00",
    secondBreakTimer: "00",
    isStartDisable: false,
    isStartClicked: false,
    isStopClicked: false,
    isResetClicked: false,
    isBreakTime: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isStartClicked !== prevState.isStartClicked) {
      this.setState({ isStartDisable: true })
      this.setState({ isStartClicked: false })
      this.setState({ isStopClicked: false })
      this.setState({ isResetClicked: false })
    } else if (this.state.isStopClicked !== prevState.isStopClicked || this.state.isResetClicked !== prevState.isResetClicked) {
      this.setState({ isStartDisable: false })

      this.setState({ isStartClicked: false })
      this.setState({ isStopClicked: false })
      this.setState({ isResetClicked: false })
    }
  }

  StartTimer = () => {
    if (this.state.secondWorkTimer > 0 ) {
      this.setState(prevState => ({headingMsg: "Working Time"}))
      this.setState(prevState => ({ isStartClicked: true }))
      this.timeInterval = setInterval(this.decreaseCount, 1000)
    }
  }

  StopTimer = () => {
    this.setState(prevState => ({ isStopClicked: true }))
    clearInterval(this.timeInterval)
  }

  ResetTimer = () => {
    this.setState(prevState => ({ isResetClicked: true }))
    clearInterval(this.timeInterval)
    this.setState(prevState => ({ minuteWorkTimer: this.state.minuteVal == '' ? 0 : this.state.minuteVal }))
    this.setState(prevState => ({ secondWorkTimer: this.state.secondVal == '' ? 0 : this.state.secondVal }))
  }

  decreaseCount = () => {
    if (this.state.minuteWorkTimer == 0 && this.state.secondWorkTimer == 0) {
      Vibration.vibrate([500, 500, 500])
      if(!this.state.isBreakTime){
        this.setState(prevState => ({isBreakTime: true}))
      } else {
        this.setState(prevState => ({isBreakTime: false}))
      }
      clearInterval(this.timeInterval)

      this.validateAndRestartCount()
      
    } else {
      if (this.state.secondWorkTimer == 0) {
        this.setState(prevState => ({ secondWorkTimer: "60" }))
        this.setState(prevState => ({ minuteWorkTimer: prevState.minuteWorkTimer - 1 }))
      }
      this.setState(prevState => ({ secondWorkTimer: prevState.secondWorkTimer - 1 }))
    }
  }

  validateAndRestartCount = () => {
    if(!this.state.isBreakTime){
      this.setState(prevState => ({headingMsg: "Working Time"}))
      this.setState(prevState => ({ isStartClicked: true }))
      
      this.setState(prevState => ({ minuteWorkTimer: this.state.minuteVal == '' ? 0 : this.state.minuteVal}))
      this.setState(prevState => ({ secondWorkTimer: this.state.secondVal == '' ? 0 : this.state.secondVal}))

      this.timeInterval = setInterval(this.decreaseCount, 1000)
    } else {
      this.setState(prevState => ({headingMsg: "Break Time"}))
      this.setState(prevState => ({ isStartClicked: true }))

      this.setState(prevState => ({ minuteWorkTimer: this.state.minuteBreakTimer == '' ? 0 : this.state.minuteBreakTimer}))
      this.setState(prevState => ({ secondWorkTimer: this.state.secondBreakTimer == '' ? 0 : this.state.secondBreakTimer }))

      this.timeInterval = setInterval(this.decreaseCount, 1000)
    }

  }

  handleTextField = key => val => {
    if (val == '') {
      if (key == 'minuteWorkTimer') {
        this.setState(prevState => ({ minuteWorkTimer: "0" }))
        this.setState(prevState => ({ minuteVal: "" }))
      } else if (key == 'secondWorkTimer') {
        this.setState(prevState => ({ secondWorkTimer: "0" }))
        this.setState(prevState => ({ secondVal: "" }))
      } else if (key == 'minuteBreakTimer') {
        this.setState(prevState => ({ minuteBreakTimer: "0" }))
        this.setState(prevState => ({ minuteBreakVal: "" }))
      } else if (key == 'secondBreakTimer') {
        this.setState(prevState => ({ secondBreakTimer: "0" }))
        this.setState(prevState => ({ secondBreakVal: "" }))
      }
    } else {
      //this.setState({ [key]: val })
      if (key == 'minuteWorkTimer') {
        this.setState(prevState => ({ minuteWorkTimer: val }))
        this.setState(prevState => ({ minuteVal: val }))
      } else if (key == 'secondWorkTimer') {
        this.setState(prevState => ({ secondWorkTimer: val }))
        this.setState(prevState => ({ secondVal: val }))
      } else if (key == 'minuteBreakTimer') {
        this.setState(prevState => ({ minuteBreakTimer: val }))
        this.setState(prevState => ({ minuteBreakVal: val }))
      } else if (key == 'secondBreakTimer') {
        this.setState(prevState => ({ secondBreakTimer: val }))
        this.setState(prevState => ({ secondBreakVal: val }))
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textstyle}>Pomodoro Timer</Text>

        <ViewCount headingMsg={this.state.headingMsg} minuteWorkTimer={this.state.minuteWorkTimer} secondWorkTimer={this.state.secondWorkTimer}/>
        
        <View style={[{ marginTop: 20, padding: 10, }]}>
          <Text style={[{fontWeight: 'bold'}]}>Working Time</Text>
          <View style={[{ flexDirection: 'row', alignItems: 'center', padding: 10, }]}>

            <Text>Mins</Text>
            <TextInput
              style={[styles.textInput]}
              keyboardType={'numeric'}
              maxLength={2}
              onChangeText={this.handleTextField('minuteWorkTimer')}
              value={String(this.state.minuteVal)} />
            <Text>Secs</Text>
            <TextInput
              style={[styles.textInput]}
              keyboardType={'numeric'}
              maxLength={2}
              onChangeText={this.handleTextField('secondWorkTimer')}
              value={String(this.state.secondVal)} />

          </View>

        </View>

        <View style={[{ marginTop: 10, padding: 10, }]}>
          <Text style={[{fontWeight: 'bold'}]}>Break Time</Text>
          <View style={[{ flexDirection: 'row', alignItems: 'center', padding: 10, }]}>

            <Text>Mins</Text>
            <TextInput
              style={[styles.textInput]}
              keyboardType={'numeric'}
              maxLength={2}
              onChangeText={this.handleTextField('minuteBreakTimer')}
              value={String(this.state.minuteBreakVal)} />
            <Text>Secs</Text>
            <TextInput
              style={[styles.textInput]}
              keyboardType={'numeric'}
              maxLength={2}
              onChangeText={this.handleTextField('secondBreakTimer')}
              value={String(this.state.secondBreakVal)} />

          </View>

        </View>

        <View style={[{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, }]}>

          <View >
            <Button title="Start" onPress={this.StartTimer} disabled={this.state.isStartDisable} />
          </View>

          <View style={[{ marginLeft: 10, marginRight: 10 }]}>
            <Button title="Stop" onPress={this.StopTimer} />
          </View>

          <View>
            <Button title="Reset" onPress={this.ResetTimer} />
          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  textstyle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textInput: {
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    width: 50,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10
  }
});
