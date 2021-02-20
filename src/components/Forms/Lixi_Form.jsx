import React, {Component} from 'react';
import { BsChatSquareQuoteFill } from "react-icons/bs";
import {IoPersonOutline, IoUnlinkOutline} from 'react-icons/io5';
import autosize from "autosize";
import {API} from '../../functions/API';
import {LixiModal} from '../Modals';

import Bao1 from '../../styles/resources/baoLixi/Bao1.png';
import Bao2 from '../../styles/resources/baoLixi/Bao2.png';
import Bao3 from '../../styles/resources/baoLixi/Bao3.png';
import Bao4 from '../../styles/resources/baoLixi/Bao4.png';
import Bao5 from '../../styles/resources/baoLixi/Bao5.png';
import Bao6 from '../../styles/resources/baoLixi/Bao6.png';
import Bao7 from '../../styles/resources/baoLixi/Bao7.png';
import Bao8 from '../../styles/resources/baoLixi/Bao8.png';
import Bao9 from '../../styles/resources/baoLixi/Bao9.png';

import "../../styles/components/_confess_forms.scss";
import "./styles.scss";

class HeaderBreakLine extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return(
        <div className="section-line">
            <div className="line"></div>
            <div className="circle">
                <div className="icon-contain">
                    <BsChatSquareQuoteFill className="icon"/>
                </div>
            </div>
        </div>
      )
    }
  }
  
class LixiForm extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        hasImage: 'flex',
        image: 'url(http://hoatuoituongy.tk:8002/media/k62415mvfar1612629728486-Bao1.png) no-repeat center center / cover',
        imageName: 'http://hoatuoituongy.tk:8002/media/k62415mvfar1612629728486-Bao1.png',
        postBackgroundActive: 'none',
        ConfessUploadSuccessful: 'flex',
        ConfessUploadMsg: '',
        msg: "",
        background_select_is_hidden: 'flex',
        bao_lixi: [Bao1,Bao2,Bao3,Bao4,Bao5,Bao6,Bao7,Bao8,Bao9],
        lixi_modal: false,
        bao: 0,
        link: ''
      }
    }

    componentDidMount() {
      autosize(this.refs.confessInput);
    }

    handleSelect = (bao) => {
        this.setState({
            bao: bao,
            lixi_modal: false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(this.refs.confessInput.value && this.refs.user.value) {
          let data = {
              content: this.refs.confessInput.value,
              bao_lixi: this.state.bao,
              user: this.refs.user.value
          }
  
          API.post('create_lixi','', {data: data}, (res) => {
              this.setState({
                  ConfessUploadMsg: 'Hãy gửi link phía dưới cho người bạn muốn gửi Lì Xì',
                  ConfessUploadSuccessful: 'none',
                  background_select_is_hidden: 'none',
                  hasImage: 'none',
                  link: `https://lavenconfession.tk/#/lixi/${res._id}`
              })
          })
        }else{
          this.setState({
            msg: 'Hãy nhập đủ thông tin nè!'
          })
        }
    }
  
    render() {
      return(
        <div className="confess-form-mini lixi">
            <LixiModal is_open={this.state.lixi_modal} bao_lixi={this.state.bao_lixi} onSelect={this.handleSelect}/>
            <h4 className="messages">{this.state.ConfessUploadMsg}</h4>
                <br/>
                <HeaderBreakLine/>
                <br/>
                <div style={{width: "100%", textAlign: "left", display: this.state.ConfessUploadSuccessful}}>
                    <a id="error-confess" style={{display: this.state.ConfessUploadSuccessful}}>{this.state.msg}</a>
                </div>

                <div className="box" style={{display: this.state.ConfessUploadSuccessful == "flex" ? "none" : "flex"}}>
                  <IoUnlinkOutline className="icon"/>
                  <input type="text" ref="link" value={this.state.link} onClick={(e) => e.target.select()} style={{color: '#f73558'}}/>
                </div>
                <div className="box" style={{display: this.state.ConfessUploadSuccessful}}>
                  <IoPersonOutline className="icon"/>
                  <input type="text" ref="user" placeholder="Người gửi"/>
                </div>
              
                <textarea type="text" ref="confessInput" style={{display: this.state.ConfessUploadSuccessful}} rows={1} placeholder='Hãy gửi những lời chúc tốt đẹp đến người bạn yêu thương!'></textarea>
                
                <div className="confess_image_container" style={{display: this.state.hasImage}}>
                  <div className="change_image_btn" onClick={() => this.setState({lixi_modal: true})}>Đổi bao lì xì</div>
                  <div className="image" style={{backgroundImage: `url(${this.state.bao_lixi[this.state.bao]})`}}></div>
                    <div className="image_shadow">  
                        <div className="shadow_image" style={{backgroundImage: `url(${this.state.bao_lixi[this.state.bao]})`}}>
                       </div>
                    </div>
                </div>


                <div className="confess_submit_container" style={{display: this.state.ConfessUploadSuccessful}}>
                   <button className="btn" id="confess-submit" type="button" onClick={this.handleSubmit}>Chia Sẻ</button>
                </div>
          </div>
      )
    }
  }

export default LixiForm;