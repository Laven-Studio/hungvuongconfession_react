import React, {Component} from 'react';
import Typing from 'react-typing-animation';
import { motion } from "framer-motion"

import "./styles.scss";

class BaoLixi extends Component {
    constructor(props) {
        super(props);
        this.state ={
            openning: false
        }
    }

    handleOpen = () => {
        this.setState({
            openning: true
        })

        this.props.onOpen();
    }

    render() {
        return(
            <div className={this.state.openning ? "lixi openning" : "lixi"}>
                <motion.div onClick={this.handleOpen} className="open_btn"  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}  style={{display: this.state.openning ? 'none' : 'flex'}}>
                    MỞ
                </motion.div>
                
                <div className="image" style={{backgroundImage: `url(${this.props.bao_lixi[this.props.data.bao_lixi]})`}}></div>
            </div>
        )
    }
}

class Mail extends Component {
    render() {
        return ( 
        <div className={this.props.visible ? "thu_lixi openning" : "thu_lixi"}>    
            {this.props.visible ? 
            <Typing>
                <p>{this.props.data.content}</p>
                <span>- {this.props.data.user} -</span>
            </Typing> :null}
        </div>
        )
    }
}

export {
    BaoLixi,
    Mail
}