import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';

export default function LocationItem () {

    return (
        <List dense>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary="Single-line item"
                  />
                </ListItem>
            </List>
    )
}