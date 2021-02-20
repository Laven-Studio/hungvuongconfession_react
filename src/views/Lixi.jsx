import React, {Component} from 'react';
import {BaoLixi, Mail} from '../components/Lixi';
import {API} from '../functions/API';

import Bao1 from '../styles/resources/baoLixi/Bao1.png';
import Bao2 from '../styles/resources/baoLixi/Bao2.png';
import Bao3 from '../styles/resources/baoLixi/Bao3.png';
import Bao4 from '../styles/resources/baoLixi/Bao4.png';
import Bao5 from '../styles/resources/baoLixi/Bao5.png';
import Bao6 from '../styles/resources/baoLixi/Bao6.png';
import Bao7 from '../styles/resources/baoLixi/Bao7.png';
import Bao8 from '../styles/resources/baoLixi/Bao8.png';
import Bao9 from '../styles/resources/baoLixi/Bao9.png';
import Music from '../styles/resources/audio/tetnhaminhs.mp3';

class Lixi extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            bao_lixi: [Bao1,Bao2,Bao3,Bao4,Bao5,Bao6,Bao7,Bao8,Bao9],
            data: null,
            openning: false
        }

        API.get('get_lixi/'+this.props.match.params.id,(res) => {
            this.setState({
                data: res
            })
        })
    }

    handleOpenning = () => {
        this.refs.music.play();
        this.refs.music.currentTime = 47.752226;
        
        this.setState({
            openning: true
        })
    }

    render() {
        if(!this.state.data) {
            return <div></div>
        }

        const data = this.state.data;

        return(
            <div style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                <audio src={Music} ref="music"/>
                <Mail data={data} visible={this.state.openning}/>
                <BaoLixi data={data} bao_lixi={this.state.bao_lixi} onOpen={this.handleOpenning}/>
            </div>
        )
    }
}

export default Lixi;