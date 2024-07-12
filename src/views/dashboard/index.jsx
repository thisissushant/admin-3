/* eslint-disable react/prop-types */
import React from 'react';
import { AppBar, Toolbar, InputBase, Box, Button, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const filterButtons = [
  { name: 'All Filter', items: ['Item 1', 'Item 2', 'Item 3'] },
  { name: 'All Model', items: ['Model A', 'Model B', 'Model C'] },
  { name: 'Task', items: ['Task 1', 'Task 2', 'Task 3'] },
  { name: 'DataType', items: ['Type X', 'Type Y', 'Type Z'] },
  { name: 'Framework', items: ['React', 'Vue', 'Angular'] },
  { name: 'Publisher', items: ['Publisher 1', 'Publisher 2', 'Publisher 3'] },
  { name: 'Language', items: ['JavaScript', 'Python', 'Java'] }
];

const FilterButton = ({ name, items }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button color="inherit" endIcon={<ArrowDropDownIcon />} onClick={handleClick}>
        {name}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {items.map((item, index) => (
          <MenuItem key={index} onClick={handleClose}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const SearchPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              position: 'relative',
              borderRadius: 5,
              backgroundColor: 'grey',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
              marginRight: 2,
              marginLeft: 0,
              width: '100%'
            }}
          >
            <Box
              sx={{
                padding: '0 16px',
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search…"
              sx={{
                color: 'inherit',
                padding: '8px 8px 8px 0',
                paddingLeft: `calc(1em + 32px)`,
                transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                width: '100%'
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {filterButtons.map((button, index) => (
          <FilterButton key={index} name={button.name} items={button.items} />
        ))}
      </Box>
    </Box>
  );
};

export default SearchPage;
