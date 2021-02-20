import React, {Component} from "react";
import {HashSpiner} from './Spiners';
import HashLoader from "react-spinners/HashLoader";

let quotes = [
    "Bạn có biết Laven Confession được thiết kế và lập trình bởi Nhats Devil ?",
    "Bạn có thể upload ảnh cho confess của mình đấy!",
    "Nên nhớ các ad sẽ không đăng các confess mang tính chất hù dọa, chửi lộn nhé!",
    "Laven Confession là thành quả của sự hợp tác của các admin giữa hai trường TCN HV và GDTX Q6"
]

class SplashScreen extends Component {
    render() {
        return(   
        <div className="splash_screen">
            <HashLoader
              size={50}
              color={"#2484FF"}
              loading={true}
            />
            <h1>{quotes[Math.floor(Math.random() * quotes.length)]}</h1>
        </div>);
    }
}

export {
    SplashScreen
}