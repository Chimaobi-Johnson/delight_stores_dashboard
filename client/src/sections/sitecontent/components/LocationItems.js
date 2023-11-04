import PropTypes from 'prop-types';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';

export default function LocationItem (props) {

    const { shippingLocations } = props
    console.log(shippingLocations)

    const renderLocations = (data) => {
        if(data.length !== 0) {
            return data.map(el => (
            <List dense>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={el.locationName}
                    secondary={el.locationPrice}
                  />
                </ListItem>
            </List>
            ))
        }
        return (<></>)
    }

    return (
        <>
            {renderLocations(shippingLocations)}
        </>
    )
}

LocationItem.propTypes = {
    shippingLocations: PropTypes.array,  
  };