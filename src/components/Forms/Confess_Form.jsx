import React, {Component} from 'react';
import { BsChatSquareQuoteFill, BsCardImage, BsArrowRightShort } from "react-icons/bs";
import Axios from 'axios';
import autosize from "autosize";
import {SERVER_LINK, API_LINK} from '../../functions/Global';

import "../../styles/components/_confess_forms.scss";

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
  
class ConfessForm extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        hasImage: 'none',
        image: '',
        imageName: '',
        postBackgroundActive: 'none',
        ConfessUploadSuccessful: 'flex',
        ConfessUploadMsg: '',
        msg: "* Bắt buộc",
        background_select_is_hidden: 'flex'
      }
    }

    componentDidMount() {
      autosize(this.refs.confessInput);
    }

    handleImageUpload = (File) => { 
        let formData = new FormData();
        
        formData.append("image", File);
        let config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
        }
    
        Axios.post(`${SERVER_LINK}/uploadImage`, formData, config).then(res => {
          this.setState({
            image: `url(${SERVER_LINK}/media/` + res.data.fileName +') no-repeat center center / cover',
            imageName: res.data.fileName,
            hasImage: 'flex',
            background_select_is_hidden: 'none'
          })
        });
    }

    handleSelectPostBackground = (background_id) => {   
        this.setState({
            postBackgroundActive: background_id
        })
    }

    handleConfessUpload = () => {
        let confess = this.refs.confessInput.value;
        let image = this.state.imageName;
        let background = this.state.postBackgroundActive;
        let date = new Date();
  
        if(confess === "") {
          this.setState({
            msg : "Hãy nhập confess đi :3"
          })
        }else {
          //GET USER DATA
          Axios.get("https://www.cloudflare.com/cdn-cgi/trace").then((cloud_flare_result) => {
              //GET DEVICE TYPE
              const getDeviceType = () => {
                const ua = navigator.userAgent;
                if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
                  return "tablet";
                }
                if (
                  /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
                    ua
                  )
                ) {
                  return "mobile";
                }
                return "desktop";
              };

              let data = {
                noidung: confess,
                hashtag: "",
                image: [image],
                ngayTao: date,
                user: 'User',
                video: null,
                background: background,
                clientData: {
                  cloudflare: cloud_flare_result.data,
                  position: {
                    latitude: '',
                    longitude: ''
                  },
                  browser_code_name: navigator.appCodeName,
                  browser_name: navigator.appName,
                  browser_engine: navigator.product,
                  user_agent: navigator.userAgent,
                  OS: navigator.platform,
                  device_type: getDeviceType()
                },
                analytics: window.location.search,
                confess_id: "",
                school_id: window.location.hash.replace("#","").replace("/","").split("/")[1]
              }

              //POST TO SERVER
              Axios.post(`${API_LINK}send_confess/${data.school_id}`, data).then((res) => {});
        
            this.setState({
              ConfessUploadMsg: 'Confess của bạn đã đăng thành công!',
              ConfessUploadSuccessful: 'none',
              background_select_is_hidden: 'none',
              hasImage: 'none'
            })
          })
        }
    }
  
    render() {
      return(
        <form id="confess-form" name="confess-form" className="confess-form-mini">
                <h4 className="messages">{this.state.ConfessUploadMsg}</h4>
              <div style={{width: "100%", textAlign: "left", display: this.state.ConfessUploadSuccessful}}>
                  <a id="error-confess" style={{display: this.state.ConfessUploadSuccessful}}>{this.state.msg}</a>
              </div>
              <br/>
              <textarea type="text" ref="confessInput" style={{display: this.state.ConfessUploadSuccessful}} rows={1} placeholder='Hãy chia sẻ mọi cảm xúc của bạn!'></textarea>
              <div className="confess_image_container" style={{display: this.state.hasImage}}>
                  <div className="image" style={{background: this.state.image}}></div>
                    <div className="image_shadow">  
                        <div className="shadow_image" style={{background: this.state.image}}>
                       </div>
                    </div>
                </div>
                <div className="confess_background_choosen_container" style={{display: `${this.state.background_select_is_hidden}`}}>
                    <div className="confess_background_select_container">
                        <div className={`confess_background_item ${this.state.postBackgroundActive === 'none' ? 'active' : ''}`} onClick={() => {this.handleSelectPostBackground('none')}} data-background="none" style={{background: "#fff"}}></div>
                        <div className={`confess_background_item ${this.state.postBackgroundActive === '0' ? 'active' : ''}`} onClick={() => {this.handleSelectPostBackground('0')}} data-background="0"></div>
                        <div className={`confess_background_item ${this.state.postBackgroundActive === '1' ? 'active' : ''}`} onClick={() => {this.handleSelectPostBackground('1')}} data-background="1"></div>
                        <div className={`confess_background_item ${this.state.postBackgroundActive === '2' ? 'active' : ''}`} onClick={() => {this.handleSelectPostBackground('2')}} data-background="2"></div>
                        <div className={`confess_background_item ${this.state.postBackgroundActive === '3' ? 'active' : ''}`} onClick={() => {this.handleSelectPostBackground('3')}} data-background="3"></div>
                    </div>
                </div>
                <div className="confess_submit_container" style={{display: this.state.ConfessUploadSuccessful}}>
                   <div className="confess_upload_image_btn" style={{background: "#ffffff"}}>
                        <input onChange={(e) => {this.handleImageUpload(e.target.files[0])}} ref="image" name="image" type="file" id="file" accept="image/*" className="inputfile" />
                        <label htmlFor="file"><BsCardImage className="icon"/><a>Thêm hình ảnh</a></label>
                    </div>
                   <button className="btn" id="confess-submit" type="button" onClick={() => {this.handleConfessUpload()}}>Đăng
                        <BsArrowRightShort className="btn-icon"/>
                    </button>
                </div>
          </form>
      )
    }
  }

export default ConfessForm;