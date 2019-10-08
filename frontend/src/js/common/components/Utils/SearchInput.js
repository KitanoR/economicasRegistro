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
                <input
                    className={classnames('form-control ', 'input--search ', {expanded, search_active})}
                    type="text"
                    placeholder="Buscar"
                    ref={this.searchRef}
                    onChange={() => {
                        if (this.searchRef.current) {
                            searchChange(this.searchRef.current.value);
                        }
                    }}
                    value={search}
                    onBlur={this.toogleSearch}
                    autoComplete="off"
                />
                <div className="icon-search d-flex align-items-center justify-content-center" onClick={this.toogleSearch} >
                    <img src={require('assets/img/icons/buscar.png')} alt="Buscar" className="action_img"/>
                </div>
            </div>
        );
    }
}

export default SearchInput;
