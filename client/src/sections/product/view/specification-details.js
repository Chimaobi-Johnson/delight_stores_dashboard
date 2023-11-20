import PropTypes from 'prop-types';

import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';

export default function SpecificationDetails({ specifications }) {
    console.log(specifications)

    const renderSpecifications = () => {
        if(specifications.type === 'colors-only') {
            return (
                <>
                </>
            )
        }
        return (
            <Grid container>
                {specifications.sizes !== 0 ? specifications.sizes.map(size => (
                    <Grid container>
                        <Grid sm={6}>
                            <p>{size.label}</p>
                        </Grid>
                        <Grid sm={6}>
                            <p>add colors to {size.label}</p>
                        </Grid>
                    </Grid>
                )) : ''}
            </Grid>
        )
    }

    return (
        <div>
            {renderSpecifications()}
        </div>
    )
}

SpecificationDetails.propTypes = {
    specifications: PropTypes.object,
  };
  