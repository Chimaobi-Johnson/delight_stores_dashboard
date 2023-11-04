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
import axios from 'axios';

export default function LocationItem (props) {

    const { shippingLocations, getShippingLocations } = props

    const deleteItemHandler = async (item) => {
        try {
            const result = await axios.post(`/api/site-content/delete?item=${item}`)
            if(result.status === 200) {
                getShippingLocations()
            }
        } catch (error) {
            console.log(error)
            if(error.response.status === 404) {
                alert('Item has been deleted already')
            } else {
                alert('Error deleting location. Check connection or try again')
            }
        }
    }

    const renderLocations = (data) => {
        if(data.length !== 0) {
            return data.map(el => (
            <List dense>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteItemHandler(el.locationName)}>
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
    getShippingLocations: PropTypes.func 
  };