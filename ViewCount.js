import React from 'react'
import { Text, View } from 'react-native';
import PropTypes from 'prop-types'

const showCounter = props => (
    <View>
        <Text style={[{ textAlign: 'center', fontSize: 20, marginTop: 30 }]}>
            {props.headingMsg}
        </Text>

        <Text style={[{ textAlign: 'center', fontSize: 30, marginTop: 10 }]}>
            {props.minuteWorkTimer}:{props.secondWorkTimer}
        </Text>
    </View>
)
export default showCounter