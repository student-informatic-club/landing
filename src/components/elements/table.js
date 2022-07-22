import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
const Table = ({
    headers,
    datas,
}) => {
    const classes = classNames(
        'tableData'
    )
    return(
        <table className={classes}>
            <thead>
                <tr>
                    {headers.map((label, i) => {
                        return (
                            <th key={i}>{label}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {datas.map((data, i) => {
                    return(
                        <tr key={i}>{data.data}</tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table;