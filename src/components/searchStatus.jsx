import React from 'react';

const SearchStatus = (length) => {
    if (length >= 1) {
        return <span className="badge rounded-pill bg-primary">{`${length} человек тусанет с тобой сегодня`}</span>
    };
    if (length < 1) {
        return <span className="badge rounded-pill bg-danger">{"Никто с тобой не тусанет"}</span>
    };
};

export default SearchStatus