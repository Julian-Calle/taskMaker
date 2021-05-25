import React from 'react'

export default function ButtonIcon({icon,cls, action}) {
    return (
        <button onClick={action}>
            <i className={`fa fa-${icon} fa-lg ${cls}`}></i>
        </button>
    )
}
