import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {WEB_LINK} from '../functions/Global';

//RESOURCES
import { BsHouseDoor, BsChatSquareQuote } from "react-icons/bs";
import {RiHome7Line, RiInboxLine, RiStore2Line} from 'react-icons/ri';
import {IoMdSunny, IoMdMoon} from 'react-icons/io';
import Logo from '../styles/resources/icons/Logo.svg';

function changeNavigationBarStatus(page, ele) {
  ele.setState({active: page});
} 

class Navigation extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        active: window.location.hash.replace("#","").replace("/","")
      }
    }

    handleToggleDarkMode = () => {
      if(localStorage.getItem('dark_mode')) {
        localStorage.removeItem('dark_mode');
        document.body.classList.remove('dark');
      }else{
        localStorage.setItem('dark_mode', true);
        document.body.classList.add('dark');
      }
    }

    render() {
      return(
        <header>
          <nav className="nav-bar nav-toggle" id="nav-bar">
            <div className="left-menu">
                <h4>Laven Confession</h4>
            </div>
            <div className="center-menu">
                <div className="nav-menu">
                    <Link className={this.state.active === '' ? 'menu-link active' : 'menu-link'} onClick={() => {changeNavigationBarStatus('', this)}} to='/'><RiHome7Line className="nav-icon"/></Link>
                </div>
                <div className="nav-menu">
                    <Link className={this.state.active === 'confession/tcnhv' ? 'menu-link active' : 'menu-link'} onClick={() => {changeNavigationBarStatus('confession/tcnhv', this)}} to='/confession/tcnhv'><div className="img" style={{background: "url(/resources/images/logos/hvtcn.png) no-repeat center center / cover"}}></div></Link>
                </div>
                <div className="nav-menu">
                    <Link className={this.state.active === 'confession/gdtx' ? 'menu-link active' : 'menu-link'} onClick={() => {changeNavigationBarStatus('confession/gdtx', this)}} to='/confession/gdtx'><div className="img" style={{background: "url(/resources/images/logos/gdtx.jpg) no-repeat center center / cover"}}></div></Link>
                </div>
                <div className="nav-menu">
                    <Link className={this.state.active === 'market' ? 'menu-link active' : 'menu-link'} onClick={() => {changeNavigationBarStatus('market', this)}} to='/market/all'><RiStore2Line className="nav-icon"/></Link>
                </div>
            </div>
            <div className="right-menu">
              <div className="dark_mode_toggle_btn">
                	<input type="checkbox" className="checkbox" id="chk" ref="dark_mode_toggle_btn" onClick={this.handleToggleDarkMode} defaultChecked={localStorage.getItem('dark_mode') == 'true' ? true : false}/>
                	<label className="label" htmlFor="chk">
                    <IoMdMoon className="fas fa-moon"/>
                    <IoMdSunny className="fas fa-sun"/>
                	</label>
                </div>
            </div>
          </nav>
        </header>
      )
    }
}

export default Navigation;