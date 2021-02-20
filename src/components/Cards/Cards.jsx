import React, {Component} from 'react';
import {numberWithCommas, MEDIA_LINK, findWithAttr} from '../../functions/Global';
import "./styles.scss";
import {isMobile} from 'react-device-detect';

class ProductCard extends Component {
    render() {
        let data = this.props.data;
        let categories = this.props.categories;

        return(
            <a href={isMobile ? ("fb://facewebmodal/f?href=" + data.link) : data.link} target="_blank" className="card product">
                <div className="image_container">
                    <div className="image" style={{background: `url(${MEDIA_LINK}${data.image}) no-repeat center center / cover`}}></div>
                </div>

                <span className="title">{data.name}</span>
                <span className="type">{findWithAttr(categories, 'value', data.categories) > -1 ? categories[findWithAttr(categories, 'value', data.categories)].label : ''}</span>

                <figure className="price">
                    <span>{numberWithCommas(data.price.toString())} đ</span>
                </figure>

                <div className="information">
                    <div className="avatar"></div>
                    <div className="author">
                        <span className="posted">Posted By</span>
                        <span className="name">{data.user_name}</span>
                    </div>
                </div>
            </a>
        )
    }
}

export {
    ProductCard
}