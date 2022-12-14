// ** React Imports
import { useCallback, useEffect, useMemo, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColumns } from '@mui/x-data-grid';

// ** Icon Imports
import DeleteOutline from 'mdi-material-ui/DeleteOutline';

// ** Third Party Imports
import { format } from 'date-fns';

// ** Mock Data & Type Imports
import { IUser } from '../../../mock/users';

// ** Components Imports
import TableHeader from './TableHeader';

// ** Table Props Interfaces
interface CellType {
  row: IUser;
}

interface TableProps {
  handleDeleteAllUsers: () => void;
  handleDeleteUser: (id: string) => void;
  users: IUser[];
}

const getAgeFromBirthDate = (birthDate: string) => {
  const today = new Date();
  const birthDateDate = new Date(birthDate);
  let age = today.getFullYear() - birthDateDate.getFullYear();
  const month = today.getMonth() - birthDateDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDateDate.getDate())) {
    age--;
  }
  return age;
};

const defaultColumns = [
  {
    flex: 0.25,
    minWidth: 200,
    disableColumnMenu: false,
    sortable: true,
    field: 'name',
    headerName: 'Nome',
    renderCell: ({ row }: CellType) => {
      const { name } = row;

      return (
        <Typography noWrap variant="body2">
          {name}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 150,
    disableColumnMenu: true,
    sortable: true,
    field: 'surname',
    headerName: 'Sobrenome',
    renderCell: ({ row }: CellType) => {
      const { surname } = row;
      return (
        <Typography noWrap variant="body2">
          {surname}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 150,
    disableColumnMenu: true,
    sortable: false,
    field: 'dateOfBirth',
    headerName: 'Data de Nascimento',
    renderCell: ({ row }: CellType) => {
      const { dateOfBirth } = row;
      const formattedDateOfBirth = format(new Date(dateOfBirth), 'dd/MM/yyyy');
      return (
        <Typography noWrap variant="body2">
          {formattedDateOfBirth}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 150,
    disableColumnMenu: true,
    sortable: false,
    field: 'height',
    headerName: 'Altura',
    renderCell: ({ row }: CellType) => {
      const { height } = row;
      return (
        <Typography noWrap variant="body2">
          {height.toFixed(2)}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 150,
    disableColumnMenu: true,
    sortable: false,
    field: 'age',
    headerName: 'Idade',
    renderCell: ({ row }: CellType) => {
      const age = getAgeFromBirthDate(row.dateOfBirth);
      return (
        <Typography noWrap variant="body2">
          {age}
        </Typography>
      );
    },
  },
];

const Table = ({
  users,
  handleDeleteUser,
  handleDeleteAllUsers,
}: TableProps) => {
  // State
  const [pageSize, setPageSize] = useState<number>(25);
  const [value, setValue] = useState<string>('');

  // ** Re-evaluate the users when the users array changes
  useEffect(() => {}, [users]);

  // ** Handle the Searchbox Filter
  const handleFilter = useCallback((val: string) => {
    setValue(val);
  }, []);

  // ** Normalize the query values in the searchbox.
  const queryLowered = value.toLowerCase();

  // ** Loops through the Array of Users Applying filtters to the Searchbox.
  const filteredData = useMemo(() => {
    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(queryLowered) ||
        user.surname.toLowerCase().includes(queryLowered)
      );
    });
  }, [users, queryLowered]);

  const columns: GridColumns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 135,
      maxWidth: 135,
      disableColumnMenu: true,
      sortable: false,
      field: 'acoes',
      headerName: 'Ações',

      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton>
            <DeleteOutline
              fontSize="small"
              onClick={() => handleDeleteUser(row.id)}
            />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            data={users}
            handleDeleteAllUsers={handleDeleteAllUsers}
          />
          <DataGrid
            componentsProps={{
              pagination: {
                labelRowsPerPage: 'Linhas por página',
              },
            }}
            autoHeight
            rows={filteredData}
            pageSize={pageSize}
            disableSelectionOnClick
            columns={columns}
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Table;
