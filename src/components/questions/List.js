import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './Item'

class List extends Component {
    render () {
        return (
            <Item />
        )
    }
}

export default connect()(List)