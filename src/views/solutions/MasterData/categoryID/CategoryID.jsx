import React, { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  Grid,
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  FormControl,
  Checkbox,
  FormControlLabel,
  Box
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import useCategoryID from "hooks/useCategoryId";
import axios from "axios";
import { COST_CENTER } from "store/constant";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const useStyles = makeStyles((theme) => ({
  iconButton: {
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: theme.spacing(2),
  },
  dataGrid: {
    flex: 1,
    backgroundColor: 'white',
    '& .MuiDataGrid-root': {
      border: 'none',
    },
  },
}));

const CostCenter = () => {
  const classes = useStyles();
  const {categoryId} = useCategoryID();
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [originalCategoryId, setOriginalCategoryId] = useState(null);
  const [newRow, setNewRow] = useState({
    category_id: "",
    category_name: "",
    description: "",
    category_level: 0,
    unspsc_code: 0,
  });

  useEffect(() => {
    if (categoryId) {
      const { transformedColumns, transformedRows } = transformData(categoryId);
      setColumns(transformedColumns);
      setRows(transformedRows);
    }
  }, [categoryId]);

  useEffect(() => {
    filterRows();
  }, [searchTerm, rows]);

  const handleBulkUpload = (event) => {
    const file = event.target.files[0];
    console.log("File uploaded:", file.name);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (column) => {
    console.log("Filtering by:", column);
    setAnchorEl(null);
  };

  const transformData = (data) => {
    if (!data || data.length === 0) {
      console.error("Input data is undefined, null, or empty");
      return { transformedColumns: [], transformedRows: [] };
    }

    const keys = Object.keys(data[0]);
    const transformedColumns = keys.map((key) => ({
      field: key,
      headerName: key.replace(/_/g, " "),
      flex: 1,
      minWidth: 150,
      editable: true,
    }));

    transformedColumns.push(
      {
        field: 'edit',
        headerName: 'Edit',
        width: 80,
        disableColumnMenu: true,
        sortable: false,
        renderCell: (params) => (
          <Button
            className={classes.iconButton}
            style={{ minWidth: '30px', padding: '6px' }}
            onClick={() => handleEditRow(params.row)}
          >
            <EditIcon />
          </Button>
        ),
      },
      {
        field: 'delete',
        headerName: 'Delete',
        width: 80,
        disableColumnMenu: true,
        sortable: false,
        renderCell: (params) => (
          <Button
            className={classes.iconButton}
            style={{ minWidth: '30px', padding: '6px' }}
            onClick={() => handleDeleteRow(params.row)}
          >
            <DeleteIcon />
          </Button>
        ),
      }
    );

    const transformedRows = data.map((item, index) => ({
      id: index + 1,
      ...item,
    }));

    return { transformedColumns, transformedRows };
  };

  const filterRows = () => {
    if (searchTerm === "") {
      setFilteredRows(rows);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = rows.filter((row) => {
        return Object.keys(row).some((key) =>
          String(row[key]).toLowerCase().includes(lowercasedFilter)
        );
      });
      setFilteredRows(filteredData);
    }
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewRow({
      category_id: "",
      category_name: "",
      description: "",
      category_level: 0,
      unspsc_code: 0,
    });
  };

  const handleNewRowChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewRow((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddRow = async () => {
    try {
      const response = await axios.post(`${COST_CENTER}/insertSingleCategory/`, newRow);
      console.log("Row added:", response.data);
      setRows((prevRows) => [...prevRows, { ...newRow, id: prevRows.length + 1 }]);
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error adding row:", error);
    }
  };

  const handleDeleteRow = async (row) => {
    try {
      await axios.delete(`${COST_CENTER}/deleteCategory/${row.category_id}`);
      setRows((prevRows) => prevRows.filter((r) => r.id !== row.id));
      console.log("Row deleted successfully");
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const handleEditRow = (row) => {
    setEditedRow(row);
    setOriginalCategoryId(row.category_id);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditedRow(null);
    setOriginalCategoryId(null);
  };

  const handleEditedRowChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditedRow((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveEditedRow = async () => {
    try {
      const response = await axios.put(`${COST_CENTER}/updateCategory/${originalCategoryId}`, editedRow);
      console.log("Row updated:", response.data);
      setRows((prevRows) => prevRows.map((row) => row.id === editedRow.id ? editedRow : row));
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  return (
    <Box className={classes.container}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginBottom: "20px" }}
      >
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <Button
            size="medium"
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            style={{ width: '140px', height: '36px', color:'black' }}
          >
            Bulk Upload
            <input type="file" hidden onChange={handleBulkUpload} />
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpenAddDialog}
            style={{ width: '120px', height: '36px', color:'black'}}
          >
            Add Row
          </Button>
        </Grid>
      </Grid>

      <Box className={classes.dataGrid}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          disableColumnSelector
          disableDensitySelector
          checkboxSelection={false}
        />
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
        {columns.map((column, index) => (
          <MenuItem key={index} onClick={() => handleFilterSelect(column.field)}>
            {column.headerName}
          </MenuItem>
        ))}
      </Menu>

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Cost Center</DialogTitle>
        <DialogContent style={{ paddingTop: '20px' }}>
          {Object.keys(newRow).map((key) => (
            <FormControl fullWidth key={key} style={{ marginBottom: '16px' }}>
              {key === 'Active' ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={newRow[key]}
                      onChange={handleNewRowChange}
                      name={key}
                    />
                  }
                  label={key.replace(/_/g, ' ')}
                />
              ) : (
                <TextField
                  name={key}
                  label={key.replace(/_/g, ' ')}
                  value={newRow[key]}
                  onChange={handleNewRowChange}
                  type={key.includes('Date') ? 'datetime-local' : key.includes('Budget') ? 'number' : 'text'}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  variant="outlined"
                />
              )}
            </FormControl>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddRow} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Cost Center</DialogTitle>
        <DialogContent style={{ paddingTop: '20px' }}>
          {editedRow && Object.keys(editedRow).map((key) => (
            <FormControl fullWidth key={key} style={{ marginBottom: '16px' }}>
              {key === 'Active' ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={editedRow[key]}
                      onChange={handleEditedRowChange}
                      name={key}
                    />
                  }
                  label={key.replace(/_/g, ' ')}
                />
              ) : (
                <TextField
                  name={key}
                  label={key.replace(/_/g, ' ')}
                  value={editedRow[key]}
                  onChange={handleEditedRowChange}
                  type={key.includes('Date') ? 'datetime-local' : key.includes('Budget') ? 'number' : 'text'}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  variant="outlined"
                  disabled={key === 'id' || key === 'Cost_Center_Number'}
                />
              )}
            </FormControl>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEditedRow} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CostCenter;