import { Component } from "react";

import "./styles.css";

export class Button extends Component {
    render(){
        const {quandoclica, disabled} = this.props;
        return(
            <button className="button" 
                    onClick={quandoclica} 
                    disabled={disabled}
            >
                        Load more posts
            </button>
        )
    }
}