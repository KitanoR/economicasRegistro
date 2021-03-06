import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchInput from "Utils/SearchInput";
import classNames from "classnames";
import Select from "react-select";

export default class Header extends Component {
    render() {
        const { search, to, textBtn, searchChange, filtro, onChange } = this.props;
        return (
            <div className="d-flex justify-content-end">
                
                    {(search !== undefined) && (
                        <SearchInput search={search} searchChange={searchChange} />
                    )}
                    <div className="d-flex flex-1 ml-3">
                        <Link to={to} className="btn btn-outline-primary mb-3">{textBtn}</Link>
                    </div>
            </div>
        );
    }
}
