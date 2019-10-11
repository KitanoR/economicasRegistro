import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SearchInput extends Component {
     constructor(props) {
        super(props);
        this.state = { open: false };
        this.searchRef = React.createRef();
    };

    static propTypes = {
        search: PropTypes.string.isRequired,
        searchChange: PropTypes.func.isRequired,
    };

    toogleSearch = () => {
        this.setState({open: !this.state.open}, () => {
            if (this.state.open) {
                this.searchRef.current.focus();
            }
        });
    };


    render() {
        const { search, searchChange } = this.props;
        let expanded = false;
        let search_active = false;
        if (this.state.open || search !== ""){
            expanded = true
        }
        if (search !== ""){
            search_active = true;
        }
        return (
            <div className="container-search">
               
                 <input id="buscar" type="text" name="buscar" placeholder={"buscar..."}
                   ref={node => {
                     this.buscar = node;
                     if (this.buscar) {
                       this.buscar.value = search;
                     }
                   }}
                   onKeyPress={(event) => {
                     if (event.key === 'Enter') {
                        searchChange(this.buscar.value);
                     }
                   }}
                   autoComplete="off" className="form-control"/>
            </div>
        );
    }
}

export default SearchInput;
